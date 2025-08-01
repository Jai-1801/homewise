import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Building2, Eye, EyeOff, ArrowLeft, Mail, Lock, User, Briefcase, Apple, Chrome, Check } from 'lucide-react';
import { Separator } from './ui/separator';

interface SignUpProps {
  onSignUpSuccess: (userType: string) => void;
  onBack: () => void;
  onSignIn: () => void;
}

export function SignUp({ onSignUpSuccess, onBack, onSignIn }: SignUpProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: '',
    occupation: '',
    agreeToTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const userTypes = [
    { value: 'buyer', label: 'Property Buyer', description: 'Looking to purchase property' },
    { value: 'renter', label: 'Property Renter', description: 'Looking for rental properties' },
    { value: 'seller', label: 'Property Seller', description: 'Selling existing property' },
    { value: 'owner', label: 'Property Owner', description: 'Listing property for rent/sale' }
  ];

  const occupations = [
    'Software Engineer', 'Doctor', 'Teacher', 'Business Owner',
    'Government Employee', 'Student', 'Retired', 'Other'
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.userType) {
      newErrors.userType = 'Please select your user type';
    }

    if (!formData.occupation) {
      newErrors.occupation = 'Please select your occupation';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onSignUpSuccess(formData.userType);
    }, 2000);
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Sign up with ${provider}`);
    // Mock social sign up
    setTimeout(() => {
      onSignUpSuccess('buyer');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <button
            onClick={onBack}
            className="absolute top-8 left-8 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back
          </button>

          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-3xl">
              <Building2 className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl text-gray-900 tracking-tight mb-3">Create Account</h1>
          <p className="text-xl text-gray-600">Join PropertyHub and start your journey</p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > 1 ? <Check className="h-4 w-4" /> : '1'}
            </div>
            <div className={`h-1 w-16 rounded-full ${
              currentStep > 1 ? 'bg-blue-500' : 'bg-gray-200'
            }`}></div>
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2 text-sm text-gray-500">
            <span>Account Info</span>
            <span>Preferences</span>
          </div>
        </motion.div>

        {/* Sign Up Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="border-gray-200 shadow-xl">
            <CardContent className="p-8">
              {currentStep === 1 ? (
                <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-gray-900">
                      <User className="h-4 w-4" />
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 ${
                        errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-gray-900">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 ${
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2 text-gray-900">
                      <Lock className="h-4 w-4" />
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        className={`h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12 ${
                          errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm">{errors.password}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-900">
                      <Lock className="h-4 w-4" />
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        className={`h-14 text-base rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 pr-12 ${
                          errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-xl text-base"
                  >
                    Continue
                  </Button>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <Separator className="w-full" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignUp('Google')}
                        className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                      >
                        <Chrome className="h-5 w-5 mr-2" />
                        Google
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignUp('Apple')}
                        className="h-12 rounded-xl border-gray-200 hover:bg-gray-50"
                      >
                        <Apple className="h-5 w-5 mr-2" />
                        Apple
                      </Button>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-900">
                      <Building2 className="h-4 w-4" />
                      I am a
                    </Label>
                    <div className="grid grid-cols-1 gap-3">
                      {userTypes.map((type) => (
                        <div
                          key={type.value}
                          className={`p-4 border rounded-xl cursor-pointer transition-all ${
                            formData.userType === type.value 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => handleInputChange('userType', type.value)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium text-gray-900">{type.label}</div>
                              <div className="text-sm text-gray-600">{type.description}</div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              formData.userType === type.value 
                                ? 'border-blue-500 bg-blue-500' 
                                : 'border-gray-300'
                            }`}>
                              {formData.userType === type.value && (
                                <div className="w-full h-full rounded-full bg-white transform scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.userType && (
                      <p className="text-red-500 text-sm">{errors.userType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2 text-gray-900">
                      <Briefcase className="h-4 w-4" />
                      Occupation
                    </Label>
                    <Select value={formData.occupation} onValueChange={(value) => handleInputChange('occupation', value)}>
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
                    {errors.occupation && (
                      <p className="text-red-500 text-sm">{errors.occupation}</p>
                    )}
                  </div>

                  <div className="space-y-4">
                    <label className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={formData.agreeToTerms}
                        onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600 leading-relaxed">
                        I agree to the{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">Terms of Service</a>
                        {' '}and{' '}
                        <a href="#" className="text-blue-600 hover:text-blue-700">Privacy Policy</a>
                      </span>
                    </label>
                    {errors.agreeToTerms && (
                      <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 h-14 rounded-xl border-gray-200"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 h-14 bg-black text-white hover:bg-gray-800 rounded-xl text-base"
                    >
                      {isLoading ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Creating...
                        </div>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </div>
                </form>
              )}

              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onSignIn}
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}