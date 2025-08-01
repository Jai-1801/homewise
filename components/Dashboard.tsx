import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { RentEstimator } from './tools/RentEstimator';
import { EMICalculator } from './tools/EMICalculator';
import { AgreementGenerator } from './tools/AgreementGenerator';
import { PropertyVerification } from './tools/PropertyVerification';
import { 
  Home, 
  Search, 
  Plus, 
  MessageSquare, 
  User, 
  Calculator, 
  FileText, 
  TrendingUp,
  MapPin,
  Calendar,
  Shield,
  Star,
  Eye,
  Heart,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Quote
} from 'lucide-react';
import { UserType, AppState } from '../App';

interface DashboardProps {
  userType: UserType | null;
  onViewChange: (view: AppState['currentView']) => void;
  onOpenChat?: () => void;
}

export function Dashboard({ userType, onViewChange, onOpenChat }: DashboardProps) {
  const [activeView, setActiveView] = useState<'home' | 'search' | 'add' | 'assistant' | 'profile'>('home');
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

  // Mock testimonials data (would come from admin panel in real app)
  const testimonials = [
    {
      id: 1,
      type: 'recent_deal',
      title: '3BHK Luxury Apartment Sold in 7 Days',
      location: 'Whitefield, Bangalore',
      price: '₹2.8 Crores',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&crop=center',
      client: 'Priya Sharma',
      testimonial: 'PropertyHub made selling my apartment incredibly smooth. Direct buyer contact saved me ₹2.8L in brokerage!',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      dealDate: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      type: 'recent_listing',
      title: '2BHK Modern Villa with Garden',
      location: 'Electronic City, Bangalore',
      price: '₹45,000/month',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop&crop=center',
      client: 'Rajesh Kumar',
      testimonial: 'Found the perfect tenant within 3 days. Zero broker fees and complete transparency throughout!',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      dealDate: '2024-01-20',
      status: 'active'
    },
    {
      id: 3,
      type: 'recent_deal',
      title: 'Penthouse with City View - Quick Sale',
      location: 'Koramangala, Bangalore',
      price: '₹4.2 Crores',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&crop=center',
      client: 'Anita Verma',
      testimonial: 'Exceptional service! Got multiple genuine buyers and closed the deal at asking price.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 5,
      dealDate: '2024-01-18',
      status: 'active'
    }
  ];

  const toolCards = [
    {
      title: 'Rent Estimator',
      description: 'Get accurate rent estimates for any location',
      icon: TrendingUp,
      color: 'bg-blue-50 text-blue-600',
      action: () => setActiveTool('rent-estimator')
    },
    {
      title: 'EMI Calculator',
      description: 'Calculate home loan EMIs instantly',
      icon: Calculator,
      color: 'bg-green-50 text-green-600',
      action: () => setActiveTool('emi-calculator')
    },
    {
      title: 'Agreement Generator',
      description: 'Create legal rental agreements',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600',
      action: () => setActiveTool('agreement-generator')
    },
    {
      title: 'Property Verification',
      description: 'Verify property documents',
      icon: Shield,
      color: 'bg-orange-50 text-orange-600',
      action: () => setActiveTool('property-verification')
    }
  ];

  const recentProperties = [
    {
      id: 1,
      title: '3BHK Apartment in Koramangala',
      price: '₹45,000/month',
      location: 'Koramangala, Bangalore',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400',
      views: 125,
      likes: 8,
      status: 'active'
    },
    {
      id: 2,
      title: '2BHK Villa in Whitefield',
      price: '₹35,000/month',
      location: 'Whitefield, Bangalore',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400',
      views: 89,
      likes: 12,
      status: 'pending'
    }
  ];

  const stats = {
    owner: {
      totalListings: 3,
      activeListings: 2,
      totalViews: 214,
      inquiries: 15
    },
    buyer: {
      savedProperties: 8,
      scheduledVisits: 2,
      applications: 1,
      shortlisted: 5
    },
    renter: {
      savedProperties: 12,
      contactedOwners: 5,
      scheduledVisits: 3,
      applications: 2
    }
  };

  // Function to handle the main CTA button click based on user type
  const handleMainAction = () => {
    switch (userType) {
      case 'owner':
      case 'seller':
        onViewChange('listing');
        break;
      case 'buyer':
      case 'renter':
        onViewChange('search');
        break;
      default:
        onViewChange('search');
    }
  };

  // Get button text based on user type
  const getButtonText = () => {
    switch (userType) {
      case 'owner':
        return 'Add New Property';
      case 'seller':
        return 'List Property for Sale';
      case 'buyer':
        return 'Browse Properties';
      case 'renter':
        return 'Search Rentals';
      default:
        return 'Get Started';
    }
  };

  // Testimonials slider functions
  const nextTestimonial = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play testimonials slider
  React.useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderHomeContent = () => (
    <div className="space-y-12">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl p-8">
        <h2 className="text-3xl text-gray-900 tracking-tight mb-3">Welcome back!</h2>
        <p className="text-xl text-gray-600 mb-6 leading-relaxed">
          {userType === 'owner' && 'Manage your property listings and track inquiries'}
          {userType === 'seller' && 'List your property and connect with verified buyers'}
          {userType === 'buyer' && 'Continue your property search and manage applications'}
          {userType === 'renter' && 'Find your perfect rental home'}
          {!userType && 'Welcome to PropertyHub - your real estate journey starts here'}
        </p>
        <Button 
          onClick={handleMainAction}
          className="relative btn-premium bg-black text-white hover:bg-gray-800 rounded-full px-8 py-3 overflow-hidden group transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <span className="relative z-10 flex items-center gap-2">
            {getButtonText()}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {userType === 'owner' && (
          <>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.totalListings}</div>
                  <div className="text-gray-600">Total Listings</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.totalViews}</div>
                  <div className="text-gray-600">Total Views</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.inquiries}</div>
                  <div className="text-gray-600">Inquiries</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.activeListings}</div>
                  <div className="text-gray-600">Active</div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        {(userType === 'buyer' || userType === 'renter') && (
          <>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{userType === 'buyer' ? stats.buyer.savedProperties : stats.renter.savedProperties}</div>
                  <div className="text-gray-600">Saved</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{userType === 'buyer' ? stats.buyer.scheduledVisits : stats.renter.scheduledVisits}</div>
                  <div className="text-gray-600">Visits</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{userType === 'buyer' ? stats.buyer.applications : stats.renter.applications}</div>
                  <div className="text-gray-600">Applications</div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{userType === 'buyer' ? stats.buyer.shortlisted : stats.renter.contactedOwners}</div>
                  <div className="text-gray-600">{userType === 'buyer' ? 'Shortlisted' : 'Contacted'}</div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Success Stories Slider */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-3xl text-gray-900 tracking-tight">Success Stories</h3>
          <p className="text-lg text-gray-600">Real deals, real people, real results</p>
        </div>
        
        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <Card className="border-gray-200 shadow-sm mx-2">
                    <CardContent className="p-8">
                      <div className="grid lg:grid-cols-2 gap-8 items-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3"></div>
                          <ImageWithFallback
                            src={testimonial.image}
                            alt={testimonial.title}
                            className="relative w-full h-64 object-cover rounded-3xl shadow-xl"
                          />
                          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-sm font-medium text-gray-900">
                                {testimonial.type === 'recent_deal' ? 'Recently Sold' : 'New Listing'}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-6">
                          <div>
                            <h4 className="text-2xl lg:text-3xl text-gray-900 tracking-tight mb-3">
                              {testimonial.title}
                            </h4>
                            <div className="flex items-center gap-4 text-gray-600 mb-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                <span>{testimonial.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(testimonial.dealDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="text-2xl lg:text-3xl text-blue-600 tracking-tight mb-6">
                              {testimonial.price}
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-3xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                              <ImageWithFallback
                                src={testimonial.avatar}
                                alt={testimonial.client}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{testimonial.client}</div>
                                <div className="flex items-center gap-1">
                                  {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  ))}
                                </div>
                              </div>
                              <Quote className="h-6 w-6 text-blue-500 ml-auto" />
                            </div>
                            <p className="text-lg text-gray-700 leading-relaxed italic">
                              "{testimonial.testimonial}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonialSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonialSlide ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tool Cards */}
      <div className="space-y-6">
        <h3 className="text-2xl text-gray-900 tracking-tight">Quick Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolCards.map((tool, index) => (
            <Card key={index} className="hover-scale cursor-pointer border-gray-200 shadow-sm hover:shadow-md transition-all duration-300" onClick={tool.action}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-2xl ${tool.color}`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <h4 className="text-gray-900">{tool.title}</h4>
                    <p className="text-gray-600">{tool.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Properties */}
      {userType === 'owner' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl text-gray-900 tracking-tight">Your Properties</h3>
            <Button variant="outline" className="rounded-full px-4 py-2" onClick={() => onViewChange('listing')}>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </div>
          <div className="space-y-4">
            {recentProperties.map((property) => (
              <Card key={property.id} className="border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex space-x-6">
                    <ImageWithFallback 
                      src={property.image} 
                      alt={property.title}
                      className="w-24 h-24 rounded-2xl object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="text-lg text-gray-900">{property.title}</h4>
                          <p className="text-gray-600">{property.location}</p>
                          <p className="text-xl text-blue-600 tracking-tight">{property.price}</p>
                        </div>
                        <Badge variant={property.status === 'active' ? 'default' : 'secondary'} className="rounded-full">
                          {property.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-6 text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{property.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="h-4 w-4" />
                          <span>{property.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Main Content */}
      <div className="pb-24 px-6 pt-8 max-w-4xl mx-auto">
        {activeView === 'home' && renderHomeContent()}
        {activeView === 'search' && (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-3xl text-gray-900 tracking-tight">Property Search</h2>
            <Button 
              onClick={() => onViewChange('search')}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3"
            >
              Open Advanced Search
            </Button>
          </div>
        )}
        {activeView === 'add' && (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-3xl text-gray-900 tracking-tight">Add Property</h2>
            <Button 
              onClick={() => onViewChange('listing')}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3"
            >
              Start Property Listing
            </Button>
          </div>
        )}
        {activeView === 'profile' && (
          <div className="text-center py-16 space-y-6">
            <h2 className="text-3xl text-gray-900 tracking-tight">Profile Settings</h2>
            <Button 
              onClick={() => onViewChange('profile')}
              className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3"
            >
              Manage Profile
            </Button>
          </div>
        )}
      </div>

      {/* Tool Modals */}
      {activeTool === 'rent-estimator' && (
        <RentEstimator onClose={() => setActiveTool(null)} />
      )}
      {activeTool === 'emi-calculator' && (
        <EMICalculator onClose={() => setActiveTool(null)} />
      )}
      {activeTool === 'agreement-generator' && (
        <AgreementGenerator onClose={() => setActiveTool(null)} />
      )}
      {activeTool === 'property-verification' && (
        <PropertyVerification onClose={() => setActiveTool(null)} />
      )}

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-3">
          <button
            onClick={() => setActiveView('home')}
            className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 ${
              activeView === 'home' ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </button>
          
          <button
            onClick={() => onViewChange('search')}
            className="flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </button>
          
          <button
            onClick={() => onViewChange('listing')}
            className="flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <Plus className="h-5 w-5" />
            <span className="text-xs mt-1">Add</span>
          </button>
          
          <button
            onClick={() => onOpenChat?.()}
            className="flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <MessageSquare className="h-5 w-5" />
            <span className="text-xs mt-1">Chat</span>
          </button>
          
          <button
            onClick={() => onViewChange('profile')}
            className="flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-300 text-gray-500 hover:text-gray-700 hover:bg-gray-50"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
}