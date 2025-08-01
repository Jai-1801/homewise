import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { IndianRupee, Home, Car, Dumbbell, Wifi, Shield, Clock } from 'lucide-react';
import type { UserType } from '../../App';

interface PreferencesStepProps {
  data: {
    budget: { min: number; max: number };
    propertyTypes: string[];
    amenities: string[];
    urgency: string;
  };
  onUpdate: (data: any) => void;
  userType: UserType;
}

export function PreferencesStep({ data, onUpdate, userType }: PreferencesStepProps) {
  const isOwnerOrSeller = userType === 'owner' || userType === 'seller';
  const isBuyerOrRenter = userType === 'buyer' || userType === 'renter';

  const propertyTypes = [
    { id: 'apartment', label: 'Apartment', icon: Home },
    { id: 'house', label: 'House', icon: Home },
    { id: 'villa', label: 'Villa', icon: Home },
    { id: 'studio', label: 'Studio', icon: Home },
    { id: 'penthouse', label: 'Penthouse', icon: Home },
    { id: 'plot', label: 'Plot', icon: Home }
  ];

  const amenities = [
    { id: 'parking', label: 'Parking', icon: Car },
    { id: 'gym', label: 'Gym', icon: Dumbbell },
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'security', label: '24/7 Security', icon: Shield },
    { id: 'swimming', label: 'Swimming Pool', icon: Dumbbell },
    { id: 'garden', label: 'Garden', icon: Home },
    { id: 'balcony', label: 'Balcony', icon: Home },
    { id: 'furnished', label: 'Furnished', icon: Home }
  ];

  const urgencyOptions = [
    { value: 'immediate', label: 'Immediate (Within 1 week)', description: 'I need to move/sell ASAP' },
    { value: 'month', label: 'Within a month', description: 'I have some flexibility' },
    { value: '3months', label: 'Within 3 months', description: 'I can wait for the right option' },
    { value: 'flexible', label: 'No rush', description: 'I\'m just exploring options' }
  ];

  const getBudgetLabels = () => {
    if (userType === 'renter') {
      return { title: 'Monthly Rent Budget', min: 5000, max: 100000, step: 5000 };
    } else if (userType === 'buyer') {
      return { title: 'Purchase Budget', min: 500000, max: 50000000, step: 100000 };
    } else if (userType === 'owner') {
      return { title: 'Expected Rent Range', min: 5000, max: 100000, step: 5000 };
    } else {
      return { title: 'Expected Sale Price', min: 500000, max: 50000000, step: 100000 };
    }
  };

  const budgetConfig = getBudgetLabels();

  const handleBudgetChange = (values: number[]) => {
    onUpdate({
      budget: { min: values[0], max: values[1] }
    });
  };

  const handlePropertyTypeToggle = (propertyType: string) => {
    const newTypes = data.propertyTypes.includes(propertyType)
      ? data.propertyTypes.filter(t => t !== propertyType)
      : [...data.propertyTypes, propertyType];
    onUpdate({ propertyTypes: newTypes });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = data.amenities.includes(amenity)
      ? data.amenities.filter(a => a !== amenity)
      : [...data.amenities, amenity];
    onUpdate({ amenities: newAmenities });
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  return (
    <div className="space-y-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl lg:text-5xl text-gray-900 tracking-tight">Tell us your preferences</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {isOwnerOrSeller ? 
            "Help us understand your property to attract the right audience" :
            "We'll use this to show you the most relevant properties"
          }
        </p>
      </div>

      {/* Budget */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-xl">
            <IndianRupee className="h-5 w-5 text-green-600" />
          </div>
          <Label className="text-xl text-gray-900">{budgetConfig.title}</Label>
        </div>
        
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-900 tracking-tight">
                  {formatCurrency(data.budget.min || budgetConfig.min)}
                </span>
                <span className="text-gray-500">to</span>
                <span className="text-lg text-gray-900 tracking-tight">
                  {formatCurrency(data.budget.max || budgetConfig.max)}
                </span>
              </div>
              
              <Slider
                value={[data.budget.min || budgetConfig.min, data.budget.max || budgetConfig.max]}
                onValueChange={handleBudgetChange}
                min={budgetConfig.min}
                max={budgetConfig.max}
                step={budgetConfig.step}
                className="w-full"
              />
              
              <div className="flex justify-between text-gray-500">
                <span>{formatCurrency(budgetConfig.min)}</span>
                <span>{formatCurrency(budgetConfig.max)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property Types */}
      <div className="space-y-6">
        <Label className="text-xl text-gray-900">Property Types</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {propertyTypes.map((type) => {
            const Icon = type.icon;
            const isSelected = data.propertyTypes.includes(type.id);
            return (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-md ${
                  isSelected ? 'ring-2 ring-blue-500 bg-blue-50/50 border-blue-200' : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handlePropertyTypeToggle(type.id)}
              >
                <CardContent className="p-6 text-center space-y-3">
                  <div className={`p-3 rounded-2xl mx-auto w-fit ${
                    isSelected ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <Icon className={`h-6 w-6 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                  </div>
                  <span className={`text-gray-900 ${isSelected ? 'font-medium' : ''}`}>
                    {type.label}
                  </span>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div className="space-y-6">
        <Label className="text-xl text-gray-900">Desired Amenities</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity) => {
            const Icon = amenity.icon;
            const isSelected = data.amenities.includes(amenity.id);
            return (
              <div
                key={amenity.id}
                className={`flex items-center space-x-4 p-4 border rounded-2xl cursor-pointer transition-all duration-300 ${
                  isSelected ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => handleAmenityToggle(amenity.id)}
              >
                <Checkbox
                  checked={isSelected}
                  onCheckedChange={() => handleAmenityToggle(amenity.id)}
                  className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                />
                <div className="bg-gray-100 p-2 rounded-xl">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <span className="text-gray-900">{amenity.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Urgency */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-xl">
            <Clock className="h-5 w-5 text-orange-600" />
          </div>
          <Label className="text-xl text-gray-900">
            {isOwnerOrSeller ? 'When do you want to list?' : 'How urgently do you need a property?'}
          </Label>
        </div>
        
        <RadioGroup 
          value={data.urgency} 
          onValueChange={(value) => onUpdate({ urgency: value })}
          className="space-y-4"
        >
          {urgencyOptions.map((option) => (
            <div key={option.value} className="flex items-start space-x-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <RadioGroupItem 
                value={option.value} 
                id={option.value} 
                className="mt-1 border-2 border-gray-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
              />
              <div className="flex-1 space-y-1">
                <Label htmlFor={option.value} className="cursor-pointer text-gray-900">
                  {option.label}
                </Label>
                <p className="text-gray-600">{option.description}</p>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Selected Summary */}
      {(data.propertyTypes.length > 0 || data.amenities.length > 0) && (
        <Card className="bg-gray-50/50 border-gray-200">
          <CardContent className="p-6">
            <h4 className="text-gray-900 mb-4">Your Selection Summary</h4>
            <div className="space-y-4">
              {data.propertyTypes.length > 0 && (
                <div className="space-y-2">
                  <span className="text-gray-600">Property Types:</span>
                  <div className="flex flex-wrap gap-2">
                    {data.propertyTypes.map(type => (
                      <Badge key={type} variant="secondary" className="rounded-full">
                        {propertyTypes.find(p => p.id === type)?.label}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              {data.amenities.length > 0 && (
                <div className="space-y-2">
                  <span className="text-gray-600">Amenities:</span>
                  <div className="flex flex-wrap gap-2">
                    {data.amenities.slice(0, 5).map(amenity => (
                      <Badge key={amenity} variant="outline" className="rounded-full">
                        {amenities.find(a => a.id === amenity)?.label}
                      </Badge>
                    ))}
                    {data.amenities.length > 5 && (
                      <Badge variant="outline" className="rounded-full">
                        +{data.amenities.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}