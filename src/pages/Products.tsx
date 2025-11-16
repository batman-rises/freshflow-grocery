import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Heart, User, MapPin, ChevronDown, Star, Plus, Minus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { products, categories } from '@/data/products';

const Products = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { items, addToCart, updateQuantity, totalItems } = useCart();
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popularity');
  const [wishlist, setWishlist] = useState<number[]>([]);

  const getItemQuantity = (productId: number) => {
    const item = items.find(i => i.id === productId);
    return item?.quantity || 0;
  };

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight,
    });
  };

  const filteredProducts = products
    .filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    .filter(p => selectedCategories.length === 0 || selectedCategories.includes(p.category));

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b bg-background sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingCart className="h-8 w-8 text-primary" />
            <span className="text-2xl font-heading font-bold hidden md:block">FreshCart</span>
          </Link>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Button>

            <Button variant="ghost" size="icon" className="relative" onClick={() => navigate('/cart')}>
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow">
                  {totalItems}
                </span>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="px-2 py-1.5 text-sm font-medium">{user?.name}</div>
                <DropdownMenuItem onClick={() => navigate('/orders')}>My Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/profile')}>My Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => { logout(); navigate('/login'); }}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="border-t bg-muted/30">
          <div className="container mx-auto px-4 py-2">
            <Button variant="ghost" size="sm" className="text-sm">
              <MapPin className="h-4 w-4 mr-2" />
              Deliver to: <span className="font-medium ml-1">Kolkata, 700001</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Sidebar - Filters */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h3 className="font-heading font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div key={category.name} className="flex items-center gap-2">
                      <Checkbox
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category.name]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category.name));
                          }
                        }}
                      />
                      <label htmlFor={category.name} className="text-sm cursor-pointer flex-1">
                        {category.name}
                      </label>
                      <span className="text-xs text-muted-foreground">({category.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h3 className="font-heading font-semibold mb-4">Price Range</h3>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Discount */}
              <div className="bg-card p-4 rounded-lg shadow-sm">
                <h3 className="font-heading font-semibold mb-4">Discount</h3>
                <div className="space-y-3">
                  {['10% and above', '20% and above', '50% and above'].map((discount) => (
                    <div key={discount} className="flex items-center gap-2">
                      <Checkbox id={discount} />
                      <label htmlFor={discount} className="text-sm cursor-pointer">
                        {discount}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" className="w-full" onClick={() => {
                setPriceRange([0, 500]);
                setSelectedCategories([]);
              }}>
                Clear All Filters
              </Button>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  Showing {filteredProducts.length} products
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Popularity</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => {
                const quantity = getItemQuantity(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-card rounded-lg shadow-sm overflow-hidden hover-lift group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-2 left-2 bg-destructive text-destructive-foreground text-xs font-medium px-2 py-1 rounded">
                          {product.discount}% OFF
                        </div>
                      )}
                      <button
                        onClick={() => {
                          if (wishlist.includes(product.id)) {
                            setWishlist(wishlist.filter(id => id !== product.id));
                          } else {
                            setWishlist([...wishlist, product.id]);
                          }
                        }}
                        className="absolute top-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                      >
                        <Heart
                          className={`h-5 w-5 ${wishlist.includes(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`}
                        />
                      </button>
                    </div>

                    <div className="p-4">
                      <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.weight}</p>
                      
                      <div className="flex items-center gap-1 mb-3">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-sm text-muted-foreground">({product.reviews})</span>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold">₹{product.price}</span>
                        {product.discount > 0 && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{product.originalPrice}
                          </span>
                        )}
                      </div>

                      {quantity === 0 ? (
                        <Button
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="flex-1 text-center font-medium">{quantity}</span>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
