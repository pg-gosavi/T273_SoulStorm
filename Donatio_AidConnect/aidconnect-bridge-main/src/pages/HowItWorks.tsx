
import React, { useEffect } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Heart, Users, ShoppingBag, Shield, CheckCircle2, 
  ArrowRight, Sparkles, BarChart3, Globe 
} from 'lucide-react';

const HowItWorks = () => {
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

  const steps = [
    {
      icon: <Users className="h-10 w-10 text-accent" />,
      title: "Institutes Register Needs",
      description: "Verified organizations submit their specific needs and requirements through our secure platform.",
      details: [
        "Detailed request submission with quantities and specifications",
        "Real-time status tracking of all requests",
        "Priority flagging for urgent needs"
      ]
    },
    {
      icon: <Heart className="h-10 w-10 text-accent" />,
      title: "Donors Browse & Contribute",
      description: "Donors can browse verified requests and contribute fixed amounts or specific items with complete transparency.",
      details: [
        "Filter requests by location, type, or organization",
        "Choose between direct item donation or monetary contribution",
        "Receive updates on how your donation is being utilized"
      ]
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-accent" />,
      title: "Suppliers Fulfill Requests",
      description: "Local verified suppliers receive orders, fulfill them, and deliver items directly to institutions.",
      details: [
        "Automatic order matching based on location and specialization",
        "Quality verification process for all suppliers",
        "Direct payment system without middlemen"
      ]
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-accent" />,
      title: "Transparent Verification",
      description: "Our platform verifies all transactions and deliveries, ensuring complete transparency throughout the process.",
      details: [
        "Digital delivery confirmation from institutions",
        "Photo and receipt documentation",
        "Feedback system for quality assurance"
      ]
    }
  ];

  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-accent" />,
      title: "100% Secure Transactions",
      description: "Every financial transaction is encrypted and protected with enterprise-grade security."
    },
    {
      icon: <Globe className="h-8 w-8 text-accent" />,
      title: "Complete Transparency",
      description: "Track every step of your donation from contribution to delivery."
    },
    {
      icon: <Sparkles className="h-8 w-8 text-accent" />,
      title: "AI-Powered Matching",
      description: "Our intelligent system matches donations with the most urgent needs for maximum impact."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-accent" />,
      title: "Impact Measurement",
      description: "Receive detailed reports on the real-world impact of your contributions."
    }
  ];

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-secondary/30 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">How AidConnect Works</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Our innovative platform connects donors directly with institutions and suppliers, ensuring transparency and eliminating the need for direct money transfers.
            </p>
            <Link to="/register">
              <Button size="lg">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Our Simple 4-Step Process</h2>
            <p className="text-lg text-muted-foreground">
              AidConnect streamlines the donation process to ensure maximum impact and efficiency.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 mb-16 last:mb-0 relative flex flex-col md:flex-row"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Timeline connector (only for items except the last) */}
                {index < steps.length - 1 && (
                  <div className="absolute left-6 md:left-10 top-16 bottom-0 w-0.5 bg-border z-0 hidden md:block"></div>
                )}
                
                {/* Step number and icon */}
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8 z-10">
                  <div className="flex items-center justify-center w-12 h-12 md:w-20 md:h-20 rounded-full bg-secondary text-accent border border-border font-bold text-xl">
                    {index + 1}
                  </div>
                </div>
                
                {/* Step content */}
                <div className="flex-grow bg-card border border-border/50 rounded-lg p-6 md:p-8 shadow-sm backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row md:items-center mb-4">
                    <div className="mb-4 md:mb-0 md:mr-4">{step.icon}</div>
                    <h3 className="text-2xl font-bold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-accent mr-2 mt-0.5 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16 animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Key Benefits of Our Platform</h2>
            <p className="text-lg text-muted-foreground">
              AidConnect offers unique advantages that make your donation experience secure and impactful.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index} 
                className="animate-on-scroll opacity-0 bg-card border border-border/50 rounded-lg p-6 shadow-sm hover:border-accent/20 transition-all duration-300 backdrop-blur-sm"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16 animate-on-scroll opacity-0">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-lg text-muted-foreground">
                Get answers to common questions about how AidConnect works.
              </p>
            </div>

            <div className="space-y-6 animate-on-scroll opacity-0">
              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">How do I know my donation is being used properly?</h3>
                <p className="text-muted-foreground">
                  Our platform provides complete transparency through verification at every step. You can track your donation from contribution to delivery, with photographic evidence and receipt documentation from the receiving institution.
                </p>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Why doesn't AidConnect allow direct money transfers?</h3>
                <p className="text-muted-foreground">
                  By eliminating direct money transfers, we ensure that funds are used specifically for the requested items and services. This creates a more transparent and accountable system where donors can see exactly how their contributions are making an impact.
                </p>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">How are suppliers verified?</h3>
                <p className="text-muted-foreground">
                  Suppliers undergo a rigorous verification process that includes business registration validation, quality assessments, and background checks. We also maintain a rating system based on delivery speed, quality, and institution feedback to ensure only reliable suppliers fulfill requests.
                </p>
              </div>

              <div className="bg-card border border-border/50 rounded-lg p-6 shadow-sm backdrop-blur-sm">
                <h3 className="text-xl font-semibold mb-2">Can I donate to specific institutions?</h3>
                <p className="text-muted-foreground">
                  Absolutely! You can browse requests by institution and choose to fulfill specific needs from organizations you'd like to support. You can also set up recurring donations to your favorite institutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-on-scroll opacity-0">
            <h2 className="text-3xl font-bold mb-4">Ready to Make a Difference?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join our community today and be part of a transparent, impactful donation ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="px-8">
                  Create an Account
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
};

export default HowItWorks;
