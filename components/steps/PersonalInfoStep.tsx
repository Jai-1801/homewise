import React from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent } from '../ui/card';
import { User, Mail, Phone, Briefcase, Info, UserCheck } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import type { UserType } from '../../App';

interface PersonalInfoStepProps {
  data: {
    name: string;
    email: string;
    phone: string;
    occupation: string;
  };
  onUpdate: (data: any) => void;
  userType: UserType;
}

export function PersonalInfoStep({ data, onUpdate, userType }: PersonalInfoStepProps) {
  const handleInputChange = (field: string, value: string) => {
    onUpdate({ [field]: value });
  };

  const getContextualTips = () => {
    switch (userType) {
      case 'owner':
      case 'seller':
        return "We need your details to verify property ownership and create your listing profile.";
      case 'buyer':
      case 'renter':
        return "Your information helps property owners connect with serious inquiries.";
      default:
        return "Please provide your basic information to get started.";
    }
  };

  const occupations = [
    'Software Engineer',
    'Doctor',
    'Teacher',
    'Business Owner',
    'Government Employee',
    'Student',
    'Retired',
    'Other'
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl lg:text-5xl text-gray-900 tracking-tight">Let's get to know you</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{getContextualTips()}</p>
      </div>

      <Card className="bg-blue-50/50 border-blue-200/50 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-blue-100 p-2 rounded-xl">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-blue-900">Why do we need this?</h3>
              <p className="text-blue-700 leading-relaxed">
                Your personal information helps us verify your identity and provide better recommendations. 
                We never share your data without permission.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <Label htmlFor="name" className="flex items-center gap-2 text-gray-900">
            <User className="h-4 w-4" />
            Full Name *
          </Label>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={data.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className="h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="email" className="flex items-center gap-2 text-gray-900">
            <Mail className="h-4 w-4" />
            Email Address *
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="phone" className="flex items-center gap-2 text-gray-900">
            <Phone className="h-4 w-4" />
            Phone Number *
          </Label>
          <Input
            id="phone"
            placeholder="+91 98765 43210"
            value={data.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20"
          />
        </div>

        <div className="space-y-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label className="flex items-center gap-2 text-gray-900 cursor-help">
                  <Briefcase className="h-4 w-4" />
                  Occupation *
                  <Info className="h-3 w-3 text-gray-400" />
                </Label>
              </TooltipTrigger>
              <TooltipContent>
                <p>This helps us understand your background for better property recommendations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Select value={data.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
            <SelectTrigger className="h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20">
              <SelectValue placeholder="Select your occupation" />
            </SelectTrigger>
            <SelectContent>
              {occupations.map((occupation) => (
                <SelectItem key={occupation} value={occupation}>
                  {occupation}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Auto-fill suggestion */}
      {!data.name && !data.email && (
        <Card className="bg-green-50/50 border-green-200/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-xl">
                  <UserCheck className="h-5 w-5 text-green-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-green-900">Quick Fill Available</h3>
                  <p className="text-green-700">Use saved profile information</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  // Mock auto-fill functionality
                  onUpdate({
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    phone: '+91 98765 43210',
                    occupation: 'Software Engineer'
                  });
                }}
                className="text-green-600 hover:text-green-700 bg-green-100 hover:bg-green-200 px-4 py-2 rounded-lg transition-colors"
              >
                Auto-fill
              </button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}