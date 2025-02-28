
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Package, Calendar, Clock, Apple, BookOpen, Cake, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  updated_at: string;
  institute_name: string;
}

const RequestsPage: React.FC = () => {
  const { user, userType } = useAuth();
  const [requests, setRequests] = useState<Request[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    // Fetch requests would be implemented here using Supabase
    // For now, we'll use an empty array to prevent errors
    setRequests([]);
    setFilteredRequests([]);
  }, []);

  const applyFilters = () => {
    let result = [...requests];
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(request => request.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(request => request.type === typeFilter);
    }
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(request => 
        request.institute_name.toLowerCase().includes(term) ||
        request.items.toLowerCase().includes(term) ||
        request.description?.toLowerCase().includes(term)
      );
    }
    
    setFilteredRequests(result);
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

  // Get request types for filtering
  const getUniqueTypes = () => {
    const types = Array.from(new Set(requests.map(r => r.type)));
    return types;
  };

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary">Donation Requests</h1>
            <p className="text-muted-foreground">
              {userType === 'institute'
                ? 'Manage your institute\'s donation requests'
                : 'Browse active requests from institutes'}
            </p>
          </div>
          
          {userType === 'institute' && (
            <Link to="/dashboard">
              <Button className="mt-4 md:mt-0">
                Create New Request
              </Button>
            </Link>
          )}
        </div>
        
        {/* Filters */}
        <Card className="mb-6 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Filter Requests</CardTitle>
              <Badge variant="outline" className="px-2">
                {filteredRequests.length} Results
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium block mb-2">Search</label>
                <div className="flex w-full items-center space-x-2">
                  <Input
                    type="text"
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Status</label>
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="In Progress">In Progress</SelectItem>
                    <SelectItem value="Fulfilled">Fulfilled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium block mb-2">Type</label>
                <Select 
                  value={typeFilter} 
                  onValueChange={setTypeFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Food">Food</SelectItem>
                    <SelectItem value="Medicine">Medicine</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Clothing">Clothing</SelectItem>
                    <SelectItem value="Celebration">Celebration</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Requests List */}
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <CardTitle>All Requests</CardTitle>
            <CardDescription>
              Browse and manage donation requests from institutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-6">Loading requests...</div>
            ) : filteredRequests.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                No requests found. Try adjusting your filters or check back later.
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="grid divide-y">
                  {filteredRequests.map((request) => (
                    <div key={request.id} className="p-4">
                      <div className="grid md:grid-cols-5 gap-4 items-center">
                        <div className="flex items-center gap-3 md:col-span-2">
                          {getRequestIcon(request.type)}
                          <div>
                            <div className="font-medium">{request.institute_name}</div>
                            <div className="text-sm text-muted-foreground">{request.type}</div>
                          </div>
                        </div>
                        <div className="text-sm hidden md:block">
                          {request.items}
                        </div>
                        <div className="text-sm font-medium">
                          ₹{request.amount_remaining.toLocaleString('en-IN')} / ₹{request.amount.toLocaleString('en-IN')}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Badge variant={request.status === 'Pending' ? 'outline' : 'default'}>
                            {request.status}
                          </Badge>
                          {userType === 'donor' && request.status !== 'Fulfilled' && (
                            <Link to={`/dashboard/make-donation?requestId=${request.id}`}>
                              <Button size="sm" className="h-8">Donate</Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RequestsPage;
