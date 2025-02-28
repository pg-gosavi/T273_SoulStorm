
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Heart, Package, Calendar, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Donation {
  id: string;
  amount: number;
  donation_type: 'money' | 'item';
  items: string | null;
  status: string;
  created_at: string;
  request: {
    type: string;
    items: string;
    institute: {
      institute_name: string;
    }
  } | null;
}

const DonationsPage: React.FC = () => {
  const { user, userType } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalDonated, setTotalDonated] = useState(0);

  useEffect(() => {
    // In a real app, this would fetch from the database
    setIsLoading(true);
    
    // Mock data for donations
    const mockDonations: Donation[] = [
      {
        id: '1',
        amount: 5000,
        donation_type: 'money',
        items: null,
        status: 'Completed',
        created_at: '2023-06-01T10:30:00Z',
        request: {
          type: 'Food',
          items: 'Rice, Dal, Vegetables',
          institute: {
            institute_name: 'Sunshine Orphanage'
          }
        }
      },
      {
        id: '2',
        amount: 8000,
        donation_type: 'money',
        items: null,
        status: 'Completed',
        created_at: '2023-05-15T14:20:00Z',
        request: {
          type: 'Medicine',
          items: 'First Aid Supplies',
          institute: {
            institute_name: 'Golden Age Home'
          }
        }
      },
      {
        id: '3',
        amount: 0,
        donation_type: 'item',
        items: 'Books, Notebooks, Pens (50 sets)',
        status: 'Completed',
        created_at: '2023-05-10T09:15:00Z',
        request: {
          type: 'Education',
          items: 'School Supplies',
          institute: {
            institute_name: 'Hope Children Center'
          }
        }
      }
    ];
    
    // Simulate API call
    setTimeout(() => {
      setDonations(mockDonations);
      
      // Calculate total amount donated
      const total = mockDonations.reduce((sum, donation) => {
        return sum + (donation.donation_type === 'money' ? donation.amount : 0);
      }, 0);
      
      setTotalDonated(total);
      setIsLoading(false);
    }, 500);
  }, []);

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
            <h1 className="text-2xl font-semibold text-primary">Donations</h1>
            <p className="text-muted-foreground">
              {userType === 'donor' 
                ? 'Track your contributions and their impact'
                : userType === 'institute'
                ? 'View donations received for your requests'
                : 'View all donations in the system'}
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center bg-secondary/50 px-4 py-2 rounded-lg">
            <span className="mr-2 text-sm text-muted-foreground">Total:</span>
            <span className="font-semibold text-lg">₹{totalDonated.toLocaleString('en-IN')}</span>
          </div>
        </div>
        
        <Card className="backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Donation History</CardTitle>
            <CardDescription>
              {userType === 'donor' 
                ? 'All your donations to various institutes'
                : userType === 'institute'
                ? 'All donations received for your requests'
                : 'All donations processed through the platform'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-6">Loading donations data...</div>
            ) : donations.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                {userType === 'donor' 
                  ? 'You have not made any donations yet.'
                  : userType === 'institute'
                  ? 'Your institute has not received any donations yet.'
                  : 'No donations have been made yet.'}
              </div>
            ) : (
              <div className="rounded-md border overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Institute</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {donations.map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(donation.created_at)}
                        </TableCell>
                        <TableCell>
                          {donation.request?.institute?.institute_name || 'N/A'}
                        </TableCell>
                        <TableCell>
                          <Badge variant={donation.donation_type === 'money' ? 'default' : 'outline'}>
                            {donation.donation_type === 'money' ? 'Money' : 'Items'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {donation.donation_type === 'money' 
                            ? (donation.request?.type || 'General') 
                            : donation.items || 'Various items'}
                        </TableCell>
                        <TableCell className="text-right font-medium">
                          {donation.donation_type === 'money' 
                            ? `₹${donation.amount.toLocaleString('en-IN')}` 
                            : '-'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DonationsPage;
