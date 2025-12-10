'use client';

import { useState, useRef, useEffect } from 'react';
import { useLoadScript, Autocomplete } from '@react-google-maps/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

const libraries: ('places' | 'drawing' | 'geometry' | 'visualization')[] = ['places'];

interface LocationPickerProps {
  location: string;
  zipcode: string;
  onLocationChange: (location: string, zipcode: string, lat?: number, lng?: number) => void;
}

export function LocationPicker({ location, zipcode, onLocationChange }: LocationPickerProps) {
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Default to India center
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';
  
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  if (!apiKey) {
    return (
      <div className="space-y-4">
        <div className="p-4 border border-yellow-500/50 rounded-md bg-yellow-500/10">
          <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-1">
            Google Maps API Key Required
          </p>
          <p className="text-xs text-yellow-700 dark:text-yellow-400">
            Please add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your .env.local file to enable location picker.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location-fallback">Location</Label>
            <Input
              id="location-fallback"
              value={location}
              onChange={(e) => onLocationChange(e.target.value, zipcode)}
              placeholder="City, State"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipcode-fallback">Zip Code</Label>
            <Input
              id="zipcode-fallback"
              value={zipcode}
              onChange={(e) => onLocationChange(location, e.target.value)}
              placeholder="123456"
            />
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    // Try to get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          // If geolocation fails, use default
        }
      );
    }
  }, []);

  const onPlaceChanged = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      
      if (place.geometry?.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        setMapCenter({ lat, lng });

        // Extract address components
        let fullAddress = place.formatted_address || '';
        let postalCode = '';

        place.address_components?.forEach((component) => {
          if (component.types.includes('postal_code')) {
            postalCode = component.long_name;
          }
        });

        // Extract city and state
        let city = '';
        let state = '';
        place.address_components?.forEach((component) => {
          if (component.types.includes('locality')) {
            city = component.long_name;
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name;
          }
        });

        const locationString = city && state ? `${city}, ${state}` : fullAddress;
        
        onLocationChange(locationString, postalCode, lat, lng);
      }
    }
  };

  if (loadError) {
    return (
      <div className="p-4 border border-destructive rounded-md bg-destructive/10 text-destructive">
        <p className="text-sm">Error loading Google Maps. Please check your API key.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="p-4 border border-border rounded-md bg-muted">
        <p className="text-sm text-muted-foreground">Loading map...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="location-autocomplete">Search Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={onPlaceChanged}
            options={{
              types: ['address'],
              componentRestrictions: { country: 'in' }, // Restrict to India
            }}
          >
            <Input
              id="location-autocomplete"
              type="text"
              placeholder="Search for your location..."
              className="pl-10"
              defaultValue={location}
            />
          </Autocomplete>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <div
            ref={mapRef}
            className="w-full h-64 rounded-md overflow-hidden"
            style={{ minHeight: '256px' }}
          >
            {isLoaded && (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(location || 'India')}&zoom=13`}
              />
            )}
          </div>
        </CardContent>
      </Card>

      {location && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm font-medium">Selected Location:</p>
          <p className="text-sm text-muted-foreground">{location}</p>
          {zipcode && (
            <p className="text-sm text-muted-foreground mt-1">Zip Code: {zipcode}</p>
          )}
        </div>
      )}
    </div>
  );
}

