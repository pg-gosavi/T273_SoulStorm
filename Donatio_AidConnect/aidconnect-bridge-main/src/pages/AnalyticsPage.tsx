
import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const AnalyticsPage: React.FC = () => {
  const { userType } = useAuth();

  // Mock data for charts
  const donationsByMonth = [
    { name: 'Jan', donations: 40000 },
    { name: 'Feb', donations: 55000 },
    { name: 'Mar', donations: 32000 },
    { name: 'Apr', donations: 48000 },
    { name: 'May', donations: 70000 },
    { name: 'Jun', donations: 62000 },
    { name: 'Jul', donations: 58000 },
    { name: 'Aug', donations: 45000 },
    { name: 'Sep', donations: 50000 },
    { name: 'Oct', donations: 63000 },
    { name: 'Nov', donations: 75000 },
    { name: 'Dec', donations: 82000 },
  ];

  const donationsByCategory = [
    { name: 'Food', value: 35 },
    { name: 'Medicine', value: 25 },
    { name: 'Education', value: 20 },
    { name: 'Clothing', value: 10 },
    { name: 'Celebration', value: 10 },
  ];

  const donationsByRegion = [
    { name: 'North', value: 30 },
    { name: 'South', value: 25 },
    { name: 'East', value: 20 },
    { name: 'West', value: 25 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A569BD'];

  const requestsFulfilledAnalytics = [
    { name: 'Jan', pending: 15, fulfilled: 25 },
    { name: 'Feb', pending: 20, fulfilled: 35 },
    { name: 'Mar', pending: 10, fulfilled: 22 },
    { name: 'Apr', pending: 18, fulfilled: 30 },
    { name: 'May', pending: 12, fulfilled: 58 },
    { name: 'Jun', pending: 15, fulfilled: 47 },
    { name: 'Jul', pending: 25, fulfilled: 33 },
    { name: 'Aug', pending: 18, fulfilled: 27 },
    { name: 'Sep', pending: 20, fulfilled: 30 },
    { name: 'Oct', pending: 15, fulfilled: 48 },
    { name: 'Nov', pending: 12, fulfilled: 63 },
    { name: 'Dec', pending: 10, fulfilled: 72 },
  ];

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary">Analytics</h1>
            <p className="text-muted-foreground">
              {userType === 'donor' 
                ? 'View insights on your donations and their impact'
                : userType === 'institute'
                ? 'View statistics about your requests and received donations'
                : 'Track orders, deliveries, and earnings'}
            </p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="regions">Regions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Donations by Month</CardTitle>
                  <CardDescription>Total donations in ₹ throughout the year</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={donationsByMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                        <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                        <Bar dataKey="donations" fill="hsl(var(--primary))" name="Donations" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Requests Fulfilled</CardTitle>
                  <CardDescription>Pending vs. fulfilled requests by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={requestsFulfilledAnalytics} barGap={0} barCategoryGap={10}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="fulfilled" name="Fulfilled" fill="hsl(var(--primary))" />
                        <Bar dataKey="pending" name="Pending" fill="hsl(var(--muted))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Monthly Donation Trends</CardTitle>
                <CardDescription>Donation patterns throughout the year</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={donationsByMonth}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₹${value/1000}k`} />
                      <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                      <Legend />
                      <Line type="monotone" dataKey="donations" stroke="hsl(var(--primary))" name="Donations" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="categories">
            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Donations by Category</CardTitle>
                <CardDescription>Distribution of donations across categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationsByCategory}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {donationsByCategory.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regions">
            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Donations by Region</CardTitle>
                <CardDescription>Distribution of donations across different regions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={donationsByRegion}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={150}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {donationsByRegion.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
