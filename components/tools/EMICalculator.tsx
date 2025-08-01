import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Calculator, X, IndianRupee, Percent, Calendar } from 'lucide-react';

interface EMICalculatorProps {
  onClose: () => void;
}

export function EMICalculator({ onClose }: EMICalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateEMI = () => {
    const principal = loanAmount;
    const rate = interestRate / 12 / 100;
    const tenure = loanTenure * 12;

    if (rate === 0) {
      setEmi(principal / tenure);
    } else {
      const emiAmount = principal * rate * Math.pow(1 + rate, tenure) / (Math.pow(1 + rate, tenure) - 1);
      setEmi(emiAmount);
    }

    const totalAmountPayable = emi * tenure;
    setTotalAmount(totalAmountPayable);
    setTotalInterest(totalAmountPayable - principal);
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto border-gray-200 shadow-2xl">
        <CardHeader className="sticky top-0 bg-white border-b border-gray-100 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-xl">
                <Calculator className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-xl text-gray-900">EMI Calculator</CardTitle>
                <p className="text-gray-600">Calculate home loan EMIs instantly</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="rounded-full">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-lg">
                  <IndianRupee className="h-5 w-5" />
                  Loan Amount
                </Label>
                <div className="space-y-3">
                  <Input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="h-14 text-lg rounded-xl"
                  />
                  <Slider
                    value={[loanAmount]}
                    onValueChange={(value) => setLoanAmount(value[0])}
                    min={500000}
                    max={50000000}
                    step={100000}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>₹5L</span>
                    <span className="font-medium">{formatCurrency(loanAmount)}</span>
                    <span>₹5Cr</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-lg">
                  <Percent className="h-5 w-5" />
                  Interest Rate (% per annum)
                </Label>
                <div className="space-y-3">
                  <Input
                    type="number"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    step="0.1"
                    className="h-14 text-lg rounded-xl"
                  />
                  <Slider
                    value={[interestRate]}
                    onValueChange={(value) => setInterestRate(value[0])}
                    min={5}
                    max={20}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>5%</span>
                    <span className="font-medium">{interestRate}%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="flex items-center gap-2 text-lg">
                  <Calendar className="h-5 w-5" />
                  Loan Tenure (Years)
                </Label>
                <div className="space-y-3">
                  <Input
                    type="number"
                    value={loanTenure}
                    onChange={(e) => setLoanTenure(Number(e.target.value))}
                    className="h-14 text-lg rounded-xl"
                  />
                  <Slider
                    value={[loanTenure]}
                    onValueChange={(value) => setLoanTenure(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1 Year</span>
                    <span className="font-medium">{loanTenure} Years</span>
                    <span>30 Years</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">EMI Breakdown</h3>
                  
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-blue-600 mb-2">
                        ₹{emi.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-gray-600">Monthly EMI</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-white rounded-xl">
                        <p className="text-xl font-semibold text-gray-900">
                          ₹{loanAmount.toLocaleString('en-IN')}
                        </p>
                        <p className="text-sm text-gray-600">Principal Amount</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-xl">
                        <p className="text-xl font-semibold text-orange-600">
                          ₹{totalInterest.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </p>
                        <p className="text-sm text-gray-600">Total Interest</p>
                      </div>
                    </div>

                    <div className="text-center p-4 bg-white rounded-xl">
                      <p className="text-2xl font-semibold text-green-600">
                        ₹{totalAmount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                      <p className="text-sm text-gray-600">Total Amount Payable</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Chart */}
              <Card className="border-gray-200">
                <CardContent className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Payment Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Principal</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${(loanAmount / totalAmount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {((loanAmount / totalAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Interest</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full"
                            style={{ width: `${(totalInterest / totalAmount) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {((totalInterest / totalAmount) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 rounded-xl">
                  Download Report
                </Button>
                <Button variant="outline" className="h-12 rounded-xl">
                  Compare Loans
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}