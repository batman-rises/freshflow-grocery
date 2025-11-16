import { Link, useParams } from 'react-router-dom';
import { ShoppingCart, Phone, MessageCircle, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const OrderTracking = () => {
  const { orderId } = useParams();
  const [countdown, setCountdown] = useState(15 * 60); // 15 minutes in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const orderSteps = [
    {
      id: 1,
      title: 'Order Confirmed',
      time: 'Today, 7:30 AM',
      status: 'completed',
      icon: CheckCircle,
    },
    {
      id: 2,
      title: 'Packed',
      time: 'Today, 7:45 AM',
      status: 'completed',
      icon: Package,
    },
    {
      id: 3,
      title: 'Out for Delivery',
      time: 'Today, 8:00 AM',
      status: 'active',
      icon: Truck,
      description: 'Arriving in 15 minutes',
    },
    {
      id: 4,
      title: 'Delivered',
      time: 'Expected: 8:15 AM',
      status: 'pending',
      icon: CheckCircle,
    },
  ];

  const orderItems = [
    { name: 'Fresh Tomatoes', quantity: 2, weight: '500g', price: 80 },
    { name: 'Amul Milk', quantity: 1, weight: '1L', price: 62 },
    { name: 'Britannia Bread', quantity: 1, weight: '400g', price: 40 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/products" className="flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold">FreshCart</span>
          </Link>
          <Button variant="ghost" asChild>
            <Link to="/products">Back to Products</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Order Header */}
        <div className="bg-card p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Order #{orderId}</h1>
              <div className="flex items-center gap-2">
                <div className="px-3 py-1 bg-warning/20 text-warning rounded-full text-sm font-medium animate-pulse-glow">
                  Out for Delivery
                </div>
              </div>
            </div>
            <div className="text-left md:text-right">
              <p className="text-muted-foreground text-sm">Estimated Delivery</p>
              <p className="text-2xl font-bold text-primary">{formatTime(countdown)}</p>
              <p className="text-sm text-muted-foreground">minutes remaining</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left - Timeline & Map */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Placeholder */}
            <div className="bg-card rounded-lg shadow-sm overflow-hidden">
              <div className="h-80 bg-gradient-to-br from-primary/10 to-primary/5 relative flex items-center justify-center">
                <div className="text-center space-y-4">
                  <MapPin className="h-16 w-16 text-primary mx-auto animate-pulse" />
                  <p className="text-xl font-medium">Live Tracking</p>
                  <p className="text-muted-foreground">
                    Your order is on the way!
                  </p>
                  <div className="flex items-center gap-2 justify-center">
                    <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-sm">Delivery partner is 2.5 km away</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h2 className="text-xl font-heading font-bold mb-6">Order Timeline</h2>
              <div className="space-y-6">
                {orderSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.id} className="flex gap-4">
                      <div className="relative">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            step.status === 'completed'
                              ? 'bg-success text-success-foreground'
                              : step.status === 'active'
                              ? 'bg-primary text-primary-foreground animate-pulse-glow'
                              : 'bg-muted text-muted-foreground'
                          }`}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        {index < orderSteps.length - 1 && (
                          <div
                            className={`absolute left-1/2 top-12 -translate-x-1/2 w-0.5 h-12 ${
                              step.status === 'completed' ? 'bg-success' : 'bg-muted'
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 pt-2">
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">{step.time}</p>
                        {step.description && (
                          <p className="text-sm text-primary font-medium mt-1">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right - Delivery Person & Order Details */}
          <div className="space-y-6">
            {/* Delivery Person Card */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold mb-4">Delivery Partner</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                  RK
                </div>
                <div className="flex-1">
                  <p className="font-semibold">Rajesh Kumar</p>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-warning">⭐</span>
                    <span className="text-sm font-medium">4.8</span>
                    <span className="text-sm text-muted-foreground">(240 deliveries)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">🏍️ KA-01-AB-1234</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button className="bg-primary hover:bg-primary/90">
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat
                </Button>
              </div>
            </div>

            {/* Order Details */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold mb-4">Order Details</h3>
              <div className="space-y-3">
                {orderItems.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-muted-foreground">
                        {item.weight} x{item.quantity}
                      </p>
                    </div>
                    <p className="font-medium">₹{item.price}</p>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹182</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Payment: Paid via UPI
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-card p-6 rounded-lg shadow-sm">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Delivery Address
              </h3>
              <div className="text-sm space-y-1">
                <p className="font-medium">Home</p>
                <p>John Doe</p>
                <p className="text-muted-foreground">9876543210</p>
                <p className="text-muted-foreground">
                  123 Park Street, Kolkata - 700016
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                Call Support
              </Button>
              <Button variant="outline" className="w-full text-destructive hover:text-destructive">
                Cancel Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
