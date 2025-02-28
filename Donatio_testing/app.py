import os
import json
import uuid
from datetime import datetime
from functools import lru_cache
from flask import Flask, request, jsonify, render_template
import requests
from dotenv import load_dotenv
from groq import Groq


# Load environment variables
load_dotenv()

app = Flask(__name__)

# Configuration

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

MODEL = "llama3-8b-8192"  # Groq's LLaMA 3 8B model

# In-memory data storage (replace with a database in production)
requests_db = []
donations_db = []
shops_db = [
    {"id": "shop1", "name": "Fresh Mart", "items": {"rice": 50, "wheat_flour": 40, "dal": 120}, "rating": 4.5, "distance": 2.3},
    {"id": "shop2", "name": "Daily Needs", "items": {"rice": 55, "wheat_flour": 35, "dal": 110}, "rating": 4.2, "distance": 1.5},
    {"id": "shop3", "name": "Green Grocers", "items": {"rice": 48, "wheat_flour": 42, "dal": 115}, "rating": 4.0, "distance": 3.1}
]
institutions_db = [
    {"id": "inst1", "name": "Hope Shelter", "type": "orphanage", "beneficiaries": 25, "address": "123 Main St"}
]

# Groq API Integration
def call_groq_api(prompt, temperature=0.7, max_tokens=500):
    """Make a call to the Groq API using direct HTTP request."""
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": MODEL,
        "messages": [
            {"role": "system", "content": "You are an AI assistant for a donation platform that connects donors with institutions in need."},
            {"role": "user", "content": prompt}
        ],
        "temperature": temperature,
        "max_tokens": max_tokens
    }
    
    try:
        response = requests.post(GROQ_API_URL, headers=headers, json=payload)
        response.raise_for_status()  # Raise exception for HTTP errors
        return response.json()["choices"][0]["message"]["content"]
    except Exception as e:
        
        print(f"Error calling Groq API: {e}")
        print(f"Request URL: {GROQ_API_URL}")
        print(f"API Key present: {'Yes' if GROQ_API_KEY else 'No'}")
        print(f"Model: {MODEL}")
        return "Error processing request. Please try again later."

# LRU Cache for frequent LLM calls
@lru_cache(maxsize=100)
def cached_llm_call(prompt_key):
    """Cache LLM responses to reduce API calls."""
    return call_groq_api(prompt_key)

# Feature 1: Shop Matching
def find_optimal_shop(item, quantity, budget):
    """Find the best shop to fulfill a donation request."""
    # Format shop data for the prompt
    shops_text = "\n".join([
        f"- {shop['name']}: Price ₹{shop['items'].get(item, 'N/A')}/kg, "
        f"Distance: {shop['distance']}km, Rating: {shop['rating']}/5"
        for shop in shops_db if item in shop['items']
    ])
    
    prompt = f"""
    Find the best shop to fulfill this donation:
    - Item: {item}
    - Quantity needed: {quantity} kg
    - Available budget: ₹{budget}
    
    Available shops:
    {shops_text}
    
    Recommend which shop offers the best value and calculate the maximum quantity 
    possible within the budget. Format your response as JSON with the following fields:
    - recommended_shop: The name of the recommended shop
    - price_per_unit: The price per kg
    - quantity_possible: How many kg can be purchased with the budget
    - reasoning: Brief explanation for your recommendation
    """
    
    # Generate recommendation
    response = call_groq_api(prompt)
    
    # Try to parse JSON response
    try:
        # Handle potential text before or after the JSON
        import re
        json_match = re.search(r'({.*})', response, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
            json_result = json.loads(json_str)
            
            # Ensure numeric values are properly converted to integers
            if 'price_per_unit' in json_result:
                json_result['price_per_unit'] = int(json_result['price_per_unit'])
            if 'quantity_possible' in json_result:
                json_result['quantity_possible'] = int(json_result['quantity_possible'])
                
            return json_result
        else:
            # Fall back to manual parsing if JSON extraction fails
            lines = response.split('\n')
            result = {}
            for line in lines:
                if "recommended_shop" in line.lower():
                    result["recommended_shop"] = line.split(":", 1)[1].strip().strip('"')
                elif "price_per_unit" in line.lower():
                    price_str = line.split(":", 1)[1].strip().strip('"')
                    result["price_per_unit"] = int(''.join(filter(str.isdigit, price_str)))
                elif "quantity_possible" in line.lower():
                    qty_str = line.split(":", 1)[1].strip().strip('"')
                    result["quantity_possible"] = int(''.join(filter(str.isdigit, qty_str)))
                elif "reasoning" in line.lower():
                    result["reasoning"] = line.split(":", 1)[1].strip().strip('"')
            return result
    except Exception as e:
        print(f"Error parsing shop recommendation: {e}")
        print(f"Original response: {response}")
        # Provide fallback response
        return {
            "recommended_shop": shops_db[0]["name"],
            "price_per_unit": shops_db[0]["items"].get(item, 0),
            "quantity_possible": budget // shops_db[0]["items"].get(item, 1),
            "reasoning": "Based on available data and budget."
        }

# Feature 2: Donor Communications
def generate_impact_message(donor_name, item, quantity, institution_name, institution_type, beneficiary_count):
    """Generate a personalized impact message for donors."""
    prompt = f"""
    Create a personalized thank you message for:
    - Donor: {donor_name}
    - Donation: {quantity}kg of {item}
    - Recipient: {institution_name} ({institution_type} with {beneficiary_count} beneficiaries)
    
    The message should be warm, sincere, and include:
    1. A heartfelt thank you
    2. Specific details about how the donation helps
    3. The impact this will have on the beneficiaries
    
    Keep it under 150 words and make it emotionally resonant without being overly dramatic.
    """
    
    return call_groq_api(prompt, temperature=0.8)

# Feature 3: Simple Anomaly Detection
def detect_request_anomalies(institution_id, item, quantity):
    """Check if a donation request seems unusual or potentially fraudulent."""
    # Get institution details
    institution = next((inst for inst in institutions_db if inst["id"] == institution_id), None)
    if not institution:
        return {"risk_score": 5, "reasoning": "Institution not found in database"}
    
    # Get historical requests (in a real app, this would query a database)
    historical_requests = [req for req in requests_db if req["institution_id"] == institution_id]
    
    # Format historical data for the prompt
    history_text = "\n".join([
        f"- Date: {req['date']}, Item: {req['item']}, Quantity: {req['quantity']} kg"
        for req in historical_requests
    ]) if historical_requests else "No historical requests available."
    
    prompt = f"""
    Analyze if this donation request might be unusual or suspicious:
    
    Current request:
    - Institution: {institution['name']} ({institution['type']})
    - Beneficiaries: {institution['beneficiaries']}
    - Item: {item}
    - Quantity: {quantity} kg
    
    Historical requests:
    {history_text}
    
    Please analyze if the quantity requested seems reasonable for this institution size.
    Return a JSON with:
    - risk_score: A number from 1 (not suspicious) to 10 (highly suspicious)
    - reasoning: Brief explanation for your assessment
    """
    
    # Get analysis
    response = call_groq_api(prompt)
    
    # Try to parse JSON response
    try:
        # Extract JSON using regex
        import re
        json_match = re.search(r'({.*})', response, re.DOTALL)
        if json_match:
            json_str = json_match.group(1)
            json_result = json.loads(json_str)
            
            # Ensure numeric values are properly converted to integers
            if 'risk_score' in json_result:
                json_result['risk_score'] = int(json_result['risk_score'])
                
            return json_result
        else:
            # Fall back to manual parsing
            lines = response.split('\n')
            result = {}
            for line in lines:
                if "risk_score" in line.lower():
                    score_str = line.split(":", 1)[1].strip().strip('"')
                    result["risk_score"] = int(''.join(filter(str.isdigit, score_str)))
                elif "reasoning" in line.lower():
                    result["reasoning"] = line.split(":", 1)[1].strip().strip('"')
            return result
    except Exception as e:
        print(f"Error parsing anomaly detection: {e}")
        # Provide fallback response
        return {
            "risk_score": 3,
            "reasoning": "Unable to determine risk level due to processing error. Defaulting to low-medium risk."
        }

# API Routes

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/institutions', methods=['GET'])
def get_institutions():
    """Get list of all institutions."""
    return jsonify(institutions_db)

@app.route('/api/shops', methods=['GET'])
def get_shops():
    """Get list of all shops."""
    return jsonify(shops_db)

@app.route('/api/requests', methods=['GET'])
def get_requests():
    """Get list of all donation requests."""
    return jsonify(requests_db)

@app.route('/api/requests', methods=['POST'])
def create_request():
    """Create a new donation request."""
    data = request.json
    
    # Validate input
    required_fields = ['institution_id', 'item', 'quantity', 'estimated_cost']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400
    
    # Create request object
    request_id = str(uuid.uuid4())
    new_request = {
        "id": request_id,
        "institution_id": data['institution_id'],
        "item": data['item'],
        "quantity": int(data['quantity']),  # Ensure this is an integer
        "estimated_cost": int(data['estimated_cost']),  # Ensure this is an integer
        "fulfilled_quantity": 0,
        "status": "open",
        "date": datetime.now().isoformat()
    }
    
    # Check for anomalies
    anomaly_check = detect_request_anomalies(
        data['institution_id'], data['item'], data['quantity']
    )
    
    # Add request to database
    requests_db.append(new_request)
    
    return jsonify({
        "request": new_request,
        "anomaly_check": anomaly_check
    })

@app.route('/api/donations', methods=['POST'])
def create_donation():
    """Process a new donation."""
    data = request.json
    
    # Print received data for debugging
    print(f"Received donation data: {data}")
    
    # Validate input with more flexible checking
    required_fields = ['request_id', 'donor_name', 'donation_type']
    missing_fields = [field for field in required_fields if field not in data]
    
    if missing_fields:
        error_msg = f"Missing required fields: {', '.join(missing_fields)}"
        print(error_msg)
        return jsonify({"error": error_msg}), 400
    
    # Get request details
    request_obj = next((req for req in requests_db if req["id"] == data['request_id']), None)
    if not request_obj:
        error_msg = f"Request with ID {data['request_id']} not found"
        print(error_msg)
        return jsonify({"error": error_msg}), 404
    
    # Get institution details
    institution = next((inst for inst in institutions_db if inst["id"] == request_obj["institution_id"]), None)
    if not institution:
        error_msg = f"Institution with ID {request_obj['institution_id']} not found"
        print(error_msg)
        return jsonify({"error": error_msg}), 404
    
    # Process based on donation type
    if data['donation_type'] == 'money':
        # Check for amount field
        if 'amount' not in data:
            error_msg = "Money donation requires 'amount' field"
            print(error_msg)
            return jsonify({"error": error_msg}), 400
            
        try:
            # Convert amount to integer if it's a string
            amount = int(data['amount']) if isinstance(data['amount'], str) else data['amount']
            
            # Find optimal shop
            shop_match = find_optimal_shop(
                request_obj['item'], 
                request_obj['quantity'] - request_obj['fulfilled_quantity'],
                amount
            )
            
            # Make sure quantity_possible is an integer
            quantity_possible = int(shop_match['quantity_possible'])
            
            # Generate impact message
            impact_message = generate_impact_message(
                data['donor_name'],
                request_obj['item'],
                quantity_possible,
                institution['name'],
                institution['type'],
                institution['beneficiaries']
            )
            
            # Create donation record
            donation_id = str(uuid.uuid4())
            donation = {
                "id": donation_id,
                "request_id": data['request_id'],
                "donor_name": data['donor_name'],
                "amount": amount,
                "donation_type": "money",
                "shop_recommendation": shop_match,
                "impact_message": impact_message,
                "date": datetime.now().isoformat()
            }
            
            # Update request fulfillment
            request_obj['fulfilled_quantity'] += quantity_possible
            if request_obj['fulfilled_quantity'] >= request_obj['quantity']:
                request_obj['status'] = "fulfilled"
                
            # Add donation to database
            donations_db.append(donation)
            
            return jsonify({
                "donation": donation,
                "updated_request": request_obj
            })
        except Exception as e:
            error_msg = f"Error processing money donation: {str(e)}"
            print(error_msg)
            return jsonify({"error": error_msg}), 400
            
    elif data['donation_type'] == 'direct_item':
        try:
            # Check for quantity field
            if 'quantity' not in data:
                error_msg = "Direct item donation requires 'quantity' field"
                print(error_msg)
                return jsonify({"error": error_msg}), 400
                
            # Process direct item donation
            donation_id = str(uuid.uuid4())
            
            # Convert quantity to integer if it's a string
            item_quantity = int(data['quantity']) if isinstance(data['quantity'], str) else data['quantity']
            
            donation = {
                "id": donation_id,
                "request_id": data['request_id'],
                "donor_name": data['donor_name'],
                "quantity": item_quantity,
                "donation_type": "direct_item",
                "shop_id": data.get('shop_id'),
                "date": datetime.now().isoformat()
            }
            
            # Update request fulfillment
            request_obj['fulfilled_quantity'] += item_quantity
            if request_obj['fulfilled_quantity'] >= request_obj['quantity']:
                request_obj['status'] = "fulfilled"
                
            # Generate impact message
            impact_message = generate_impact_message(
                data['donor_name'],
                request_obj['item'],
                item_quantity,
                institution['name'],
                institution['type'],
                institution['beneficiaries']
            )
            
            donation["impact_message"] = impact_message
            
            # Add donation to database
            donations_db.append(donation)
            
            return jsonify({
                "donation": donation,
                "updated_request": request_obj
            })
        except Exception as e:
            error_msg = f"Error processing direct item donation: {str(e)}"
            print(error_msg)
            return jsonify({"error": error_msg}), 400
    
    else:
        error_msg = f"Invalid donation type: {data['donation_type']}"
        print(error_msg)
        return jsonify({"error": error_msg}), 400

# Run the application
if __name__ == '__main__':
    app.run(debug=True)