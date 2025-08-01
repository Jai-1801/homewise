import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Shield, Upload, FileText, CreditCard, Home, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import type { UserType } from '../../App';

interface VerificationStepProps {
  data: {
    documents: string[];
    verified: boolean;
  };
  onUpdate: (data: any) => void;
  userType: UserType;
}

export function VerificationStep({ data, onUpdate, userType }: VerificationStepProps) {
  const [uploadedDocs, setUploadedDocs] = useState<string[]>(data.documents || []);

  const getRequiredDocuments = () => {
    switch (userType) {
      case 'owner':
        return [
          {
            id: 'property_papers',
            name: 'Property Ownership Papers',
            description: 'Sale deed, title deed, or property registration documents',
            icon: Home,
            required: true,
            uploaded: uploadedDocs.includes('property_papers')
          },
          {
            id: 'identity_proof',
            name: 'Identity Proof',
            description: 'Aadhaar, PAN card, or Passport',
            icon: CreditCard,
            required: true,
            uploaded: uploadedDocs.includes('identity_proof')
          },
          {
            id: 'address_proof',
            name: 'Address Proof',
            description: 'Utility bill, bank statement, or rental agreement',
            icon: FileText,
            required: true,
            uploaded: uploadedDocs.includes('address_proof')
          }
        ];
      
      case 'seller':
        return [
          {
            id: 'property_papers',
            name: 'Property Ownership Papers',
            description: 'Clear title, encumbrance certificate, property tax receipts',
            icon: Home,
            required: true,
            uploaded: uploadedDocs.includes('property_papers')
          },
          {
            id: 'identity_proof',
            name: 'Identity Proof',
            description: 'Government issued ID with photo',
            icon: CreditCard,
            required: true,
            uploaded: uploadedDocs.includes('identity_proof')
          },
          {
            id: 'noc_documents',
            name: 'NOC & Approvals',
            description: 'Society NOC, building approvals, completion certificate',
            icon: FileText,
            required: false,
            uploaded: uploadedDocs.includes('noc_documents')
          }
        ];
      
      case 'buyer':
      case 'renter':
        return [
          {
            id: 'identity_proof',
            name: 'Identity Proof',
            description: 'Aadhaar, PAN card, or Passport',
            icon: CreditCard,
            required: true,
            uploaded: uploadedDocs.includes('identity_proof')
          },
          {
            id: 'income_proof',
            name: 'Income Proof',
            description: 'Salary slips, ITR, or business documents',
            icon: FileText,
            required: userType === 'renter',
            uploaded: uploadedDocs.includes('income_proof')
          },
          {
            id: 'address_proof',
            name: 'Address Proof',
            description: 'Current address verification document',
            icon: FileText,
            required: false,
            uploaded: uploadedDocs.includes('address_proof')
          }
        ];
      
      default:
        return [];
    }
  };

  const documents = getRequiredDocuments();
  const requiredDocs = documents.filter(doc => doc.required);
  const uploadedRequiredDocs = requiredDocs.filter(doc => doc.uploaded).length;
  const isVerificationComplete = uploadedRequiredDocs === requiredDocs.length;

  const handleDocumentUpload = (docId: string) => {
    const newUploadedDocs = uploadedDocs.includes(docId)
      ? uploadedDocs.filter(id => id !== docId)
      : [...uploadedDocs, docId];
    
    setUploadedDocs(newUploadedDocs);
    onUpdate({ 
      documents: newUploadedDocs,
      verified: newUploadedDocs.length >= requiredDocs.length
    });
  };

  const getContextualContent = () => {
    switch (userType) {
      case 'owner':
        return {
          title: "Verify your property ownership",
          description: "Document verification builds trust with potential tenants and ensures faster bookings.",
          benefit: "Verified owners get 5x more inquiries"
        };
      case 'seller':
        return {
          title: "Verify your property for sale",
          description: "Buyers prefer verified properties. Complete verification to build credibility.",
          benefit: "Verified properties sell 40% faster"
        };
      case 'buyer':
        return {
          title: "Verify your profile",
          description: "Verification helps property owners trust you and prioritize your inquiries.",
          benefit: "Verified buyers get priority responses"
        };
      case 'renter':
        return {
          title: "Verify your profile",
          description: "Landlords prefer verified tenants. Speed up your property search with verification.",
          benefit: "Verified profiles get instant approvals"
        };
      default:
        return {
          title: "Complete verification",
          description: "Verification builds trust in our community.",
          benefit: "Verified users get better experiences"
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

      {/* Verification Status */}
      <Card className={`border-2 ${isVerificationComplete ? 'border-green-200 bg-green-50' : 'border-blue-200 bg-blue-50'}`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${isVerificationComplete ? 'bg-green-100' : 'bg-blue-100'}`}>
                {isVerificationComplete ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <Shield className="h-6 w-6 text-blue-600" />
                )}
              </div>
              <div>
                <h3 className={`font-semibold ${isVerificationComplete ? 'text-green-800' : 'text-blue-800'}`}>
                  {isVerificationComplete ? 'Verification Complete!' : 'Verification in Progress'}
                </h3>
                <p className={`text-sm ${isVerificationComplete ? 'text-green-700' : 'text-blue-700'}`}>
                  {uploadedRequiredDocs}/{requiredDocs.length} required documents uploaded
                </p>
              </div>
            </div>
            
            <Badge variant={isVerificationComplete ? "default" : "secondary"} className="text-sm">
              {isVerificationComplete ? 'Verified' : 'Pending'}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-full">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-800">Why verify?</p>
              <p className="text-sm text-yellow-700">{content.benefit}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Upload */}
      <div className="space-y-4">
        <h3 className="font-medium">Required Documents</h3>
        
        {documents.map((doc) => {
          const Icon = doc.icon;
          return (
            <Card
              key={doc.id}
              className={`transition-all ${doc.uploaded ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-2 rounded-lg ${doc.uploaded ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <Icon className={`h-5 w-5 ${doc.uploaded ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{doc.name}</h4>
                        {doc.required && (
                          <Badge variant="outline" className="text-xs">Required</Badge>
                        )}
                        {doc.uploaded && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{doc.description}</p>
                      
                      {doc.uploaded && (
                        <div className="flex items-center gap-2 mt-2 text-sm text-green-700">
                          <Clock className="h-3 w-3" />
                          <span>Uploaded • Under review</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant={doc.uploaded ? "outline" : "default"}
                    size="sm"
                    onClick={() => handleDocumentUpload(doc.id)}
                    className="flex items-center gap-2"
                  >
                    {doc.uploaded ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Uploaded
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Verification Process */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Verification Process</h4>
          <div className="space-y-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span>Upload required documents</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${uploadedRequiredDocs > 0 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              <span>Our team reviews your documents (24-48 hours)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${isVerificationComplete ? 'bg-green-600' : 'bg-gray-300'}`}></div>
              <span>Get verified badge and enhanced profile visibility</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Privacy Notice */}
      <Card className="border-gray-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-gray-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-gray-800">Privacy & Security</p>
              <p className="text-sm text-gray-600 mt-1">
                Your documents are encrypted and stored securely. We never share your personal information
                with third parties without your consent.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}