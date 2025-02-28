
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, Search, MapPin, Phone, Verified, Users, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Institute {
  id: string;
  institute_name: string;
  address: string;
  description: string;
  phone: string;
  verified: boolean;
}

const InstitutesPage: React.FC = () => {
  const { userType } = useAuth();
  const [institutes, setInstitutes] = useState<Institute[]>([]);
  const [filteredInstitutes, setFilteredInstitutes] = useState<Institute[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for institutes
  const mockInstitutes: Institute[] = [
    {
      id: '1',
      institute_name: 'Sunshine Orphanage',
      address: '123 Main Street, Mumbai, Maharashtra',
      description: 'A loving home for orphaned children providing education, nutrition, and healthcare.',
      phone: '+91 9876543210',
      verified: true
    },
    {
      id: '2',
      institute_name: 'Golden Age Home',
      address: '456 Oak Avenue, Delhi, Delhi',
      description: 'Caring for elderly individuals who need assistance and companionship.',
      phone: '+91 9876543211',
      verified: true
    },
    {
      id: '3',
      institute_name: 'Hope Children Center',
      address: '789 Pine Road, Bangalore, Karnataka',
      description: 'Supporting underprivileged children with education and basic necessities.',
      phone: '+91 9876543212',
      verified: false
    },
    {
      id: '4',
      institute_name: 'New Beginnings Shelter',
      address: '101 Cedar Lane, Chennai, Tamil Nadu',
      description: 'Providing temporary shelter and support for homeless families.',
      phone: '+91 9876543213',
      verified: true
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from the database
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInstitutes(mockInstitutes);
      setFilteredInstitutes(mockInstitutes);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredInstitutes(institutes);
    } else {
      const filtered = institutes.filter(institute => 
        institute.institute_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredInstitutes(filtered);
    }
  }, [searchTerm, institutes]);

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary">Institutes</h1>
            <p className="text-muted-foreground">
              Browse verified institutes that need your support
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search institutes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Institutes Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full text-center py-10">
              <p>Loading institutes...</p>
            </div>
          ) : filteredInstitutes.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No institutes found matching your search.</p>
            </div>
          ) : (
            filteredInstitutes.map(institute => (
              <Card key={institute.id} className="backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{institute.institute_name}</CardTitle>
                    </div>
                    {institute.verified && (
                      <Badge className="bg-green-600">
                        <Verified className="h-3.5 w-3.5 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {institute.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{institute.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{institute.phone}</span>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" className="h-8 flex items-center gap-1">
                        View Details
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstitutesPage;
