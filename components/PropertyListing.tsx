import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  ArrowRight, 
  MapPin, 
  Upload, 
  X, 
  Check,
  Home,
  Camera,
  FileText,
  Sparkles,
  Info,
  Building,
  Bed,
  Bath,
  IndianRupee,
  CheckCircle
} from 'lucide-react';
import { UserType, AppState } from '../App';

interface PropertyListingProps {
  userType: UserType | null;
  onViewChange: (view: AppState['currentView']) => void;
}

export function PropertyListing({ userType, onViewChange }: PropertyListingProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    propertyType: '',
    location: '',
    coordinates: { lat: 0, lng: 0 },
    bhk: '',
    area: '',
    rent: '',
    deposit: '',
    furnished: '',
    amenities: [] as string[],
    description: '',
    images: [] as File[],
    documents: [] as File[]
  });

  const steps = [
    { title: 'Property Type', icon: Home, description: 'What type of property?' },
    { title: 'Location', icon: MapPin, description: 'Where is it located?' },
    { title: 'Details', icon: FileText, description: 'Property specifications' },
    { title: 'Images', icon: Camera, description: 'Upload photos' },
    { title: 'Documents', icon: Upload, description: 'Legal documents' },
    { title: 'Review', icon: Check, description: 'Final review' }
  ];

  const propertyTypes = [
    { type: 'Apartment', icon: Building, description: 'Flat in a residential building' },
    { type: 'Villa', icon: Home, description: 'Independent house with garden' },
    { type: 'Studio', icon: Bed, description: 'Single room with kitchenette' },
    { type: 'Penthouse', icon: Building, description: 'Luxury top-floor apartment' }
  ];

  const amenityOptions = [
    'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 
    'WiFi', 'AC', 'Furnished', 'Elevator', 'Balcony',
    'Power Backup', 'Water Supply', 'Maintenance'
  ];

  const aiSuggestions = {
    0: "Based on your profile, apartment listings get 40% more inquiries in your area.",
    1: "Koramangala properties are in high demand. Consider highlighting metro connectivity.",
    2: "Similar 2BHK properties in this area rent for ₹25,000-35,000. Your pricing looks competitive!",
    3: "Properties with 8+ photos get 3x more views. Consider adding balcony and kitchen shots.",
    4: "Adding rent agreement and NOC documents increases credibility by 60%.",
    5: "Ready to publish! Your listing will be live within 24 hours after verification."
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...Array.from(e.target.files!)]
      }));
    }
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files!)]
      }));
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Property Type
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl text-gray-900 tracking-tight">What type of property are you listing?</h3>
              <p className="text-lg text-gray-600">Choose the category that best describes your property</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {propertyTypes.map((item) => (
                <Card
                  key={item.type}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-md border-2 ${
                    formData.propertyType === item.type 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, propertyType: item.type }))}
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className={`mx-auto w-16 h-16 rounded-2xl flex items-center justify-center ${
                      formData.propertyType === item.type 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-lg text-gray-900 mb-2">{item.type}</h4>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 1: // Location
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl text-gray-900 tracking-tight">Where is your property located?</h3>
              <p className="text-lg text-gray-600">Help potential tenants find your property easily</p>
            </div>
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-base text-gray-900 mb-3">Property Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Enter complete address with pincode"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    className="pl-12 h-14 text-base rounded-2xl border-gray-200 bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
              
              {/* Interactive Map Placeholder */}
              <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <CardContent className="p-12 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg text-gray-900 mb-2">Pin Your Property Location</h4>
                    <p className="text-gray-600">Click to mark the exact location on the map</p>
                  </div>
                  <Button variant="outline" className="rounded-xl">
                    Open Map
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 2: // Details
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl text-gray-900 tracking-tight">Property Details</h3>
              <p className="text-lg text-gray-600">Provide key information about your property</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-base text-gray-900">BHK Configuration</label>
                <Select value={formData.bhk} onValueChange={(value) => setFormData(prev => ({ ...prev, bhk: value }))}>
                  <SelectTrigger className="h-14 rounded-2xl">
                    <SelectValue placeholder="Select BHK type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 BHK</SelectItem>
                    <SelectItem value="2">2 BHK</SelectItem>
                    <SelectItem value="3">3 BHK</SelectItem>
                    <SelectItem value="4">4+ BHK</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-3">
                <label className="block text-base text-gray-900">Built-up Area (sq ft)</label>
                <Input
                  type="number"
                  placeholder="e.g., 1200"
                  value={formData.area}
                  onChange={(e) => setFormData(prev => ({ ...prev, area: e.target.value }))}
                  className="h-14 rounded-2xl"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-base text-gray-900">Monthly Rent (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="e.g., 25000"
                    value={formData.rent}
                    onChange={(e) => setFormData(prev => ({ ...prev, rent: e.target.value }))}
                    className="pl-12 h-14 rounded-2xl"
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <label className="block text-base text-gray-900">Security Deposit (₹)</label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="number"
                    placeholder="e.g., 50000"
                    value={formData.deposit}
                    onChange={(e) => setFormData(prev => ({ ...prev, deposit: e.target.value }))}
                    className="pl-12 h-14 rounded-2xl"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-3">
                <label className="block text-base text-gray-900">Furnishing Status</label>
                <Select value={formData.furnished} onValueChange={(value) => setFormData(prev => ({ ...prev, furnished: value }))}>
                  <SelectTrigger className="h-14 rounded-2xl">
                    <SelectValue placeholder="Select furnishing status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fully">Fully Furnished</SelectItem>
                    <SelectItem value="semi">Semi Furnished</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="block text-base text-gray-900">Amenities & Features</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3">
                    <Checkbox
                      checked={formData.amenities.includes(amenity)}
                      onCheckedChange={() => handleAmenityToggle(amenity)}
                      className="rounded-md"
                    />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-base text-gray-900">Property Description</label>
              <Textarea
                placeholder="Describe your property, highlight unique features, nearby facilities..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                rows={4}
                className="rounded-2xl resize-none"
              />
            </div>
          </div>
        );

      case 3: // Images
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl text-gray-900 tracking-tight">Property Images</h3>
              <p className="text-lg text-gray-600">Upload high-quality photos to attract more inquiries</p>
            </div>
            
            <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              <CardContent className="p-12 text-center space-y-6">
                <div className="mx-auto w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <Camera className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg text-gray-900 mb-2">Upload Property Images</h4>
                  <p className="text-gray-600 mb-4">Add photos of rooms, kitchen, bathroom, balcony, and exterior</p>
                  <p className="text-sm text-gray-500">Supported formats: JPG, PNG (Max 10MB each)</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" className="cursor-pointer rounded-xl px-6 py-3">
                    <Upload className="h-5 w-5 mr-2" />
                    Choose Images
                  </Button>
                </label>
              </CardContent>
            </Card>

            {formData.images.length > 0 && (
              <div className="space-y-4">
                <h4 className="text-lg text-gray-900">Uploaded Images ({formData.images.length})</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                        <img
                          src={URL.createObjectURL(image)}
                          alt={`Property ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4: // Documents
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl text-gray-900 tracking-tight">Upload Documents</h3>
              <p className="text-lg text-gray-600">Add legal documents to increase trust and credibility</p>
            </div>
            
            <div className="space-y-6">
              <Card className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                      <FileText className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="text-lg text-gray-900">Property Documents</h4>
                      <p className="text-gray-600">Property papers, NOC, rent agreement template</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={handleDocumentUpload}
                    className="hidden"
                    id="document-upload"
                  />
                  <label htmlFor="document-upload">
                    <Button variant="outline" className="cursor-pointer rounded-xl">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Documents
                    </Button>
                  </label>
                </CardContent>
              </Card>

              {formData.documents.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-lg text-gray-900">Uploaded Documents</h4>
                  {formData.documents.map((doc, index) => (
                    <Card key={index} className="border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div>
                              <p className="text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">{(doc.size / 1024 / 1024).toFixed(2)} MB</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="rounded-full">Pending Review</Badge>
                            <button
                              onClick={() => removeDocument(index)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 5: // Review
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-2xl text-gray-900 tracking-tight">Ready to Publish!</h3>
              <p className="text-lg text-gray-600">Review your property details before publishing</p>
            </div>

            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg text-gray-900">Property Summary</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type:</span>
                      <span className="text-gray-900">{formData.propertyType || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-900">{formData.location || 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Configuration:</span>
                      <span className="text-gray-900">{formData.bhk ? `${formData.bhk} BHK` : 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Area:</span>
                      <span className="text-gray-900">{formData.area ? `${formData.area} sq ft` : 'Not specified'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monthly Rent:</span>
                      <span className="text-gray-900">{formData.rent ? `₹${formData.rent}` : 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Deposit:</span>
                      <span className="text-gray-900">{formData.deposit ? `₹${formData.deposit}` : 'Not specified'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Images:</span>
                      <span className="text-gray-900">{formData.images.length} uploaded</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Documents:</span>
                      <span className="text-gray-900">{formData.documents.length} uploaded</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-blue-900 mb-1">What happens next?</h4>
                    <p className="text-blue-800 text-sm">
                      Your property will be reviewed by our team within 24 hours. 
                      Once approved, it will be visible to potential tenants.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-2xl text-base" 
              onClick={() => {
                // Handle publish logic
                onViewChange('dashboard');
              }}
            >
              Publish Property Listing
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="flex items-center justify-between p-4 max-w-4xl mx-auto">
          <button
            onClick={() => onViewChange('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg text-gray-900 tracking-tight">Add Property</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-gray-600">Step {currentStep + 1} of {steps.length}</p>
              <p className="text-2xl text-gray-900 tracking-tight">{steps[currentStep].title}</p>
              <p className="text-gray-600">{steps[currentStep].description}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl text-blue-600 tracking-tight">
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </p>
              <p className="text-gray-600">Complete</p>
            </div>
          </div>
          
          <Progress value={((currentStep + 1) / steps.length) * 100} className="mb-6 h-2" />
          
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex flex-col items-center transition-all duration-300 ${
                  index <= currentStep ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center mb-2 transition-all duration-300 ${
                    index <= currentStep
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 bg-gray-50'
                  }`}
                >
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-xs text-center hidden md:block">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Suggestion */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-blue-900 mb-2">AI Assistant</h4>
                <p className="text-blue-800">{aiSuggestions[currentStep as keyof typeof aiSuggestions]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step Content */}
        <Card className="border-gray-200 shadow-sm rounded-3xl">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-6 py-3 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="px-6 py-3 bg-black text-white hover:bg-gray-800 rounded-xl"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}