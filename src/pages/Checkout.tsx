import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, MapPin, Clock, CreditCard, Check, Home, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Checkout = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [addressData, setAddressData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    pincode: '',
    flat: '',
    area: '',
    landmark: '',
    city: '',
    state: '',
    addressType: 'home',
    isDefault: false,
  });

  const [deliveryData, setDeliveryData] = useState({
    date: 'today',
    slot: '8-10',
    speed: 'express',
  });

  const [paymentData, setPaymentData] = useState({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
    upiId: '',
    useWallet: false,
  });

  const deliveryCharge = deliveryData.speed === 'express' ? 20 : 0;
  const walletBalance = 50;
  const walletUsed = paymentData.useWallet ? Math.min(walletBalance, totalPrice) : 0;
  const finalTotal = totalPrice + deliveryCharge - walletUsed;

  const handlePlaceOrder = () => {
    const newOrderId = 'ORD' + Date.now();
    setOrderId(newOrderId);
    setOrderPlaced(true);
    clearCart();
    toast.success('Order placed successfully!');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-background">
        <div className="text-center space-y-6 max-w-md animate-fade-in">
          <div className="w-24 h-24 mx-auto bg-success rounded-full flex items-center justify-center">
            <Check className="h-12 w-12 text-success-foreground" />
          </div>
          <h1 className="text-4xl font-heading font-bold">Order Placed Successfully! 🎉</h1>
          <p className="text-xl text-muted-foreground">Order ID: {orderId}</p>
          <p className="text-muted-foreground">
            Estimated Delivery: Today, 8:00 AM - 10:00 AM
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
              <Link to={`/order-tracking/${orderId}`}>Track Order</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
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
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { num: 1, label: 'Address' },
              { num: 2, label: 'Delivery' },
              { num: 3, label: 'Payment' },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step >= s.num
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > s.num ? <Check className="h-5 w-5" /> : s.num}
                  </div>
                  <span className="text-sm mt-2">{s.label}</span>
                </div>
                {idx < 2 && (
                  <div
                    className={`flex-1 h-1 ${
                      step > s.num ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left - Steps */}
          <div className="flex-1">
            {step === 1 && (
              <div className="bg-card p-6 rounded-lg shadow-sm space-y-4">
                <h2 className="text-2xl font-heading font-bold mb-4">Delivery Address</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={addressData.name}
                      onChange={(e) => setAddressData({ ...addressData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={addressData.phone}
                      onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="pincode">Pincode</Label>
                    <Input
                      id="pincode"
                      value={addressData.pincode}
                      onChange={(e) => setAddressData({ ...addressData, pincode: e.target.value })}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="flat">Flat/House No, Building Name</Label>
                    <Input
                      id="flat"
                      value={addressData.flat}
                      onChange={(e) => setAddressData({ ...addressData, flat: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="area">Area, Street Name</Label>
                  <Input
                    id="area"
                    value={addressData.area}
                    onChange={(e) => setAddressData({ ...addressData, area: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="landmark">Landmark (Optional)</Label>
                  <Input
                    id="landmark"
                    value={addressData.landmark}
                    onChange={(e) => setAddressData({ ...addressData, landmark: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={addressData.city}
                      onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      value={addressData.state}
                      onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label>Address Type</Label>
                  <RadioGroup
                    value={addressData.addressType}
                    onValueChange={(value) => setAddressData({ ...addressData, addressType: value })}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="home" id="home" />
                      <Label htmlFor="home">Home</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="office" id="office" />
                      <Label htmlFor="office">Office</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="default"
                    checked={addressData.isDefault}
                    onCheckedChange={(checked) => setAddressData({ ...addressData, isDefault: checked as boolean })}
                  />
                  <Label htmlFor="default">Make this my default address</Label>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-card p-6 rounded-lg shadow-sm space-y-6">
                <h2 className="text-2xl font-heading font-bold">Delivery Time Slot</h2>

                <div>
                  <Label>Select Date</Label>
                  <RadioGroup
                    value={deliveryData.date}
                    onValueChange={(value) => setDeliveryData({ ...deliveryData, date: value })}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem value="today" id="today" className="peer sr-only" />
                      <Label
                        htmlFor="today"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <span className="font-medium">Today</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="tomorrow" id="tomorrow" className="peer sr-only" />
                      <Label
                        htmlFor="tomorrow"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <span className="font-medium">Tomorrow</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label>Select Time Slot</Label>
                  <RadioGroup
                    value={deliveryData.slot}
                    onValueChange={(value) => setDeliveryData({ ...deliveryData, slot: value })}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    {['8-10', '10-12', '12-14', '14-16', '16-18', '18-20'].map((slot) => (
                      <div key={slot}>
                        <RadioGroupItem value={slot} id={slot} className="peer sr-only" />
                        <Label
                          htmlFor={slot}
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                        >
                          <Clock className="h-5 w-5 mb-1" />
                          <span className="text-sm font-medium">{slot.replace('-', ':00 - ')}:00</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label>Delivery Speed</Label>
                  <RadioGroup
                    value={deliveryData.speed}
                    onValueChange={(value) => setDeliveryData({ ...deliveryData, speed: value })}
                    className="grid grid-cols-2 gap-4 mt-2"
                  >
                    <div>
                      <RadioGroupItem value="express" id="express" className="peer sr-only" />
                      <Label
                        htmlFor="express"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <span className="font-medium">⚡ Express</span>
                        <span className="text-sm text-muted-foreground">10-min delivery +₹20</span>
                      </Label>
                    </div>
                    <div>
                      <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                      <Label
                        htmlFor="standard"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                      >
                        <span className="font-medium">🚚 Standard</span>
                        <span className="text-sm text-muted-foreground">60-min delivery FREE</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={() => setStep(3)}>
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-card p-6 rounded-lg shadow-sm space-y-6">
                <h2 className="text-2xl font-heading font-bold">Payment Method</h2>

                <RadioGroup
                  value={paymentData.method}
                  onValueChange={(value) => setPaymentData({ ...paymentData, method: value })}
                  className="space-y-4"
                >
                  <div>
                    <RadioGroupItem value="card" id="card" className="peer sr-only" />
                    <Label
                      htmlFor="card"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5" />
                        <div>
                          <p className="font-medium">Credit/Debit Card</p>
                          <p className="text-sm text-muted-foreground">Visa, Mastercard, Rupay</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="upi" id="upi" className="peer sr-only" />
                    <Label
                      htmlFor="upi"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">📱</div>
                        <div>
                          <p className="font-medium">UPI</p>
                          <p className="text-sm text-muted-foreground">PhonePe, GPay, Paytm</p>
                        </div>
                      </div>
                    </Label>
                  </div>

                  <div>
                    <RadioGroupItem value="cod" id="cod" className="peer sr-only" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">💵</div>
                        <div>
                          <p className="font-medium">Cash on Delivery</p>
                          <p className="text-sm text-muted-foreground">Pay when you receive</p>
                        </div>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>

                {paymentData.method === 'card' && (
                  <div className="space-y-4 pt-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div>
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input id="cardName" placeholder="Name on card" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiry">Expiry (MM/YY)</Label>
                        <Input id="expiry" placeholder="12/25" />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="123" type="password" maxLength={3} />
                      </div>
                    </div>
                  </div>
                )}

                {paymentData.method === 'upi' && (
                  <div className="pt-4">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input id="upiId" placeholder="yourname@paytm" />
                  </div>
                )}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">Wallet Balance</p>
                      <p className="text-sm text-muted-foreground">Available: ₹{walletBalance}</p>
                    </div>
                    <Checkbox
                      checked={paymentData.useWallet}
                      onCheckedChange={(checked) =>
                        setPaymentData({ ...paymentData, useWallet: checked as boolean })
                      }
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={handlePlaceOrder}
                  >
                    Place Order
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:w-96">
            <div className="sticky top-24 bg-card p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-heading font-bold mb-4">Order Summary</h3>

              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                {items.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                {items.length > 5 && (
                  <p className="text-xs text-muted-foreground">+{items.length - 5} more items</p>
                )}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                {deliveryCharge > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span>₹{deliveryCharge}</span>
                  </div>
                )}
                {walletUsed > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Wallet</span>
                    <span>-₹{walletUsed}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {step >= 1 && addressData.name && (
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Delivering to
                  </h4>
                  <p className="text-sm">{addressData.name}</p>
                  <p className="text-sm text-muted-foreground">{addressData.phone}</p>
                  <p className="text-sm text-muted-foreground">
                    {addressData.flat}, {addressData.area}
                  </p>
                </div>
              )}

              {step >= 2 && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Delivery on
                  </h4>
                  <p className="text-sm capitalize">{deliveryData.date}, {deliveryData.slot.replace('-', ':00 - ')}:00</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
