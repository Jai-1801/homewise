import React, { useState } from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { ArrowLeft, Building2 } from 'lucide-react';
import { PersonalInfoStep } from './steps/PersonalInfoStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { LocationStep } from './steps/LocationStep';
import { PropertyDetailsStep } from './steps/PropertyDetailsStep';
import { VerificationStep } from './steps/VerificationStep';
import { ReviewStep } from './steps/ReviewStep';
import type { UserType } from '../App';

interface OnboardingWizardProps {
  userType: UserType;
  onComplete: () => void;
  onBack: () => void;
}

export interface OnboardingData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    occupation: string;
  };
  preferences: {
    budget: { min: number; max: number };
    propertyTypes: string[];
    amenities: string[];
    urgency: string;
  };
  location: {
    city: string;
    area: string;
    pincode: string;
    coordinates: { lat: number; lng: number } | null;
  };
  propertyDetails: {
    title: string;
    description: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    furnished: string;
    images: string[];
  };
  verification: {
    documents: string[];
    verified: boolean;
  };
}

const getStepsForUserType = (userType: UserType) => {
  const commonSteps = ['Personal Info', 'Location', 'Preferences'];
  
  switch (userType) {
    case 'owner':
    case 'seller':
      return [...commonSteps, 'Property Details', 'Verification', 'Review'];
    case 'buyer':
    case 'renter':
      return [...commonSteps, 'Verification', 'Review'];
    default:
      return commonSteps;
  }
};

const getUserTypeTitle = (userType: UserType) => {
  const titles = {
    owner: 'Property Owner Onboarding',
    buyer: 'Buyer Onboarding',
    renter: 'Renter Onboarding',
    seller: 'Seller Onboarding'
  };
  return titles[userType];
};

export function OnboardingWizard({ userType, onComplete, onBack }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    personalInfo: { name: '', email: '', phone: '', occupation: '' },
    preferences: { budget: { min: 0, max: 0 }, propertyTypes: [], amenities: [], urgency: '' },
    location: { city: '', area: '', pincode: '', coordinates: null },
    propertyDetails: { title: '', description: '', price: 0, area: 0, bedrooms: 0, bathrooms: 0, furnished: '', images: [] },
    verification: { documents: [], verified: false }
  });

  const steps = getStepsForUserType(userType);
  const progress = ((currentStep + 1) / steps.length) * 100;

  const updateOnboardingData = (section: keyof OnboardingData, data: any) => {
    setOnboardingData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const renderStep = () => {
    const stepName = steps[currentStep];
    
    switch (stepName) {
      case 'Personal Info':
        return (
          <PersonalInfoStep
            data={onboardingData.personalInfo}
            onUpdate={(data) => updateOnboardingData('personalInfo', data)}
            userType={userType}
          />
        );
      case 'Preferences':
        return (
          <PreferencesStep
            data={onboardingData.preferences}
            onUpdate={(data) => updateOnboardingData('preferences', data)}
            userType={userType}
          />
        );
      case 'Location':
        return (
          <LocationStep
            data={onboardingData.location}
            onUpdate={(data) => updateOnboardingData('location', data)}
            userType={userType}
          />
        );
      case 'Property Details':
        return (
          <PropertyDetailsStep
            data={onboardingData.propertyDetails}
            onUpdate={(data) => updateOnboardingData('propertyDetails', data)}
            userType={userType}
          />
        );
      case 'Verification':
        return (
          <VerificationStep
            data={onboardingData.verification}
            onUpdate={(data) => updateOnboardingData('verification', data)}
            userType={userType}
          />
        );
      case 'Review':
        return (
          <ReviewStep
            data={onboardingData}
            userType={userType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2.5 rounded-2xl">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <span className="text-2xl text-gray-900 tracking-tight">PropertyHub</span>
              </div>
            </div>
            <div className="text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <div className="bg-white px-6 py-6 lg:px-8 border-b border-gray-100">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-4">
            <h1 className="text-3xl text-gray-900 tracking-tight mb-2">{getUserTypeTitle(userType)}</h1>
            <p className="text-lg text-gray-600">{steps[currentStep]}</p>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Step Content */}
      <main className="px-6 py-12 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8 lg:p-12">
            {renderStep()}
            
            {/* Navigation */}
            <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={handleBack}
                className="flex items-center gap-2 rounded-full px-6 py-3"
              >
                <ArrowLeft className="h-4 w-4" />
                {currentStep === 0 ? 'Back to Home' : 'Previous'}
              </Button>
              
              <Button 
                onClick={handleNext}
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3"
              >
                {currentStep === steps.length - 1 ? 'Complete Setup' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}