
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  PlusCircle, Package, Clock, CheckCircle, Archive, BarChart3, ShoppingBag,
  Calendar, ArrowUpRight, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { useAuth } from '@/contexts/AuthContext';

// Mock data for pending requests
const pendingRequests = [
  {
    id: 1,
    type: 'Food',
    items: 'Rice (10kg), Dal (5kg), Vegetables, Cooking Oil',
    requestedDate: '2023-06-15',
    amount: 8500,
    status: 'Pending',
    urgency: 'High'
  },
  {
    id: 2,
    type: 'Medicine',
    items: 'First Aid Supplies, Common Medications',
    requestedDate: '2023-06-10',
    amount: 12000,
    status: 'In Progress',
    urgency: 'Medium'
  },
  {
    id: 3,
    type: 'Education',
    items: 'Notebooks (50), Pencils, Erasers, Sharpeners',
    requestedDate: '2023-06-05',
    amount: 6000,
    status: 'Pending',
    urgency: 'Low'
  }
];

// Mock data for completed requests
const completedRequests = [
  {
    id: 4,
    type: 'Food',
    items: 'Rice, Lentils, Vegetables, Fruits',
    requestedDate: '2023-05-20',
    fulfilledDate: '2023-05-25',
    amount: 10500,
    supplier: 'Fresh Grocery Store'
  },
  {
    id: 5,
    type: 'Celebration',
    items: 'Birthday Cake, Decorations, Snacks',
    requestedDate: '2023-05-10',
    fulfilledDate: '2023-05-15',
    amount: 7500,
    supplier: 'City Bakery'
  }
];

const monthlyStats = [
  { month: 'Jan', fulfilled: 35000, pending: 15000 },
  { month: 'Feb', fulfilled: 42000, pending: 18000 },
  { month: 'Mar', fulfilled: 28000, pending: 22000 },
  { month: 'Apr', fulfilled: 36000, pending: 19000 },
  { month: 'May', fulfilled: 45000, pending: 12000 },
  { month: 'Jun', fulfilled: 30000, pending: 25000 },
];

const InstituteDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestForm, setRequestForm] = useState({
    type: '',
    items: '',
    description: '',
    amount: '',
    urgency: 'Medium' as 'Low' | 'Medium' | 'High',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRequestForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setRequestForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would normally submit to the backend
    toast.success('Supply request submitted successfully!');
    setShowRequestForm(false);
    setRequestForm({
      type: '',
      items: '',
      description: '',
      amount: '',
      urgency: 'Medium',
    });
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Institute Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.name || 'User'}! Manage your supply requests and track donations.</p>
        </div>
        <Button 
          className="mt-4 md:mt-0 flex items-center gap-1.5"
          onClick={() => setShowRequestForm(!showRequestForm)}
        >
          <PlusCircle className="h-4 w-4" />
          Create New Request
        </Button>
      </div>

      {showRequestForm && (
        <Card className="mb-6 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Create Supply Request</CardTitle>
            <CardDescription>
              Submit a request for necessary supplies. Donors will see this request and can choose to fulfill it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitRequest} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Request Type</Label>
                  <Select 
                    value={requestForm.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Medicine">Medicine</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Celebration">Celebration</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select 
                    value={requestForm.urgency} 
                    onValueChange={(value) => handleSelectChange('urgency', value as 'Low' | 'Medium' | 'High')}
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="items">Items Needed</Label>
                <Input
                  id="items"
                  name="items"
                  value={requestForm.items}
                  onChange={handleInputChange}
                  placeholder="e.g. Rice (10kg), Dal (5kg), Vegetables"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={requestForm.description}
                  onChange={handleInputChange}
                  placeholder="Provide additional details about your request..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Estimated Amount (₹)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  value={requestForm.amount}
                  onChange={handleInputChange}
                  placeholder="Enter estimated cost in ₹"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowRequestForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{pendingRequests.length}</div>
              <div className="bg-secondary/80 text-accent rounded-full p-2">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-accent flex items-center mt-1">
              <span>{pendingRequests.filter(r => r.urgency === 'High').length} urgent requests pending</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Fulfilled Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{completedRequests.length}</div>
              <div className="bg-secondary/80 text-green-500 rounded-full p-2">
                <CheckCircle className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <span>Recently fulfilled</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹385,000</div>
              <div className="bg-secondary/80 text-blue-500 rounded-full p-2">
                <BarChart3 className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-blue-500 flex items-center mt-1">
              <span>₹45,000 this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Supplier Partners</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">12</div>
              <div className="bg-secondary/80 text-purple-500 rounded-full p-2">
                <ShoppingBag className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-purple-500 flex items-center mt-1">
              <span>2 new partnerships this month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Pending Requests</CardTitle>
                <CardDescription>Requests awaiting donor fulfillment</CardDescription>
              </div>
              <Badge variant="outline" className="flex items-center">
                <AlertCircle className="h-3.5 w-3.5 mr-1 text-amber-500" />
                <span>{pendingRequests.length} pending</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid divide-y">
                {pendingRequests.map((request) => (
                  <div key={request.id} className="p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            <div className="font-medium">{request.type}</div>
                            <Badge 
                              variant={
                                request.urgency === 'High' 
                                  ? 'destructive' 
                                  : request.urgency === 'Medium' 
                                    ? 'default' 
                                    : 'outline'
                              }
                              className="ml-2"
                            >
                              {request.urgency}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {request.items}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          ₹{request.amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Requested: {request.requestedDate}
                        </div>
                        <Badge 
                          variant={request.status === 'In Progress' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {request.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
              View All Requests
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Recently Fulfilled</CardTitle>
                <CardDescription>Requests that have been completed</CardDescription>
              </div>
              <Badge variant="default" className="flex items-center bg-green-600">
                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                <span>Fulfilled</span>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <div className="grid divide-y">
                {completedRequests.map((request) => (
                  <div key={request.id} className="p-4">
                    <div className="flex flex-col space-y-2">
                      <div className="flex justify-between items-start">
                        <div className="flex flex-col">
                          <div className="font-medium">{request.type}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {request.items}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          ₹{request.amount.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="text-xs text-muted-foreground">
                          Fulfilled by: {request.supplier}
                        </div>
                        <div className="text-xs text-green-600 flex items-center">
                          <CheckCircle className="h-3.5 w-3.5 mr-1" />
                          {request.fulfilledDate}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
              View All Completed
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card className="backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle>Monthly Request Statistics</CardTitle>
          <CardDescription>Overview of request fulfillment by month</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyStats} barGap={0} barCategoryGap={30}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip
                  formatter={(value) => [`₹${(value as number).toLocaleString('en-IN')}`, 'Amount']}
                  cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                />
                <Bar dataKey="fulfilled" fill="hsl(var(--accent))" name="Fulfilled" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="hsl(var(--muted))" name="Pending" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstituteDashboard;
