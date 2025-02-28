
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { 
  Heart, Cake, Apple, BookOpen, Package, ArrowUpRight,
  TrendingUp, CalendarDays
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

// Mock data for requests
const recentRequests = [
  {
    id: 1,
    institute: 'Sunshine Orphanage',
    type: 'Food',
    items: 'Rice, Vegetables, Fruits',
    amount: 12500,
    date: '2023-06-10',
    status: 'Pending',
    icon: <Apple className="h-8 w-8 text-green-500 p-1.5 bg-green-100 rounded-full" />,
  },
  {
    id: 2,
    institute: 'Golden Age Home',
    type: 'Medicine',
    items: 'Antibiotics, Vitamins',
    amount: 21500,
    date: '2023-06-05',
    status: 'Fulfilled',
    icon: <Heart className="h-8 w-8 text-red-500 p-1.5 bg-red-100 rounded-full" />,
  },
  {
    id: 3,
    institute: 'Hope Children Center',
    type: 'Education',
    items: 'Books, Notebooks, Pens',
    amount: 15000,
    date: '2023-06-01',
    status: 'Pending',
    icon: <BookOpen className="h-8 w-8 text-blue-500 p-1.5 bg-blue-100 rounded-full" />,
  },
  {
    id: 4,
    institute: 'Sunshine Orphanage',
    type: 'Celebration',
    items: 'Birthday Cake & Supplies',
    amount: 7500,
    date: '2023-05-25',
    status: 'Fulfilled',
    icon: <Cake className="h-8 w-8 text-pink-500 p-1.5 bg-pink-100 rounded-full" />,
  },
];

const donationData = [
  { month: 'Jan', amount: 22500 },
  { month: 'Feb', amount: 32500 },
  { month: 'Mar', amount: 16000 },
  { month: 'Apr', amount: 27000 },
  { month: 'May', amount: 40000 },
  { month: 'Jun', amount: 30000 },
];

const DonorDashboard: React.FC = () => {
  const { profile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState({
    totalDonations: 162000,
    requestsFulfilled: 28,
    institutesHelped: 12,
    upcomingEvents: 3
  });

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Donor Dashboard</h1>
          <p className="text-muted-foreground">Welcome, {profile?.name || 'User'}! Here's an overview of your donations and impact.</p>
        </div>
        <Link to="/dashboard/make-donation">
          <Button className="mt-4 md:mt-0 flex items-center gap-1.5">
            <Heart className="h-4 w-4" />
            Make a Donation
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Donations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹{stats.totalDonations.toLocaleString('en-IN')}</div>
              <div className="bg-secondary/80 text-accent rounded-full p-2">
                <Heart className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-accent flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+24% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Requests Fulfilled</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.requestsFulfilled}</div>
              <div className="bg-secondary/80 text-green-500 rounded-full p-2">
                <Package className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Institutes Helped</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.institutesHelped}</div>
              <div className="bg-secondary/80 text-blue-500 rounded-full p-2">
                <BookOpen className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-blue-500 flex items-center mt-1">
              <TrendingUp className="h-3 w-3 mr-1" />
              <span>+4 new this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
              <div className="bg-secondary/80 text-purple-500 rounded-full p-2">
                <CalendarDays className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-purple-500 flex items-center mt-1">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>Next: Children's Day (2 days)</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card className="col-span-2 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>Your monthly donation overview</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationData}>
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value}`} />
                  <Tooltip
                    formatter={(value) => [`₹${value}`, 'Amount']}
                    cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                  />
                  <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Impact Summary</CardTitle>
            <CardDescription>Your donations have helped</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-secondary/80 text-green-500 rounded-full p-2.5">
                <Apple className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Provided 1,200 meals</p>
                <p className="text-xs text-muted-foreground">To 5 different orphanages</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary/80 text-blue-500 rounded-full p-2.5">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Funded education for 30 children</p>
                <p className="text-xs text-muted-foreground">Books, supplies, and uniforms</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary/80 text-red-500 rounded-full p-2.5">
                <Heart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Provided medicine for 45 elderly</p>
                <p className="text-xs text-muted-foreground">At Golden Age Home</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary/80 text-pink-500 rounded-full p-2.5">
                <Cake className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium">Celebrated 12 birthdays</p>
                <p className="text-xs text-muted-foreground">For children at Hope Center</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Recent Donation Requests</CardTitle>
                <CardDescription>Browse active requests from institutes</CardDescription>
              </div>
              <Link to="/dashboard/requests">
                <Button variant="outline" size="sm" className="h-8 flex items-center gap-1">
                  View All
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-6">Loading requests...</div>
            ) : (
              <div className="rounded-md border">
                <div className="grid divide-y">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="p-4">
                      <div className="grid md:grid-cols-5 gap-4 items-center">
                        <div className="flex items-center gap-3 md:col-span-2">
                          {request.icon}
                          <div>
                            <div className="font-medium">{request.institute}</div>
                            <div className="text-sm text-muted-foreground">{request.type}</div>
                          </div>
                        </div>
                        <div className="text-sm hidden md:block">
                          {request.items}
                        </div>
                        <div className="text-sm font-medium">
                          ₹{request.amount.toLocaleString('en-IN')}
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <Badge variant={request.status === 'Pending' ? 'outline' : 'default'}>
                            {request.status}
                          </Badge>
                          <Link to={`/dashboard/make-donation?requestId=${request.id}`}>
                            <Button size="sm" className="h-8">Donate</Button>
                          </Link>
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
    </div>
  );
};

export default DonorDashboard;
