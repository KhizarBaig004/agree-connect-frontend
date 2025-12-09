'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

export function ProductsList() {
  const products = [
    { 
      id: '1', 
      name: 'Wheat', 
      price: '₹50/kg', 
      quantity: '500 kg', 
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      quality: 9
    },
    { 
      id: '2', 
      name: 'Rice', 
      price: '₹60/kg', 
      quantity: '300 kg', 
      status: 'Available',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      quality: 8
    },
    { 
      id: '3', 
      name: 'Corn', 
      price: '₹40/kg', 
      quantity: '200 kg', 
      status: 'Low Stock',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      quality: 7
    },
  ];

  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600 dark:text-green-400';
    if (quality >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getQualityBgColor = (quality: number) => {
    if (quality >= 8) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
    if (quality >= 6) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
    return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card 
          key={product.id} 
          className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-green-200 dark:border-green-800 hover:border-primary"
        >
          <div className="relative w-full h-56 bg-gray-200 dark:bg-gray-800 overflow-hidden">
            <div className="absolute top-3 right-3 z-10">
              <span className={`px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                product.status === 'Available' 
                  ? 'bg-green-500/90 text-white' 
                  : 'bg-yellow-500/90 text-white'
              }`}>
                {product.status}
              </span>
            </div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e5e7eb" width="300" height="200"/%3E%3Ctext fill="%239ca3af" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-primary">{product.price}</span>
              </div>
            </div>
            
            <div className="space-y-3 mb-5">
              <div className="flex items-center justify-between p-2.5 rounded-lg border bg-muted/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-muted-foreground">Quantity</span>
                </div>
                <span className="text-sm font-semibold">{product.quantity}</span>
              </div>
              
              <div className={`flex items-center justify-between p-2.5 rounded-lg border ${getQualityBgColor(product.quality)}`}>
                <div className="flex items-center gap-2">
                  <Star className={`h-4 w-4 ${getQualityColor(product.quality)} fill-current`} />
                  <span className="text-xs font-medium text-muted-foreground">Quality</span>
                </div>
                <span className={`text-sm font-bold ${getQualityColor(product.quality)}`}>
                  {product.quality}/10
                </span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2 border-t border-border">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                Edit
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

