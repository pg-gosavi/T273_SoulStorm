
import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Store, Search, MapPin, Phone, ShoppingBag, Truck, ArrowUpRight } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Supplier {
  id: string;
  shop_name: string;
  address: string;
  phone: string;
  services: string[];
}

const SuppliersPage: React.FC = () => {
  const { userType } = useAuth();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for suppliers
  const mockSuppliers: Supplier[] = [
    {
      id: '1',
      shop_name: 'Fresh Grocery Store',
      address: '123 Market Street, Mumbai, Maharashtra',
      phone: '+91 9876543210',
      services: ['Groceries', 'Vegetables', 'Fruits']
    },
    {
      id: '2',
      shop_name: 'City Bakery',
      address: '456 Bread Lane, Delhi, Delhi',
      phone: '+91 9876543211',
      services: ['Bakery', 'Cakes', 'Pastries']
    },
    {
      id: '3',
      shop_name: 'Med World Pharmacy',
      address: '789 Health Road, Bangalore, Karnataka',
      phone: '+91 9876543212',
      services: ['Medicines', 'Healthcare', 'First Aid']
    },
    {
      id: '4',
      shop_name: 'Book Haven',
      address: '101 Knowledge Street, Chennai, Tamil Nadu',
      phone: '+91 9876543213',
      services: ['Books', 'Stationery', 'School Supplies']
    }
  ];

  useEffect(() => {
    // In a real app, this would fetch from the database
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuppliers(mockSuppliers);
      setFilteredSuppliers(mockSuppliers);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSuppliers(suppliers);
    } else {
      const filtered = suppliers.filter(supplier => 
        supplier.shop_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        supplier.services.some(service => service.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredSuppliers(filtered);
    }
  }, [searchTerm, suppliers]);

  return (
    <DashboardLayout>
      <div className="px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-primary">Suppliers</h1>
            <p className="text-muted-foreground">
              Browse our partner suppliers and stores
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Suppliers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            <div className="col-span-full text-center py-10">
              <p>Loading suppliers...</p>
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-muted-foreground">No suppliers found matching your search.</p>
            </div>
          ) : (
            filteredSuppliers.map(supplier => (
              <Card key={supplier.id} className="backdrop-blur-sm overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <Store className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{supplier.shop_name}</CardTitle>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Truck className="h-3.5 w-3.5" />
                      Partner
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {supplier.services.map((service, index) => (
                        <Badge key={index} variant="secondary" className="font-normal">
                          {service}
                        </Badge>
                      ))}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{supplier.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">{supplier.phone}</span>
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

export default SuppliersPage;
