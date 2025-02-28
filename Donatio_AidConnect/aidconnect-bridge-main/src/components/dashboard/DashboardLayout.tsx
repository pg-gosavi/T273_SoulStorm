
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { 
  Heart, Home, Package, Users, ShoppingBag, BarChart3, Settings, LogOut,
  ChevronRight, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { profile, signOut } = useAuth();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = [
    { name: 'Dashboard', path: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { name: 'Donations', path: '/dashboard/donations', icon: <Heart className="h-5 w-5" /> },
    { name: 'Requests', path: '/dashboard/requests', icon: <Package className="h-5 w-5" /> },
    { name: 'Institutes', path: '/dashboard/institutes', icon: <Users className="h-5 w-5" /> },
    { name: 'Suppliers', path: '/dashboard/suppliers', icon: <ShoppingBag className="h-5 w-5" /> },
    { name: 'Analytics', path: '/dashboard/analytics', icon: <BarChart3 className="h-5 w-5" /> },
    { name: 'Settings', path: '/dashboard/settings', icon: <Settings className="h-5 w-5" /> },
  ];

  return (
    <div className="flex h-screen bg-secondary/30">
      {/* Sidebar for desktop */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-card border-r border-border/50">
        <div className="flex-1 flex flex-col min-h-0">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-border/50">
            <Link to="/" className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-accent" />
              <span className="font-medium text-xl">AidConnect</span>
            </Link>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === item.path
                    ? "bg-secondary text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-primary"
                )}
              >
                <span className={cn(
                  "mr-3 flex-shrink-0",
                  location.pathname === item.path
                    ? "text-accent"
                    : "text-muted-foreground group-hover:text-accent"
                )}>
                  {item.icon}
                </span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-border/50 p-4">
          <div className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src="" alt={profile?.name || "User"} />
                <AvatarFallback>{getInitials(profile?.name || "User")}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium text-primary">{profile?.name || "User"}</p>
                <button
                  onClick={handleLogout}
                  className="text-xs text-muted-foreground group-hover:text-accent flex items-center mt-1"
                >
                  <LogOut className="h-3.5 w-3.5 mr-1" />
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between h-16 bg-card border-b border-border/50 px-4">
        <div className="flex items-center">
          <button
            type="button"
            className="text-primary focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
          <Link to="/" className="ml-3 flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            <span className="font-medium text-lg">AidConnect</span>
          </Link>
        </div>
        <Avatar className="h-8 w-8">
          <AvatarImage src="" alt={profile?.name || "User"} />
          <AvatarFallback>{getInitials(profile?.name || "User")}</AvatarFallback>
        </Avatar>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div className="fixed inset-0 bg-black/50" onClick={toggleMobileMenu}></div>
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-card">
            <div className="flex-1 h-0 pt-16 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={cn(
                      "group flex items-center px-3 py-2 text-base font-medium rounded-md transition-colors",
                      location.pathname === item.path
                        ? "bg-secondary text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-primary"
                    )}
                    onClick={toggleMobileMenu}
                  >
                    <span className={cn(
                      "mr-3 flex-shrink-0",
                      location.pathname === item.path
                        ? "text-accent"
                        : "text-muted-foreground group-hover:text-accent"
                    )}>
                      {item.icon}
                    </span>
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-border/50 p-4">
              <div className="flex-shrink-0 w-full group block">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={profile?.name || "User"} />
                    <AvatarFallback>{getInitials(profile?.name || "User")}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <p className="text-base font-medium text-primary">{profile?.name || "User"}</p>
                    <button
                      onClick={() => {
                        handleLogout();
                        toggleMobileMenu();
                      }}
                      className="text-sm text-muted-foreground group-hover:text-accent flex items-center mt-1"
                    >
                      <LogOut className="h-4 w-4 mr-1" />
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1 w-full">
        <div className="hidden lg:block h-16"></div> {/* Spacer for desktop */}
        <div className="block lg:hidden h-16"></div>   {/* Spacer for mobile */}
        <main className="flex-1 pb-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
