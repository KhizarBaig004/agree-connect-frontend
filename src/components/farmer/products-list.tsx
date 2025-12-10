'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Package, Edit2, Trash2, CheckCircle2, Circle } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: string;
  status: string;
  image: string;
  quality: number;
  published: boolean;
  category?: string;
  unit?: string;
  description?: string;
}

export function ProductsList() {
  const [products, setProducts] = useState<Product[]>([
    { 
      id: '1', 
      name: 'Wheat', 
      price: '₹50/kg', 
      quantity: '500 kg', 
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      quality: 9,
      published: true,
      category: 'grains',
      unit: 'kg',
      description: 'Premium quality wheat, freshly harvested'
    },
    { 
      id: '2', 
      name: 'Rice', 
      price: '₹60/kg', 
      quantity: '300 kg', 
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      quality: 8,
      published: true,
      category: 'grains',
      unit: 'kg',
      description: 'High quality basmati rice'
    },
    { 
      id: '3', 
      name: 'Corn', 
      price: '₹40/kg', 
      quantity: '200 kg', 
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      quality: 7,
      published: false,
      category: 'vegetables',
      unit: 'kg',
      description: 'Fresh sweet corn'
    },
  ]);

  const togglePublish = (productId: string) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, published: !product.published }
        : product
    ));
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600 dark:text-green-400';
    if (quality >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="group relative overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
        >
          {/* Modern gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          {/* Image Section with modern design */}
          <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
            {/* Status Badge - Modern floating design */}
            <div className="absolute top-4 right-4 z-20">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md shadow-lg ${
                product.status === 'Available' 
                  ? 'bg-green-500/95 text-white border border-green-400/50' 
                  : 'bg-yellow-500/95 text-white border border-yellow-400/50'
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${
                  product.status === 'Available' ? 'bg-white' : 'bg-white'
                } animate-pulse`} />
                {product.status}
              </span>
            </div>

            {/* Quality Badge - Top Left */}
            <div className="absolute top-4 left-4 z-20">
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20 shadow-lg`}>
                <Star className={`h-3.5 w-3.5 ${getQualityColor(product.quality)} fill-current`} />
                <span className={`text-xs font-bold ${getQualityColor(product.quality)}`}>
                  {product.quality}/10
                </span>
              </div>
            </div>

            {/* Product Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e5e7eb" width="300" height="200"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>
          
          {/* Content Section - Modern spacing and typography */}
          <CardContent className="p-4 space-y-3">
            {/* Product Name and Price */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  {product.price}
                </span>
              </div>
            </div>
            
            {/* Quantity - Small text with icon */}
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Package className="h-4 w-4" />
              <span className="text-foreground font-medium">{product.quantity}</span>
            </div>
            
            {/* Publish to Market Toggle */}
            <div className="flex items-center gap-2 pt-2 pb-2 border-t border-border">
              <button
                onClick={() => togglePublish(product.id)}
                className="flex items-center gap-2 text-sm cursor-pointer hover:opacity-80 transition-opacity"
              >
                {product.published ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <span className="text-green-600 dark:text-green-400 font-medium">Published</span>
                  </>
                ) : (
                  <>
                    <Circle className="h-5 w-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Publish to Market</span>
                  </>
                )}
              </button>
            </div>
            
            {/* Action Buttons - Modern design */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 group/btn border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-md"
                onClick={() => {
                  // Extract price number from "₹50/kg" format
                  const priceMatch = product.price.match(/₹(\d+)/);
                  const priceValue = priceMatch ? priceMatch[1] : '';
                  
                  // Extract quantity number from "500 kg" format
                  const quantityMatch = product.quantity.match(/(\d+)/);
                  const quantityValue = quantityMatch ? quantityMatch[1] : '';
                  
                  // Extract unit from quantity string
                  const unitMatch = product.quantity.match(/\d+\s*(kg|Quintal|Ton)/i);
                  const unitValue = unitMatch ? unitMatch[1].toLowerCase() : 'kg';
                  
                  // Store product data in localStorage for edit form
                  localStorage.setItem('editProduct', JSON.stringify({
                    id: product.id,
                    name: product.name,
                    price: priceValue,
                    quantity: quantityValue,
                    unit: product.unit || unitValue,
                    category: product.category || 'grains',
                    quality: product.quality.toString(),
                    image: product.image,
                    description: product.description || ''
                  }));
                  window.location.href = `/farmer/products/edit/${product.id}`;
                }}
              >
                <Edit2 className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 group/btn border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300 hover:shadow-md"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete ${product.name}?`)) {
                    setProducts(products.filter(p => p.id !== product.id));
                  }
                }}
              >
                <Trash2 className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}


