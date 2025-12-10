'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Camera, Save } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LocationPicker } from './location-picker';

export function SettingsForm() {
  const { user, updateUser } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    zipcode: '',
    profilePic: '',
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        zipcode: user.zipcode || '',
        profilePic: user.profilePic || '',
        latitude: user.latitude,
        longitude: user.longitude,
      });
      if (user.profilePic) {
        setPreviewImage(user.profilePic);
      }
    }
  }, [user]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // For now, we'll use a URL. In production, you'd upload to a server
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result as string;
        setPreviewImage(imageUrl);
        setFormData({ ...formData, profilePic: imageUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      updateUser({
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        zipcode: formData.zipcode,
        profilePic: formData.profilePic,
        latitude: formData.latitude,
        longitude: formData.longitude,
      });
      // Show success message (you can add a toast notification here)
      alert('Settings updated successfully!');
    }
  };

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile picture</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar 
                name={formData.name || user.name} 
                size="lg"
                imageUrl={previewImage || undefined}
              />
              <label
                htmlFor="profile-pic-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors shadow-lg"
              >
                <Camera className="h-4 w-4" />
                <input
                  id="profile-pic-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div className="flex-1">
              <Label htmlFor="profile-pic-url" className="mb-2 block">Or enter image URL</Label>
              <Input
                id="profile-pic-url"
                type="url"
                placeholder="https://example.com/profile.jpg"
                value={formData.profilePic}
                onChange={(e) => {
                  setFormData({ ...formData, profilePic: e.target.value });
                  setPreviewImage(e.target.value || null);
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Information */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your account details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                disabled
                className="bg-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 1234567890"
              />
            </div>

            <div className="space-y-4">
              <div>
                <Label>Location</Label>
                <p className="text-xs text-muted-foreground mb-2">Search and select your location on the map</p>
                <LocationPicker
                  location={formData.location}
                  zipcode={formData.zipcode}
                  onLocationChange={(location, zipcode, lat, lng) => {
                    setFormData({
                      ...formData,
                      location,
                      zipcode,
                      latitude: lat,
                      longitude: lng,
                    });
                  }}
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  if (user) {
                    setFormData({
                      name: user.name || '',
                      email: user.email || '',
                      phone: user.phone || '',
                      location: user.location || '',
                      zipcode: user.zipcode || '',
                      profilePic: user.profilePic || '',
                      latitude: user.latitude,
                      longitude: user.longitude,
                    });
                    setPreviewImage(user.profilePic || null);
                  }
                }}
              >
                Reset
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

