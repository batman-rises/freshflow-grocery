import { Link } from 'react-router-dom';
import { ShoppingBag, Zap, DollarSign, Star, ChevronRight, Truck, Package, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-groceries.jpg';

const Landing = () => {
  const features = [
    { icon: Zap, title: '10-Minute Delivery', description: 'Lightning fast delivery to your doorstep' },
    { icon: DollarSign, title: 'Best Prices Guaranteed', description: 'Competitive prices on all products' },
    { icon: Star, title: 'Fresh & Quality Products', description: 'Hand-picked fresh groceries daily' },
  ];

  const steps = [
    { icon: Package, title: 'Browse Products', description: 'Explore 5000+ items' },
    { icon: ShoppingBag, title: 'Add to Cart', description: 'Select your favorites' },
    { icon: Truck, title: 'Choose Delivery Time', description: 'Pick your slot' },
    { icon: CheckCircle, title: 'Get Delivered', description: 'Receive in 10 minutes' },
  ];

  const categories = [
    { emoji: '🥕', name: 'Fruits & Vegetables', count: '500+ items' },
    { emoji: '🥛', name: 'Dairy & Bakery', count: '200+ items' },
    { emoji: '🍿', name: 'Snacks & Beverages', count: '300+ items' },
    { emoji: '🧴', name: 'Personal Care', count: '150+ items' },
  ];

  return (
    <div className="min-h-screen">
      {/* Navbar */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold text-foreground">FreshCart</span>
          </div>
          <div className="flex gap-3">
            <Button variant="ghost" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-heading font-bold leading-tight">
                Fresh Groceries Delivered in{' '}
                <span className="text-primary">10 Minutes</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Order from 5000+ products and get lightning-fast delivery
              </p>
              <div className="flex gap-4">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-float">
              <img 
                src={heroImage} 
                alt="Fresh Groceries" 
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            Why Choose Us?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl shadow-md hover-lift transition-all"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-heading font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold">
              Shop by Category
            </h2>
            <Button variant="ghost" asChild>
              <Link to="/products">
                View All <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-xl shadow-md hover-lift cursor-pointer"
              >
                <div className="text-5xl mb-4">{category.emoji}</div>
                <h3 className="font-heading font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6" />
                <span className="text-xl font-heading font-bold">FreshCart</span>
              </div>
              <p className="text-background/80">Fresh groceries delivered in 10 minutes</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact</Link></li>
                <li><Link to="/careers">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/terms">Terms of Service</Link></li>
                <li><Link to="/privacy">Privacy Policy</Link></li>
                <li><Link to="/refund">Refund Policy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-background/30">
                  f
                </div>
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-background/30">
                  𝕏
                </div>
                <div className="w-10 h-10 bg-background/20 rounded-full flex items-center justify-center cursor-pointer hover:bg-background/30">
                  in
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/80">
            <p>&copy; 2025 FreshCart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
