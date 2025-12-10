'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, Package, ShoppingCart } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: string;
  image: string;
  quality: number;
  seller: string;
  location?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const getQualityColor = (quality: number) => {
    if (quality >= 8) return 'text-green-600 dark:text-green-400';
    if (quality >= 6) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <Card className="group relative overflow-hidden border-0 bg-card shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      {/* Modern gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Quality Badge - Top Left */}
        <div className="absolute top-4 left-4 z-20">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20 shadow-lg">
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
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
      
      {/* Content Section */}
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
        
        {/* Seller and Location */}
        <div className="space-y-1 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Seller: {product.seller}</p>
          {product.location && (
            <p className="text-xs">📍 {product.location}</p>
          )}
        </div>
        
        {/* Quantity */}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Package className="h-4 w-4" />
          <span className="text-foreground font-medium">{product.quantity} available</span>
        </div>
        
        {/* Add to Cart Button */}
        <Button 
          className="w-full group/btn"
          onClick={() => onAddToCart(product.id)}
        >
          <ShoppingCart className="h-4 w-4 mr-2 group-hover/btn:scale-110 transition-transform" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

