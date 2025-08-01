import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Shield, X, Upload, CheckCircle, AlertCircle, Clock, FileText, Image as ImageIcon } from 'lucide-react';

interface PropertyVerificationProps {
  onClose: () => void;
}

export function PropertyVerification({ onClose }: PropertyVerificationProps) {
  const [uploadedDocs, setUploadedDocs] = useState<Array<{
    id: number;
    name: string;
    type: string;
    status: 'pending' | 'verified' | 'rejected';
    size: string;
  }>>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResults, setVerificationResults] = useState<any>(null);

  const requiredDocuments = [
    { type: 'title_deed', name: 'Title Deed', description: 'Property ownership document' },
    { type: 'tax_receipt', name: 'Property Tax Receipt', description: 'Latest tax payment proof' },
    { type: 'survey_settlement', name: 'Survey Settlement', description: 'Land survey document' },
    { type: 'building_approval', name: 'Building Approval', description: 'Construction approval document' },
    { type: 'no_objection', name: 'No Objection Certificate', description: 'NOC from relevant authorities' },
    { type: 'photos', name: 'Property Photos', description: 'Current property images' }
  ];

  const handleFileUpload = (docType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: docType,
        status: 'pending' as const,
        size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
      };
      setUploadedDocs(prev => [...prev, newDoc]);
    }
  };

  const startVerification = () => {
    setIsVerifying(true);
    
    setTimeout(() => {
      // Mock verification results
      setVerificationResults({
        overallScore: 85,
        status: 'verified',
        checks: [
          { name: 'Document Authenticity', status: 'passed', score: 95 },
          { name: 'Legal Compliance', status: 'passed', score: 88 },
          { name: 'Property Ownership', status: 'passed', score: 92 },
          { name: 'Building Approval', status: 'warning', score: 70 },
          { name: 'Tax Compliance', status: 'passed', score: 85 }
        ],
        issues: [
          'Building approval document is dated. Please verify current status.',
          'Property boundaries need cross-verification with survey records.'
        ],
        recommendations: [
          'Update building approval documentation',
          'Conduct boundary survey verification',
          'Obtain latest NOC certificates'
        ]
      });
      setIsVerifying(false);
    }, 3000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-gray-200 shadow-2xl">
        <CardHeader className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-orange-100 p-2 rounded-xl">
                <Shield className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">Property Verification</CardTitle>
                <p className="text-gray-600">Verify property documents and compliance</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8 space-y-8">
          {!verificationResults ? (
            <>
              {/* Document Upload Section */}
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Upload Required Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requiredDocuments.map((doc) => {
                    const uploaded = uploadedDocs.find(d => d.type === doc.type);
                    return (
                      <Card key={doc.type} className={`border-2 border-dashed transition-all ${
                        uploaded ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{doc.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                              {uploaded && (
                                <div className="flex items-center gap-2 mt-2">
                                  {getStatusIcon(uploaded.status)}
                                  <span className="text-sm text-gray-700">{uploaded.name}</span>
                                  <Badge variant="outline" className={getStatusColor(uploaded.status)}>
                                    {uploaded.status}
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              {doc.type === 'photos' ? (
                                <div className="bg-blue-100 p-2 rounded-lg">
                                  <ImageIcon className="h-5 w-5 text-blue-600" />
                                </div>
                              ) : (
                                <div className="bg-gray-100 p-2 rounded-lg">
                                  <FileText className="h-5 w-5 text-gray-600" />
                                </div>
                              )}
                            </div>
                          </div>
                          
                          {!uploaded && (
                            <div className="mt-4">
                              <input
                                type="file"
                                id={`upload-${doc.type}`}
                                className="hidden"
                                accept={doc.type === 'photos' ? 'image/*' : '.pdf,.jpg,.jpeg,.png'}
                                onChange={(e) => handleFileUpload(doc.type, e)}
                              />
                              <label
                                htmlFor={`upload-${doc.type}`}
                                className="flex items-center justify-center gap-2 p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                <Upload className="h-4 w-4 text-gray-600" />
                                <span className="text-sm text-gray-700">Upload Document</span>
                              </label>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Property Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Property Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Property Address</Label>
                    <Input placeholder="Enter complete address" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label>Survey Number</Label>
                    <Input placeholder="Survey/Plot number" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label>Registration Number</Label>
                    <Input placeholder="Document registration number" className="h-12 rounded-xl" />
                  </div>
                  <div>
                    <Label>Owner Name</Label>
                    <Input placeholder="Property owner name" className="h-12 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Start Verification Button */}
              <Button
                onClick={startVerification}
                disabled={isVerifying || uploadedDocs.length === 0}
                className="w-full h-14 bg-black text-white hover:bg-gray-800 rounded-xl"
              >
                {isVerifying ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Verifying Documents...
                  </div>
                ) : (
                  <>
                    <Shield className="h-5 w-5 mr-2" />
                    Start Verification Process
                  </>
                )}
              </Button>
            </>
          ) : (
            /* Verification Results */
            <div className="space-y-8">
              <div className="text-center">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
                  verificationResults.overallScore >= 80 ? 'bg-green-100 text-green-800' :
                  verificationResults.overallScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {getStatusIcon(verificationResults.status)}
                  <span className="font-semibold">
                    Verification Score: {verificationResults.overallScore}/100
                  </span>
                </div>
              </div>

              {/* Verification Checks */}
              <Card className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-lg">Verification Checklist</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {verificationResults.checks.map((check: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(check.status)}
                        <span className="font-medium text-gray-900">{check.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-600">{check.score}%</span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              check.status === 'passed' ? 'bg-green-500' :
                              check.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${check.score}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Issues & Recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-yellow-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-yellow-800 flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Issues Found
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {verificationResults.issues.map((issue: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-yellow-500 mt-1">•</span>
                          {issue}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-800 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {verificationResults.recommendations.map((rec: string, index: number) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="text-blue-500 mt-1">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Actions */}
              <div className="flex gap-4">
                <Button className="flex-1 h-12 bg-black text-white hover:bg-gray-800 rounded-xl">
                  Download Report
                </Button>
                <Button variant="outline" className="flex-1 h-12 rounded-xl">
                  Schedule Expert Review
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setVerificationResults(null);
                    setUploadedDocs([]);
                  }}
                  className="h-12 rounded-xl px-6"
                >
                  New Verification
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}