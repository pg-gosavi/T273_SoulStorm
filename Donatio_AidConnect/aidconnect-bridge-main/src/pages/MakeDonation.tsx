
import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Heart, Package, Calendar, Clock, Apple, BookOpen, Cake } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

interface Request {
  id: string;
  institute_id: string;
  type: string;
  items: string;
  description?: string;
  amount: number;
  amount_remaining: number;
  urgency: 'Low' | 'Medium' | 'High';
  status: 'Pending' | 'In Progress' | 'Fulfilled';
  created_at: string;
  institute_name: string;
}

const MakeDonation: React.FC = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const requestId = searchParams.get('requestId');
  
  const [donationType, setDonationType] = useState<'money' | 'item'>('money');
  const [amount, setAmount] = useState('');
  const [items, setItems] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock request data
  const mockRequest: Request = {
    id: '1',
    institute_id: '123',
    type: 'Food',
    items: 'Rice (10kg), Dal (5kg), Vegetables, Cooking Oil',
    description: 'Monthly groceries needed for 25 children at the orphanage.',
    amount: 8500,
    amount_remaining: 6500,
    urgency: 'Medium',
    status: 'In Progress',
    created_at: '2023-06-15T10:30:00Z',
    institute_name: 'Sunshine Orphanage'
  };
  
  const [selectedRequest] = useState<Request | null>(mockRequest);
  
  const handleSubmitDonation = async () => {
    if (!user) {
      toast.error("You must be logged in to make a donation");
      return;
    }
    
    if (!selectedRequest) {
      toast.error("Please select a request to donate to");
      return;
    }
    
    if (donationType === 'money' && (!amount || isNaN(parseFloat(amount)))) {
      toast.error("Please enter a valid donation amount");
      return;
    }
    
    if (donationType === 'item' && !items) {
      toast.error("Please specify the items you wish to donate");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        toast.success('Thank you for your donation!');
        navigate('/dashboard');
        setIsSubmitting(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error making donation:", error);
      toast.error("Failed to process your donation");
      setIsSubmitting(false);
    }
  };
  
  // Helper function to get appropriate icon based on request type
  const getRequestIcon = (type: string) => {
    switch(type) {
      case 'Food':
        return <Apple className="h-8 w-8 text-green-500 p-1.5 bg-green-100 rounded-full" />;
      case 'Medicine':
        return <Heart className="h-8 w-8 text-red-500 p-1.5 bg-red-100 rounded-full" />;
      case 'Education':
        return <BookOpen className="h-8 w-8 text-blue-500 p-1.5 bg-blue-100 rounded-full" />;
      case 'Celebration':
        return <Cake className="h-8 w-8 text-pink-500 p-1.5 bg-pink-100 rounded-full" />;
      default:
        return <Package className="h-8 w-8 text-purple-500 p-1.5 bg-purple-100 rounded-full" />;
    }
  };
  
  // Format date from ISO string to readable format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary">Make a Donation</h1>
            <p className="text-muted-foreground">
              {selectedRequest 
                ? `Donating to ${selectedRequest.institute_name}'s request` 
                : 'Select a request to support'}
            </p>
          </div>
          <Button 
            variant="outline" 
            className="mt-4 md:mt-0" 
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
        
        {/* Selected request card */}
        {selectedRequest && (
          <Card className="mb-6 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-4">
                  {getRequestIcon(selectedRequest.type)}
                  <div>
                    <CardTitle>{selectedRequest.institute_name}</CardTitle>
                    <CardDescription>
                      {selectedRequest.type} - {formatDate(selectedRequest.created_at)}
                    </CardDescription>
                  </div>
                </div>
                <Badge 
                  variant={selectedRequest.urgency === 'High' ? 'destructive' : 'outline'}
                >
                  {selectedRequest.urgency} Priority
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Requested Items</h3>
                <p>{selectedRequest.items}</p>
              </div>
              
              {selectedRequest.description && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Description</h3>
                  <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Amount Needed</h3>
                  <p className="text-xl font-semibold">₹{selectedRequest.amount_remaining.toLocaleString('en-IN')}</p>
                  <p className="text-xs text-muted-foreground">of ₹{selectedRequest.amount.toLocaleString('en-IN')} total</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-1">Status</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedRequest.status === 'Pending' ? 'outline' : 'default'}>
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Donation type selection */}
        <Card className="mb-6 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>How would you like to donate?</CardTitle>
            <CardDescription>Choose your preferred donation method</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup 
              defaultValue="money" 
              value={donationType}
              onValueChange={(value) => setDonationType(value as 'money' | 'item')}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div className={`border rounded-lg p-4 ${donationType === 'money' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="money" id="money" />
                  <Label htmlFor="money" className="cursor-pointer font-medium">Donate Money</Label>
                </div>
                <p className="mt-2 text-sm text-muted-foreground pl-6">
                  Provide financial support directly to the institute's request.
                </p>
              </div>
              
              <div className={`border rounded-lg p-4 ${donationType === 'item' ? 'border-primary bg-primary/5' : ''}`}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="item" id="item" />
                  <Label htmlFor="item" className="cursor-pointer font-medium">Donate Items</Label>
                </div>
                <p className="mt-2 text-sm text-muted-foreground pl-6">
                  Donate specific items mentioned in the request.
                </p>
              </div>
            </RadioGroup>
            
            <div className="mt-6">
              {donationType === 'money' ? (
                <div className="space-y-2">
                  <Label htmlFor="amount">Donation Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount in ₹"
                    required
                  />
                  {selectedRequest && (
                    <p className="text-xs text-muted-foreground">
                      Amount needed: ₹{selectedRequest.amount_remaining.toLocaleString('en-IN')}
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <Label htmlFor="items">Items to Donate</Label>
                  <Textarea
                    id="items"
                    value={items}
                    onChange={(e) => setItems(e.target.value)}
                    placeholder="Specify the items you wish to donate..."
                    rows={4}
                    required
                  />
                  {selectedRequest && (
                    <p className="text-xs text-muted-foreground">
                      Requested items: {selectedRequest.items}
                    </p>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              onClick={handleSubmitDonation} 
              disabled={isSubmitting || !selectedRequest || (donationType === 'money' && !amount) || (donationType === 'item' && !items)}
              className="flex items-center gap-1.5"
            >
              <Heart className="h-4 w-4" />
              {isSubmitting ? 'Processing...' : 'Complete Donation'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MakeDonation;
