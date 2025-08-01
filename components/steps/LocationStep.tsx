import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { MapPin, Search, Navigation, CheckCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import type { UserType } from '../../App';

interface LocationStepProps {
  data: {
    city: string;
    area: string;
    pincode: string;
    coordinates: { lat: number; lng: number } | null;
  };
  onUpdate: (data: any) => void;
  userType: UserType;
}

export function LocationStep({ data, onUpdate, userType }: LocationStepProps) {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const popularCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
    'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Lucknow'
  ];

  const mockSearchResults = [
    {
      name: 'Koramangala',
      city: 'Bangalore',
      pincode: '560034',
      coordinates: { lat: 12.9352, lng: 77.6245 },
      type: 'Popular Area',
      properties: 1250
    },
    {
      name: 'Indiranagar',
      city: 'Bangalore', 
      pincode: '560038',
      coordinates: { lat: 12.9719, lng: 77.6412 },
      type: 'Prime Location',
      properties: 890
    },
    {
      name: 'Whitefield',
      city: 'Bangalore',
      pincode: '560066',
      coordinates: { lat: 12.9698, lng: 77.7500 },
      type: 'IT Hub',
      properties: 2100
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
    
    // Mock search when area is being typed
    if (field === 'area' && value.length > 2) {
      setIsSearching(true);
      setTimeout(() => {
        setSearchResults(mockSearchResults.filter(result => 
          result.name.toLowerCase().includes(value.toLowerCase()) ||
          result.city.toLowerCase().includes(value.toLowerCase())
        ));
        setIsSearching(false);
      }, 500);
    }
  };

  const handleLocationSelect = (location: any) => {
    onUpdate({
      city: location.city,
      area: location.name,
      pincode: location.pincode,
      coordinates: location.coordinates
    });
    setSearchResults([]);
  };

  const handleCurrentLocation = () => {
    // Mock getting current location
    const mockLocation = {
      city: 'Bangalore',
      area: 'Electronic City',
      pincode: '560100',
      coordinates: { lat: 12.8456, lng: 77.6603 }
    };
    onUpdate(mockLocation);
  };

  const getContextualContent = () => {
    switch (userType) {
      case 'owner':
      case 'seller':
        return {
          title: "Where is your property located?",
          description: "Accurate location helps buyers and renters find your property easily.",
          tip: "Properties with precise locations get 3x more inquiries."
        };
      case 'buyer':
      case 'renter':
        return {
          title: "Where are you looking for a property?",
          description: "We'll show you properties in and around your preferred areas.",
          tip: "You can select multiple areas to see more options."
        };
      default:
        return {
          title: "Select your preferred location",
          description: "Help us understand your location preferences.",
          tip: ""
        };
    }
  };

  const content = getContextualContent();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="mb-2">{content.title}</h2>
        <p className="text-gray-600">{content.description}</p>
      </div>

      {/* Current Location */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Navigation className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-800">Use Current Location</p>
                <p className="text-sm text-blue-700">Get accurate location instantly</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCurrentLocation}
              className="border-blue-300 text-blue-700 hover:bg-blue-100"
            >
              Detect Location
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular Cities */}
      <div className="space-y-3">
        <Label>Popular Cities</Label>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <Badge
              key={city}
              variant={data.city === city ? "default" : "secondary"}
              className="cursor-pointer hover:bg-blue-100"
              onClick={() => handleInputChange('city', city)}
            >
              {city}
            </Badge>
          ))}
        </div>
      </div>

      {/* Location Search */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <div className="relative">
            <Input
              id="city"
              placeholder="e.g., Bangalore, Mumbai"
              value={data.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="h-12"
            />
            <MapPin className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area / Locality *</Label>
          <div className="relative">
            <Input
              id="area"
              placeholder="e.g., Koramangala, Bandra"
              value={data.area}
              onChange={(e) => handleInputChange('area', e.target.value)}
              className="h-12"
            />
            <Search className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            {isSearching && (
              <div className="absolute right-10 top-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <Card className="max-h-64 overflow-y-auto">
          <CardContent className="p-0">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => handleLocationSelect(result)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{result.name}, {result.city}</p>
                    <p className="text-sm text-gray-600">PIN: {result.pincode} • {result.properties} properties</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {result.type}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Pincode */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="pincode">Pincode</Label>
          <Input
            id="pincode"
            placeholder="560034"
            value={data.pincode}
            onChange={(e) => handleInputChange('pincode', e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      {/* Mock Map */}
      <div className="space-y-3">
        <Label>Location on Map</Label>
        <Card className="h-64 bg-gray-100">
          <CardContent className="h-full p-0 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200 via-blue-200 to-green-300 opacity-50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              {data.coordinates ? (
                <div className="text-center bg-white p-4 rounded-lg shadow-lg">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">{data.area}, {data.city}</p>
                  <p className="text-sm text-gray-600">
                    {data.coordinates.lat.toFixed(4)}, {data.coordinates.lng.toFixed(4)}
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>Location will appear here once selected</p>
                </div>
              )}
            </div>
            {/* Mock map pins */}
            <div className="absolute top-16 left-20">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute bottom-16 right-16">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <div className="absolute top-32 right-20">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Context Tip */}
      {content.tip && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-800">Pro Tip</p>
                <p className="text-sm text-green-700 mt-1">{content.tip}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}