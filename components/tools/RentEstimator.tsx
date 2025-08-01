import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { ArrowLeft, MapPin, TrendingUp, Building, Bed, Bath, Car, X } from 'lucide-react';

interface RentEstimatorProps {
  onClose: () => void;
}

export function RentEstimator({ onClose }: RentEstimatorProps) {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    furnished: '',
    amenities: [] as string[]
  });
  const [estimate, setEstimate] = useState<{ min: number; max: number; average: number } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const amenitiesList = [
    'Parking', 'Gym', 'Swimming Pool', 'Security', 'Garden', 'Balcony', 'Wi-Fi', 'AC'
  ];

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const calculateRent = () => {
    setIsCalculating(true);
    
    // Mock calculation logic
    setTimeout(() => {
      const baseRent = parseInt(formData.area) * 15; // ₹15 per sq ft
      const bedroomMultiplier = parseInt(formData.bedrooms) || 1;
      const typeMultiplier = formData.propertyType === 'villa' ? 1.5 : formData.propertyType === 'studio' ? 0.7 : 1;
      const furnishedMultiplier = formData.furnished === 'fully' ? 1.3 : formData.furnished === 'semi' ? 1.15 : 1;
      const amenitiesBonus = formData.amenities.length * 1000;
      
      const calculated = baseRent * bedroomMultiplier * typeMultiplier * furnishedMultiplier + amenitiesBonus;
      
      setEstimate({
        min: Math.round(calculated * 0.8),
        max: Math.round(calculated * 1.2),
        average: Math.round(calculated)
      });
      setIsCalculating(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto border-gray-200 shadow-2xl">
        <CardHeader className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-xl">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Rent Estimator</CardTitle>
                <p className="text-gray-600">Get accurate rent estimates for any location</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                placeholder="Enter city or area"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Property Type
              </Label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                Bedrooms
              </Label>
              <Select value={formData.bedrooms} onValueChange={(value) => setFormData(prev => ({ ...prev, bedrooms: value }))}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select bedrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 BHK</SelectItem>
                  <SelectItem value="2">2 BHK</SelectItem>
                  <SelectItem value="3">3 BHK</SelectItem>
                  <SelectItem value="4">4+ BHK</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Bath className="h-4 w-4" />
                Bathrooms
              </Label>
              <Select value={formData.bathrooms} onValueChange={(value) => setFormData(prev => ({ ...prev, bathrooms: value }))}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select bathrooms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Area (sq ft)</Label>
              <Input
                type="number"
                placeholder="Enter area"
                value={formData.area}
                onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label>Furnished</Label>
              <Select value={formData.furnished} onValueChange={(value) => setFormData(prev => ({ ...prev, furnished: value }))}>
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Select furnishing" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  <SelectItem value="semi">Semi Furnished</SelectItem>
                  <SelectItem value="fully">Fully Furnished</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {amenitiesList.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => handleAmenityToggle(amenity)}
                  className={`p-3 rounded-xl border transition-all ${
                    formData.amenities.includes(amenity)
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {estimate && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Estimated Rent Range</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-green-600">₹{estimate.min.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Minimum</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-600">₹{estimate.average.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Average</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-600">₹{estimate.max.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Maximum</p>
                  </div>
                </div>
                <p className="text-center text-gray-600 mt-4">
                  Based on {formData.location} market trends and property features
                </p>
              </CardContent>
            </Card>
          )}

          <Button
            onClick={calculateRent}
            disabled={isCalculating || !formData.location || !formData.propertyType || !formData.area}
            className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl"
          >
            {isCalculating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Calculating...
              </div>
            ) : (
              'Calculate Rent Estimate'
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}