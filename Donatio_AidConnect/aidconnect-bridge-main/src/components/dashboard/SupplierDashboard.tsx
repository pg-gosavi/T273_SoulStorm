
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ShoppingBag, TruckIcon, CheckCircle2, Clock, CalendarDays, 
  ArrowUpRight, Circle, FileClock, FileCheck, PackageCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { toast } from 'sonner';

const newOrders = [
  {
    id: 1,
    institute: 'Sunshine Orphanage',
    type: 'Food',
    items: 'Rice (10kg), Dal (5kg), Vegetables, Cooking Oil',
    amount: 8500,
    requestDate: '2023-06-15',
    donor: 'Rahul Sharma',
    status: 'Pending Acceptance'
  },
  {
    id: 2,
    institute: 'Hope Children Center',
    type: 'Education',
    items: 'Notebooks (50), Pencils, Erasers, Sharpeners',
    amount: 6000,
    requestDate: '2023-06-14',
    donor: 'Priya Patel',
    status: 'Pending Acceptance'
  },
  {
    id: 3,
    institute: 'Golden Age Home',
    type: 'Medicine',
    items: 'First Aid Supplies, Common Medications',
    amount: 12000,
    requestDate: '2023-06-12',
    donor: 'Suresh Kumar',
    status: 'Accepted'
  }
];

const inProgressOrders = [
  {
    id: 4,
    institute: 'New Hope Center',
    type: 'Food',
    items: 'Rice, Wheat Flour, Cooking Oil, Spices',
    amount: 7500,
    requestDate: '2023-06-10',
    acceptedDate: '2023-06-11',
    estimatedDelivery: '2023-06-18',
    donor: 'Amit Singh',
    status: 'In Progress'
  },
  {
    id: 5,
    institute: 'Sunshine Orphanage',
    type: 'Celebration',
    items: 'Birthday Cake, Decorations, Snacks',
    amount: 5500,
    requestDate: '2023-06-08',
    acceptedDate: '2023-06-09',
    estimatedDelivery: '2023-06-17',
    donor: 'Meera Reddy',
    status: 'Ready for Delivery'
  }
];

const monthlyEarnings = [
  { month: 'Jan', amount: 55000 },
  { month: 'Feb', amount: 62000 },
  { month: 'Mar', amount: 48000 },
  { month: 'Apr', amount: 66000 },
  { month: 'May', amount: 75000 },
  { month: 'Jun', amount: 58000 },
];

const SupplierDashboard: React.FC = () => {
  const [orderActionLoading, setOrderActionLoading] = useState<number | null>(null);

  const handleAcceptOrder = (orderId: number) => {
    setOrderActionLoading(orderId);
    // Simulate API call
    setTimeout(() => {
      toast.success('Order accepted successfully!');
      setOrderActionLoading(null);
    }, 1000);
  };

  const handleRejectOrder = (orderId: number) => {
    setOrderActionLoading(orderId);
    // Simulate API call
    setTimeout(() => {
      toast.success('Order rejected');
      setOrderActionLoading(null);
    }, 1000);
  };

  const handleMarkAsReady = (orderId: number) => {
    setOrderActionLoading(orderId);
    // Simulate API call
    setTimeout(() => {
      toast.success('Order marked as ready for delivery!');
      setOrderActionLoading(null);
    }, 1000);
  };

  const handleMarkAsDelivered = (orderId: number) => {
    setOrderActionLoading(orderId);
    // Simulate API call
    setTimeout(() => {
      toast.success('Order marked as delivered!');
      setOrderActionLoading(null);
    }, 1000);
  };

  return (
    <div className="px-4 py-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-primary">Supplier Dashboard</h1>
          <p className="text-muted-foreground">Manage orders and track deliveries</p>
        </div>
        <Button className="mt-4 md:mt-0 flex items-center gap-1.5">
          <ShoppingBag className="h-4 w-4" />
          Store Settings
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">3</div>
              <div className="bg-secondary/80 text-blue-500 rounded-full p-2">
                <FileClock className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-blue-500 flex items-center mt-1">
              <span>2 awaiting acceptance</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">5</div>
              <div className="bg-secondary/80 text-amber-500 rounded-full p-2">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-amber-500 flex items-center mt-1">
              <span>1 ready for delivery</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">142</div>
              <div className="bg-secondary/80 text-green-500 rounded-full p-2">
                <FileCheck className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-green-500 flex items-center mt-1">
              <span>18 this month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="backdrop-blur-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">₹58,000</div>
              <div className="bg-secondary/80 text-accent rounded-full p-2">
                <TruckIcon className="h-4 w-4" />
              </div>
            </div>
            <div className="text-xs text-accent flex items-center mt-1">
              <CalendarDays className="h-3 w-3 mr-1" />
              <span>June 2023</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Orders & In Progress */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 mb-6">
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <CardTitle>New Orders</CardTitle>
            <CardDescription>Orders awaiting acceptance or rejection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {newOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium flex items-center gap-2">
                            {order.institute}
                            <Badge 
                              variant={order.status === 'Accepted' ? 'default' : 'outline'}
                              className="text-xs"
                            >
                              {order.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {order.type}: {order.items}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Requested: {order.requestDate} • Donor: {order.donor}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        ₹{order.amount.toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell className="text-right">
                        {order.status === 'Pending Acceptance' ? (
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectOrder(order.id)}
                              disabled={orderActionLoading === order.id}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleAcceptOrder(order.id)}
                              disabled={orderActionLoading === order.id}
                            >
                              Accept
                            </Button>
                          </div>
                        ) : (
                          <Button 
                            size="sm"
                            onClick={() => handleMarkAsReady(order.id)}
                            disabled={orderActionLoading === order.id}
                            className="flex items-center gap-1"
                          >
                            <PackageCheck className="h-3.5 w-3.5" />
                            Mark Ready
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card className="backdrop-blur-sm">
          <CardHeader>
            <CardTitle>In Progress Orders</CardTitle>
            <CardDescription>Orders being prepared or ready for delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order Details</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inProgressOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <div className="font-medium">{order.institute}</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {order.type}: {order.items}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            ₹{order.amount.toLocaleString('en-IN')} • Due: {order.estimatedDelivery}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={order.status === 'Ready for Delivery' ? 'default' : 'outline'}
                          className={`${order.status === 'Ready for Delivery' ? 'bg-amber-500' : ''} flex items-center gap-1`}
                        >
                          {order.status === 'Ready for Delivery' ? (
                            <>
                              <CheckCircle2 className="h-3 w-3" />
                              Ready
                            </>
                          ) : (
                            <>
                              <Circle className="h-3 w-3 fill-current" />
                              In Progress
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {order.status === 'Ready for Delivery' ? (
                          <Button 
                            size="sm"
                            onClick={() => handleMarkAsDelivered(order.id)}
                            disabled={orderActionLoading === order.id}
                            className="flex items-center gap-1"
                          >
                            <TruckIcon className="h-3.5 w-3.5" />
                            Mark Delivered
                          </Button>
                        ) : (
                          <Button 
                            size="sm"
                            variant="outline"
                            onClick={() => handleMarkAsReady(order.id)}
                            disabled={orderActionLoading === order.id}
                            className="flex items-center gap-1"
                          >
                            <PackageCheck className="h-3.5 w-3.5" />
                            Mark Ready
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
              View All Orders
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Monthly Earnings Chart */}
      <Card className="backdrop-blur-sm mb-6">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>Your earnings for the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyEarnings}>
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
                <Tooltip
                  formatter={(value) => [`₹${(value as number).toLocaleString('en-IN')}`, 'Amount']}
                  cursor={{fill: 'rgba(255, 255, 255, 0.1)'}}
                />
                <Bar dataKey="amount" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierDashboard;
