import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, Tag, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { toast } from 'sonner';

const Cart = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  const coupons = [
    { code: 'SAVE50', discount: 50, description: 'Get ₹50 off' },
    { code: 'FIRST100', discount: 100, description: '₹100 off on first order' },
  ];

  const deliveryCharge = totalPrice >= 500 ? 0 : 40;
  const discount = appliedCoupon?.discount || 0;
  const finalTotal = totalPrice + deliveryCharge - discount;

  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode.toUpperCase());
    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success(`Coupon ${coupon.code} applied!`);
    } else {
      toast.error('Invalid coupon code');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <nav className="border-b bg-background">
          <div className="container mx-auto px-4 h-16 flex items-center">
            <Link to="/products" className="flex items-center gap-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-heading font-bold">FreshCart</span>
            </Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-48 h-48 mx-auto bg-muted rounded-full flex items-center justify-center">
              <ShoppingBag className="h-24 w-24 text-muted-foreground" />
            </div>
            <h2 className="text-3xl font-heading font-bold">Your cart is empty</h2>
            <p className="text-muted-foreground">
              Looks like you haven't added anything yet
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to="/products">Start Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-background sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Link to="/products" className="flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold">FreshCart</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Cart Items */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-heading font-bold">
                Shopping Cart ({totalItems} items)
              </h1>
              <Button variant="ghost" asChild>
                <Link to="/products">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Continue Shopping
                </Link>
              </Button>
            </div>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-card p-4 rounded-lg shadow-sm flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{item.weight}</p>
                    <p className="text-sm text-muted-foreground">₹{item.price} per pack</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="font-bold">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Price Details */}
          <div className="lg:w-96">
            <div className="sticky top-24 space-y-6">
              {/* Price Details Card */}
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-heading font-bold mb-4">Price Details</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Price ({totalItems} items)</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between text-success">
                      <span>Discount ({appliedCoupon.code})</span>
                      <span>-₹{discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery Charges</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-success font-medium">FREE</span>
                    ) : (
                      <span>₹{deliveryCharge}</span>
                    )}
                  </div>
                  {totalPrice < 500 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{500 - totalPrice} more for free delivery
                    </p>
                  )}
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Amount</span>
                      <span>₹{finalTotal}</span>
                    </div>
                  </div>
                </div>

                {discount > 0 && (
                  <div className="mt-4 p-3 bg-success/10 rounded-lg">
                    <p className="text-sm text-success font-medium">
                      You saved ₹{discount} on this order 🎉
                    </p>
                  </div>
                )}

                <Button
                  className="w-full mt-6 bg-primary hover:bg-primary/90"
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </div>

              {/* Coupon Section */}
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Apply Coupon
                </h3>
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  />
                  <Button onClick={applyCoupon}>Apply</Button>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Available Coupons:</p>
                  {coupons.map((coupon) => (
                    <div
                      key={coupon.code}
                      className="p-3 border border-dashed rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5"
                      onClick={() => {
                        setAppliedCoupon(coupon);
                        setCouponCode(coupon.code);
                        toast.success(`Coupon ${coupon.code} applied!`);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-sm">{coupon.code}</p>
                          <p className="text-xs text-muted-foreground">{coupon.description}</p>
                        </div>
                        <Button variant="link" size="sm">Apply</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
