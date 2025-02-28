
import React, { useEffect } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DonorDashboard from '@/components/dashboard/DonorDashboard';
import InstituteDashboard from '@/components/dashboard/InstituteDashboard';
import SupplierDashboard from '@/components/dashboard/SupplierDashboard';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { userType, profile, loading } = useAuth();
  const navigate = useNavigate();

  // Ensure the user is authenticated
  useEffect(() => {
    if (!loading && !profile) {
      navigate('/login');
    }
  }, [loading, profile, navigate]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-[calc(100vh-64px)]">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Loading your dashboard...</h2>
            <p className="text-muted-foreground">Please wait</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  const renderDashboard = () => {
    switch (userType) {
      case 'donor':
        return <DonorDashboard />;
      case 'institute':
        return <InstituteDashboard />;
      case 'supplier':
        return <SupplierDashboard />;
      default:
        return <DonorDashboard />;
    }
  };
  
  return (
    <DashboardLayout>
      {/* User welcome message */}
      <div className="px-4 py-2 bg-muted/50 border-b flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Welcome, <span className="font-medium text-foreground">{profile?.name || 'User'}</span>
        </div>
        
        {/* For development purposes only - would be removed in production */}
        {process.env.NODE_ENV === 'development' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Currently viewing as:</span>
            <div className="bg-primary/10 px-2 py-1 rounded-md text-sm font-medium capitalize">
              {userType || 'donor'}
            </div>
          </div>
        )}
      </div>
      
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
