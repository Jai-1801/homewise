import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { User, MapPin, Home, IndianRupee, Bed, Bath, CheckCircle, Shield, Star } from 'lucide-react';
import type { UserType } from '../../App';
import type { OnboardingData } from '../OnboardingWizard';

interface ReviewStepProps {
  data: OnboardingData;
  userType: UserType;
}

export function ReviewStep({ data, userType }: ReviewStepProps) {
  const isOwnerOrSeller = userType === 'owner' || userType === 'seller';

  const getWelcomeMessage = () => {
    switch (userType) {
      case 'owner':
        return {
          title: "Welcome to PropertyHub, Property Owner!",
          message: "Your property listing is ready to go live and attract quality tenants.",
          nextSteps: [
            "Your listing will be reviewed and published within 24 hours",
            "Start receiving inquiries from verified tenants",
            "Use our chat system to communicate with potential tenants"
          ]
        };
      case 'seller':
        return {
          title: "Welcome to PropertyHub, Property Seller!",
          message: "Your property is ready to be showcased to serious buyers.",
          nextSteps: [
            "Professional photography can be scheduled",
            "Receive inquiries from pre-qualified buyers",
            "Get market insights and pricing recommendations"
          ]
        };
      case 'buyer':
        return {
          title: "Welcome to PropertyHub, Home Buyer!",
          message: "We'll help you find the perfect property within your budget and preferences.",
          nextSteps: [
            "Browse curated properties matching your criteria",
            "Schedule site visits with property owners",
            "Get assistance with legal and financial processes"
          ]
        };
      case 'renter':
        return {
          title: "Welcome to PropertyHub, Tenant!",
          message: "Your profile is optimized to find rental properties that match your needs.",
          nextSteps: [
            "Explore verified rental properties in your area",
            "Connect directly with property owners",
            "Schedule visits and secure your ideal home"
          ]
        };
      default:
        return {
          title: "Welcome to PropertyHub!",
          message: "Your profile setup is complete.",
          nextSteps: []
        };
    }
  };

  const welcome = getWelcomeMessage();

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
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
        <CardContent className="p-6 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="mb-2">{welcome.title}</h2>
          <p className="text-gray-600 mb-4">{welcome.message}</p>
          <div className="flex items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Premium Profile</span>
            </div>
            {data.verification.verified && (
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Verified</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Name:</span>
              <span className="font-medium">{data.personalInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{data.personalInfo.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{data.personalInfo.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Occupation:</span>
              <span className="font-medium">{data.personalInfo.occupation}</span>
            </div>
          </CardContent>
        </Card>

        {/* Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Location Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">City:</span>
              <span className="font-medium">{data.location.city}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Area:</span>
              <span className="font-medium">{data.location.area}</span>
            </div>
            {data.location.pincode && (
              <div className="flex justify-between">
                <span className="text-gray-600">Pincode:</span>
                <span className="font-medium">{data.location.pincode}</span>
              </div>
            )}
            {data.location.coordinates && (
              <Badge variant="outline" className="w-fit">
                Location Verified
              </Badge>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Preferences & Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Budget */}
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Budget Range:</span>
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-green-600" />
              <span className="font-medium">
                {formatCurrency(data.preferences.budget.min)} - {formatCurrency(data.preferences.budget.max)}
              </span>
            </div>
          </div>

          {/* Property Types */}
          {data.preferences.propertyTypes.length > 0 && (
            <div>
              <span className="text-gray-600 block mb-2">Property Types:</span>
              <div className="flex flex-wrap gap-2">
                {data.preferences.propertyTypes.map((type) => (
                  <Badge key={type} variant="secondary">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Amenities */}
          {data.preferences.amenities.length > 0 && (
            <div>
              <span className="text-gray-600 block mb-2">Desired Amenities:</span>
              <div className="flex flex-wrap gap-2">
                {data.preferences.amenities.slice(0, 6).map((amenity) => (
                  <Badge key={amenity} variant="outline">
                    {amenity.replace('_', ' ').charAt(0).toUpperCase() + amenity.replace('_', ' ').slice(1)}
                  </Badge>
                ))}
                {data.preferences.amenities.length > 6 && (
                  <Badge variant="outline">
                    +{data.preferences.amenities.length - 6} more
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Urgency */}
          {data.preferences.urgency && (
            <div className="flex justify-between">
              <span className="text-gray-600">Timeline:</span>
              <Badge variant="outline">
                {data.preferences.urgency.replace('_', ' ').charAt(0).toUpperCase() + data.preferences.urgency.replace('_', ' ').slice(1)}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Property Details (for owners/sellers) */}
      {isOwnerOrSeller && data.propertyDetails.title && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-start">
              <span className="text-gray-600">Title:</span>
              <span className="font-medium text-right max-w-64">{data.propertyDetails.title}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Price:</span>
              <span className="font-medium">₹{data.propertyDetails.price?.toLocaleString()}</span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-2">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <Home className="h-4 w-4" />
                  <span className="text-sm">Area</span>
                </div>
                <p className="font-medium">{data.propertyDetails.area} sq ft</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <Bed className="h-4 w-4" />
                  <span className="text-sm">Bedrooms</span>
                </div>
                <p className="font-medium">{data.propertyDetails.bedrooms}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 text-gray-600">
                  <Bath className="h-4 w-4" />
                  <span className="text-sm">Bathrooms</span>
                </div>
                <p className="font-medium">{data.propertyDetails.bathrooms}</p>
              </div>
            </div>

            {data.propertyDetails.description && (
              <div>
                <span className="text-gray-600 block mb-2">Description:</span>
                <p className="text-sm bg-gray-50 p-3 rounded-lg">{data.propertyDetails.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Next Steps */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">What's Next?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {welcome.nextSteps.map((step, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-blue-800 text-sm">{step}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Need help getting started? Our support team is here to assist you.
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <span className="text-blue-600">📞 1800-XXX-XXXX</span>
            <span className="text-blue-600">✉️ support@propertyhub.com</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}