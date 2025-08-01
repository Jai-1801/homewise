import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { FileText, X, Download, Eye, User, Building } from 'lucide-react';

interface AgreementGeneratorProps {
  onClose: () => void;
}

export function AgreementGenerator({ onClose }: AgreementGeneratorProps) {
  const [step, setStep] = useState(1);
  const [agreementData, setAgreementData] = useState({
    type: '',
    landlord: { name: '', address: '', phone: '', email: '' },
    tenant: { name: '', address: '', phone: '', email: '' },
    property: { address: '', type: '', area: '', rent: '', deposit: '' },
    terms: { duration: '', startDate: '', endDate: '', maintenanceBy: '' },
    conditions: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAgreement, setGeneratedAgreement] = useState('');

  const handleInputChange = (section: string, field: string, value: string) => {
    setAgreementData(prev => ({
      ...prev,
      [section]: { ...prev[section as keyof typeof prev], [field]: value }
    }));
  };

  const generateAgreement = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const agreement = `
RENTAL AGREEMENT

This Rental Agreement is made on ${agreementData.terms.startDate} between:

LANDLORD: ${agreementData.landlord.name}
Address: ${agreementData.landlord.address}
Phone: ${agreementData.landlord.phone}
Email: ${agreementData.landlord.email}

TENANT: ${agreementData.tenant.name}
Address: ${agreementData.tenant.address}
Phone: ${agreementData.tenant.phone}
Email: ${agreementData.tenant.email}

PROPERTY DETAILS:
Address: ${agreementData.property.address}
Type: ${agreementData.property.type}
Area: ${agreementData.property.area} sq ft
Monthly Rent: ₹${agreementData.property.rent}
Security Deposit: ₹${agreementData.property.deposit}

TERMS & CONDITIONS:
1. Lease Duration: ${agreementData.terms.duration} months
2. Lease Period: ${agreementData.terms.startDate} to ${agreementData.terms.endDate}
3. Maintenance: ${agreementData.terms.maintenanceBy}
4. Additional Conditions: ${agreementData.conditions}

SIGNATURES:
Landlord: _________________ Date: _________
Tenant: _________________ Date: _________
      `;
      
      setGeneratedAgreement(agreement);
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Agreement Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Rental Agreement', 'Lease Agreement', 'Leave & License'].map((type) => (
                <button
                  key={type}
                  onClick={() => setAgreementData(prev => ({ ...prev, type }))}
                  className={`p-4 rounded-xl border transition-all ${
                    agreementData.type === type
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Landlord Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={agreementData.landlord.name}
                    onChange={(e) => handleInputChange('landlord', 'name', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={agreementData.landlord.phone}
                    onChange={(e) => handleInputChange('landlord', 'phone', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={agreementData.landlord.email}
                    onChange={(e) => handleInputChange('landlord', 'email', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={agreementData.landlord.address}
                    onChange={(e) => handleInputChange('landlord', 'address', e.target.value)}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="h-5 w-5" />
                Tenant Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Full Name</Label>
                  <Input
                    value={agreementData.tenant.name}
                    onChange={(e) => handleInputChange('tenant', 'name', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Phone Number</Label>
                  <Input
                    value={agreementData.tenant.phone}
                    onChange={(e) => handleInputChange('tenant', 'phone', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    value={agreementData.tenant.email}
                    onChange={(e) => handleInputChange('tenant', 'email', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Address</Label>
                  <Textarea
                    value={agreementData.tenant.address}
                    onChange={(e) => handleInputChange('tenant', 'address', e.target.value)}
                    className="rounded-xl"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="h-5 w-5" />
                Property Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label>Property Address</Label>
                  <Textarea
                    value={agreementData.property.address}
                    onChange={(e) => handleInputChange('property', 'address', e.target.value)}
                    className="rounded-xl"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Property Type</Label>
                  <Select
                    value={agreementData.property.type}
                    onValueChange={(value) => handleInputChange('property', 'type', value)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Area (sq ft)</Label>
                  <Input
                    value={agreementData.property.area}
                    onChange={(e) => handleInputChange('property', 'area', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Monthly Rent (₹)</Label>
                  <Input
                    type="number"
                    value={agreementData.property.rent}
                    onChange={(e) => handleInputChange('property', 'rent', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Security Deposit (₹)</Label>
                  <Input
                    type="number"
                    value={agreementData.property.deposit}
                    onChange={(e) => handleInputChange('property', 'deposit', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Lease Duration (months)</Label>
                  <Input
                    type="number"
                    value={agreementData.terms.duration}
                    onChange={(e) => handleInputChange('terms', 'duration', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    value={agreementData.terms.startDate}
                    onChange={(e) => handleInputChange('terms', 'startDate', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div>
                  <Label>Maintenance By</Label>
                  <Select
                    value={agreementData.terms.maintenanceBy}
                    onValueChange={(value) => handleInputChange('terms', 'maintenanceBy', value)}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="landlord">Landlord</SelectItem>
                      <SelectItem value="tenant">Tenant</SelectItem>
                      <SelectItem value="shared">Shared</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Additional Conditions</Label>
                  <Textarea
                    value={agreementData.conditions}
                    onChange={(e) => setAgreementData(prev => ({ ...prev, conditions: e.target.value }))}
                    className="rounded-xl"
                    rows={3}
                    placeholder="Any additional terms and conditions..."
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Generated Agreement</h3>
            <div className="bg-gray-50 rounded-xl p-6 max-h-96 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-sm text-gray-800 leading-relaxed">
                {generatedAgreement}
              </pre>
            </div>
            <div className="flex gap-4">
              <Button className="flex-1 h-12 bg-black text-white hover:bg-gray-800 rounded-xl">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-gray-200 shadow-2xl">
        <CardHeader className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-purple-100 p-2 rounded-xl">
                <FileText className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Agreement Generator</CardTitle>
                <p className="text-gray-600">Create legal rental agreements</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mt-4">
            {[1, 2, 3, 4].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= stepNum ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNum}
                </div>
                {stepNum < 4 && (
                  <div className={`w-16 h-0.5 ${
                    step > stepNum ? 'bg-blue-500' : 'bg-gray-200'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </CardHeader>

        <CardContent className="p-8">
          {renderStep()}

          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="outline"
              onClick={() => step > 1 ? setStep(step - 1) : onClose()}
              className="rounded-xl px-6"
            >
              {step === 1 ? 'Cancel' : 'Previous'}
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={() => setStep(step + 1)}
                className="bg-black text-white hover:bg-gray-800 rounded-xl px-6"
              >
                Next
              </Button>
            ) : step === 3 ? (
              <Button
                onClick={generateAgreement}
                disabled={isGenerating}
                className="bg-black text-white hover:bg-gray-800 rounded-xl px-6"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  'Generate Agreement'
                )}
              </Button>
            ) : (
              <Button
                onClick={() => setStep(1)}
                variant="outline"
                className="rounded-xl px-6"
              >
                Create New
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}