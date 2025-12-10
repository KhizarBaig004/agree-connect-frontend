'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductFormProps {
  productId?: string;
}

interface ProductData {
  name: string;
  category: string;
  price: string;
  quantity: string;
  unit: string;
  description: string;
  quality: string;
  image: string;
}

export function ProductForm({ productId }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!productId;
  
  const [formData, setFormData] = useState<ProductData>({
    name: '',
    category: '',
    price: '',
    quantity: '',
    unit: 'kg',
    description: '',
    quality: '8',
    image: '',
  });

  // Load product data from localStorage when in edit mode
  useEffect(() => {
    if (isEditMode && typeof window !== 'undefined') {
      const savedProduct = localStorage.getItem('editProduct');
      if (savedProduct) {
        try {
          const product = JSON.parse(savedProduct);
          setFormData({
            name: product.name || '',
            category: product.category || '',
            price: product.price || '',
            quantity: product.quantity || '',
            unit: product.unit || 'kg',
            description: product.description || '',
            quality: product.quality?.toString() || '8',
            image: product.image || '',
          });
        } catch (error) {
          console.error('Error parsing product data:', error);
        }
      }
    }
  }, [isEditMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // Clear edit product from localStorage after submission
    if (isEditMode && typeof window !== 'undefined') {
      localStorage.removeItem('editProduct');
    }
    router.push('/farmer/products');
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Crop Name *</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Wheat, Rice, Corn"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grains">Grains</SelectItem>
                <SelectItem value="vegetables">Vegetables</SelectItem>
                <SelectItem value="fruits">Fruits</SelectItem>
                <SelectItem value="pulses">Pulses</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price per Unit *</Label>
              <Input
                id="price"
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit *</Label>
              <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">kg</SelectItem>
                  <SelectItem value="quintal">Quintal</SelectItem>
                  <SelectItem value="ton">Ton</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity">Available Quantity *</Label>
            <Input
              id="quantity"
              type="number"
              required
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="quality">Quality Rating (1-10) *</Label>
            <Select value={formData.quality} onValueChange={(value) => setFormData({ ...formData, quality: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select quality" />
              </SelectTrigger>
              <SelectContent>
                {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}/10
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              type="url"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-md overflow-hidden mt-2">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Product description..."
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="flex-1">
              {isEditMode ? 'Update Product' : 'Add Product'}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

