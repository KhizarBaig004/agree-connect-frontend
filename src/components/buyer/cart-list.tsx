'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quality: number;
  seller: string;
  location?: string;
  cartQuantity: number;
  availableQuantity: string;
}

export function CartList() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('buyer_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
      }
    }
  }, []);

  const updateCart = (updatedCart: CartItem[]) => {
    setCartItems(updatedCart);
    localStorage.setItem('buyer_cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === productId ? { ...item, cartQuantity: newQuantity } : item
    );
    updateCart(updatedCart);
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceMatch = item.price.match(/₹(\d+)/);
      const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
      return total + (price * item.cartQuantity);
    }, 0);
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    // In production, this would navigate to checkout page
    alert(`Proceeding to checkout with ${cartItems.length} items. Total: ₹${calculateTotal().toLocaleString()}`);
    // router.push('/buyer/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">Add some products to get started!</p>
        <Button onClick={() => router.push('/buyer/browse')}>
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e7eb" width="100" height="100"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="12" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">Seller: {item.seller}</p>
                  {item.location && (
                    <p className="text-xs text-muted-foreground mb-2">📍 {item.location}</p>
                  )}
                  <p className="text-lg font-bold text-primary mb-3">{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.cartQuantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.cartQuantity}
                        onChange={(e) => {
                          const newQty = parseInt(e.target.value) || 1;
                          updateQuantity(item.id, newQty);
                        }}
                        className="w-16 text-center h-8"
                        min="1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => updateQuantity(item.id, item.cartQuantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">Item Total</p>
                  <p className="text-xl font-bold">
                    ₹{(() => {
                      const priceMatch = item.price.match(/₹(\d+)/);
                      const price = priceMatch ? parseFloat(priceMatch[1]) : 0;
                      return (price * item.cartQuantity).toLocaleString();
                    })()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                <span className="font-medium">₹{calculateTotal().toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">₹500</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">₹{(calculateTotal() * 0.18).toFixed(0)}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-xl text-primary">
                    ₹{(calculateTotal() + 500 + calculateTotal() * 0.18).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            <Button 
              className="w-full" 
              size="lg"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>

            <Button 
              variant="outline" 
              className="w-full mt-3"
              onClick={() => router.push('/buyer/browse')}
            >
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

