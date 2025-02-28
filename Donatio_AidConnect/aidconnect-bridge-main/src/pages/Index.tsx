
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/layout/AppLayout';
import {
  Heart, Globe, ShieldCheck, Handshake, ArrowRight,
  BarChart3, Sparkles, Users, ShoppingBag
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // Animation on scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.animate-on-scroll').forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  const stats = [
    { value: '1,200+', label: 'Successful donations', icon: <Heart className="h-5 w-5 text-accent" /> },
    { value: '85+', label: 'Verified institutions', icon: <Users className="h-5 w-5 text-accent" /> },
    { value: '95%', label: 'Transparency rating', icon: <BarChart3 className="h-5 w-5 text-accent" /> },
    { value: '120+', label: 'Local suppliers', icon: <ShoppingBag className="h-5 w-5 text-accent" /> },
  ];

  const features = [
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: 'Transparent Donations',
      description: 'Every donation is tracked and verified, ensuring your contribution reaches the intended recipients.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-accent" />,
      title: 'Secure Transactions',
      description: 'Your financial information is protected with state-of-the-art security measures.',
    },
    {
      icon: <Handshake className="h-8 w-8 text-accent" />,
      title: 'Direct Impact',
      description: 'Connect directly with institutions and see the real impact of your generous contributions.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-accent" />,
      title: 'AI-Powered Matching',
      description: 'Our intelligent system matches your donations with the most urgent needs for maximum impact.',
    },
  ];

  const testimonials = [
    {
      quote: "AidConnect has transformed how we receive support. The transparency builds trust, and we're now able to meet our needs more efficiently than ever before.",
      author: "Sarah Johnson",
      role: "Director, Sunshine Orphanage",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      quote: "As a donor, I appreciate seeing exactly how my contributions are used. The direct connection with institutions makes the experience much more meaningful.",
      author: "Michael Chen",
      role: "Regular Donor",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&h=100&auto=format&fit=crop",
    },
    {
      quote: "Being a verified supplier on AidConnect has helped us serve our community while growing our business. The platform is intuitive and well-designed.",
      author: "Elena Rodriguez",
      role: "Local Supplier",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=100&h=100&auto=format&fit=crop",
    },
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-secondary/30">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none"></div>
        <div className="container mx-auto px-4 py-24 sm:py-32">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-accent/10 text-accent mb-5">
              <Heart className="h-4 w-4 mr-1.5" />
              Transparent Giving Platform
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-primary mb-6">
              Connect Donors with Those in Need, Securely
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              AidConnect bridges the gap between donors and institutions, ensuring transparency and trust in every donation without direct money transfers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="px-8">Get Started</Button>
              </Link>
              <Link to="/how-it-works">
                <Button size="lg" variant="outline" className="px-8">
                  How It Works
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 flex flex-col items-center text-center bg-card rounded-lg border border-border/50 p-6 shadow-sm hover:border-accent/20 hover:shadow-accent/5 transition-all duration-300"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-2">{stat.icon}</div>
                <div className="text-2xl sm:text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">How AidConnect Works</h2>
            <p className="text-lg text-muted-foreground">
              Our platform ensures transparency and eliminates direct money transfers, making the donation process secure and impactful.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="animate-on-scroll opacity-0 flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <Heart className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Donors Contribute</h3>
              <p className="text-muted-foreground">
                Choose to donate specific items or fixed amounts that go directly toward fulfilling real needs.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Institutes Request</h3>
              <p className="text-muted-foreground">
                Verified orphanages, elderly homes, and other institutions submit their specific needs and requirements.
              </p>
            </div>

            <div className="animate-on-scroll opacity-0 flex flex-col items-center text-center" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 text-accent mb-4">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Suppliers Fulfill</h3>
              <p className="text-muted-foreground">
                Local verified suppliers fulfill the requests, receiving direct payments and delivering goods to institutions.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/how-it-works">
              <Button variant="outline" className="animate-on-scroll opacity-0" style={{ animationDelay: '400ms' }}>
                Learn More About Our Process
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Why Choose AidConnect</h2>
            <p className="text-lg text-muted-foreground">
              Our platform is built on principles of transparency, security, and direct impact — making your donation experience seamless and meaningful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="animate-on-scroll opacity-0 border-border/50 hover:border-accent/20 transition-all duration-300 backdrop-blur-sm" style={{ animationDelay: `${index * 100}ms` }}>
                <CardContent className="pt-6">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">What People Are Saying</h2>
            <p className="text-lg text-muted-foreground">
              Hear from our community of donors, institutions, and suppliers about their experiences with AidConnect.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="animate-on-scroll opacity-0 bg-card rounded-lg border border-border/50 p-6 shadow-sm transition-all duration-300 backdrop-blur-sm"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-medium">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm backdrop-blur-sm animate-on-scroll opacity-0">
            <div className="flex flex-col md:flex-row">
              <div className="p-8 md:p-12 md:w-2/3">
                <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Join our community of donors, institutions, and suppliers to create a transparent and impactful giving ecosystem.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg">Get Started</Button>
                  </Link>
                  <Link to="/login">
                    <Button size="lg" variant="outline">
                      I Already Have an Account
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/3 bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center p-12">
                <Heart className="h-24 w-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default Index;
