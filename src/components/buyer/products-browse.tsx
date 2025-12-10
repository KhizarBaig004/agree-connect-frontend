'use client';

import { useState, useMemo } from 'react';
import { ProductCard } from './product-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: string;
  quantity: string;
  image: string;
  quality: number;
  seller: string;
  location?: string;
  category?: string;
}

export function ProductsBrowse() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [qualityFilter, setQualityFilter] = useState('all');

  // Mock products data - in production, this would come from an API
  const products: Product[] = [
    {
      id: '1',
      name: 'Wheat',
      price: '₹50/kg',
      quantity: '500 kg',
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=300&fit=crop',
      quality: 9,
      seller: 'Green Valley Farms',
      location: 'Punjab, India',
      category: 'grains'
    },
    {
      id: '2',
      name: 'Rice',
      price: '₹60/kg',
      quantity: '300 kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
      quality: 8,
      seller: 'Farm Fresh',
      location: 'Haryana, India',
      category: 'grains'
    },
    {
      id: '3',
      name: 'Corn',
      price: '₹40/kg',
      quantity: '200 kg',
      image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&h=300&fit=crop',
      quality: 7,
      seller: 'Organic Fields',
      location: 'Maharashtra, India',
      category: 'vegetables'
    },
    {
      id: '4',
      name: 'Tomatoes',
      price: '₹30/kg',
      quantity: '150 kg',
      image: 'https://images.unsplash.com/photo-1546470427-e26264be0b28?w=400&h=300&fit=crop',
      quality: 8,
      seller: 'Fresh Harvest',
      location: 'Karnataka, India',
      category: 'vegetables'
    },
    {
      id: '5',
      name: 'Potatoes',
      price: '₹25/kg',
      quantity: '400 kg',
      image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400&h=300&fit=crop',
      quality: 9,
      seller: 'Mountain Farms',
      location: 'Himachal Pradesh, India',
      category: 'vegetables'
    },
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.location?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'all' || product.category === categoryFilter;
      
      const matchesQuality = 
        qualityFilter === 'all' ||
        (qualityFilter === 'high' && product.quality >= 8) ||
        (qualityFilter === 'medium' && product.quality >= 6 && product.quality < 8) ||
        (qualityFilter === 'low' && product.quality < 6);
      
      return matchesSearch && matchesCategory && matchesQuality;
    });
  }, [searchQuery, categoryFilter, qualityFilter]);

  const handleAddToCart = (productId: string) => {
    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('buyer_cart') || '[]');
    
    // Check if product already in cart
    const existingItem = existingCart.find((item: { id: string }) => item.id === productId);
    
    if (existingItem) {
      // Update quantity
      existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
      // Add new item
      const product = products.find(p => p.id === productId);
      if (product) {
        existingCart.push({
          ...product,
          cartQuantity: 1
        });
      }
    }
    
    localStorage.setItem('buyer_cart', JSON.stringify(existingCart));
    // Dispatch event to update cart count in header
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Product added to cart!');
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search products, sellers, or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="grains">Grains</SelectItem>
              <SelectItem value="vegetables">Vegetables</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
              <SelectItem value="pulses">Pulses</SelectItem>
            </SelectContent>
          </Select>

          <Select value={qualityFilter} onValueChange={setQualityFilter}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Quality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Quality</SelectItem>
              <SelectItem value="high">High (8-10)</SelectItem>
              <SelectItem value="medium">Medium (6-7)</SelectItem>
              <SelectItem value="low">Low (1-5)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}

