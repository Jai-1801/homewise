import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Home, IndianRupee, Ruler, Bed, Bath, Upload, X, Camera, HelpCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import type { UserType } from '../../App';

interface PropertyDetailsStepProps {
  data: {
    title: string;
    description: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    furnished: string;
    images: string[];
  };
  onUpdate: (data: any) => void;
  userType: UserType;
}

export function PropertyDetailsStep({ data, onUpdate, userType }: PropertyDetailsStepProps) {
  const [imageUrls, setImageUrls] = useState<string[]>(data.images || []);

  const handleInputChange = (field: string, value: string | number) => {
    onUpdate({ [field]: value });
  };

  const addImageUrl = () => {
    const mockImages = [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop'
    ];
    
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    const newImages = [...imageUrls, randomImage];
    setImageUrls(newImages);
    onUpdate({ images: newImages });
  };

  const removeImage = (index: number) => {
    const newImages = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newImages);
    onUpdate({ images: newImages });
  };

  const furnishedOptions = [
    { value: 'furnished', label: 'Fully Furnished' },
    { value: 'semi-furnished', label: 'Semi Furnished' },
    { value: 'unfurnished', label: 'Unfurnished' }
  ];

  const getContextualContent = () => {
    if (userType === 'owner') {
      return {
        title: "Tell us about your rental property",
        description: "Great photos and detailed descriptions attract quality tenants faster.",
        priceLabel: "Monthly Rent (₹)",
        pricePlaceholder: "25000"
      };
    } else {
      return {
        title: "Describe your property for sale",
        description: "Accurate details help buyers make informed decisions.",
        priceLabel: "Sale Price (₹)",
        pricePlaceholder: "2500000"
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

      {/* Property Title */}
      <div className="space-y-2">
        <Label htmlFor="title" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Property Title *
        </Label>
        <Input
          id="title"
          placeholder="e.g., Spacious 3BHK Apartment in Koramangala"
          value={data.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="h-12"
        />
        <p className="text-xs text-gray-500">This will be the main heading for your property listing</p>
      </div>

      {/* Price and Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price" className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            {content.priceLabel} *
          </Label>
          <Input
            id="price"
            type="number"
            placeholder={content.pricePlaceholder}
            value={data.price || ''}
            onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
            className="h-12"
          />
        </div>

        <div className="space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="flex items-center gap-2 cursor-help">
                  <Ruler className="h-4 w-4" />
                  Built-up Area (sq ft) *
                  <HelpCircle className="h-3 w-3 text-gray-400" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>The total floor area of your property including walls</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Input
            type="number"
            placeholder="1200"
            value={data.area || ''}
            onChange={(e) => handleInputChange('area', parseInt(e.target.value) || 0)}
            className="h-12"
          />
        </div>
      </div>

      {/* Bedrooms and Bathrooms */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Bed className="h-4 w-4" />
            Bedrooms *
          </Label>
          <Select 
            value={data.bedrooms?.toString() || ''} 
            onValueChange={(value) => handleInputChange('bedrooms', parseInt(value))}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Bedroom' : 'Bedrooms'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Bath className="h-4 w-4" />
            Bathrooms *
          </Label>
          <Select 
            value={data.bathrooms?.toString() || ''} 
            onValueChange={(value) => handleInputChange('bathrooms', parseInt(value))}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? 'Bathroom' : 'Bathrooms'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Furnished Status *</Label>
          <Select 
            value={data.furnished} 
            onValueChange={(value) => handleInputChange('furnished', value)}
          >
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {furnishedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Property Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your property in detail. Mention key features, nearby landmarks, amenities, etc."
          value={data.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="min-h-32 resize-none"
        />
        <p className="text-xs text-gray-500">
          {data.description.length}/500 characters • Include details that make your property stand out
        </p>
      </div>

      {/* Property Images */}
      <div className="space-y-4">
        <Label className="flex items-center gap-2">
          <Camera className="h-4 w-4" />
          Property Photos
        </Label>
        
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">Upload High-Quality Photos</p>
                <p className="text-sm text-blue-700 mt-1">
                  Properties with 5+ photos get 60% more inquiries. Show different angles, rooms, and amenities.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100"
                  onClick={addImageUrl}
                >
                  Add Sample Photo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Gallery */}
        {imageUrls.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative group">
                <img
                  src={url}
                  alt={`Property ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
                {index === 0 && (
                  <Badge className="absolute bottom-2 left-2 text-xs bg-green-600">
                    Cover Photo
                  </Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Property Summary */}
      {(data.title || data.price || data.bedrooms || data.bathrooms) && (
        <Card className="bg-gray-50">
          <CardContent className="p-4">
            <h4 className="text-sm font-medium mb-3">Property Summary:</h4>
            <div className="space-y-1 text-sm text-gray-700">
              {data.title && <p><strong>Title:</strong> {data.title}</p>}
              {data.price && <p><strong>Price:</strong> ₹{data.price.toLocaleString()}</p>}
              {data.area && <p><strong>Area:</strong> {data.area} sq ft</p>}
              {(data.bedrooms || data.bathrooms) && (
                <p>
                  <strong>Configuration:</strong> {data.bedrooms || 0} BHK, {data.bathrooms || 0} Bathrooms
                </p>
              )}
              {data.furnished && (
                <p><strong>Furnished:</strong> {furnishedOptions.find(f => f.value === data.furnished)?.label}</p>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}