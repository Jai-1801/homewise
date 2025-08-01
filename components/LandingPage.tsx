import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Search, Building2, Sparkles, Mic, Shield, CheckCircle, Zap, ArrowRight, MapPin, Calendar, Users, TrendingUp, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { UserType } from '../App';

interface LandingPageProps {
  onUserTypeSelect: (userType: UserType) => void;
  onSignIn: () => void;
  onSignUp: () => void;
}

export function LandingPage({ onUserTypeSelect, onSignIn, onSignUp }: LandingPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const userTypes = [
    { type: 'buyer' as UserType, title: 'Buy', icon: '🏠' },
    { type: 'renter' as UserType, title: 'Rent', icon: '🔑' },
    { type: 'seller' as UserType, title: 'Sell', icon: '💰' },
    { type: 'owner' as UserType, title: 'List', icon: '📝' }
  ];

  const mockSuggestions = [
    "2 BHK apartment in Bangalore under ₹50L",
    "3 bedroom villa with garden in Gurgaon", 
    "Studio apartment near IT hub for rent"
  ];

  // Admin-managed testimonials/success stories
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
      dealDate: '2024-01-15'
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
      dealDate: '2024-01-20'
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
      dealDate: '2024-01-18'
    }
  ];

  const handleSearchInput = (value: string) => {
    setSearchQuery(value);
    if (value.length > 2) {
      setSuggestions(mockSuggestions.slice(0, 3));
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      console.log('Analyzing search query:', searchQuery);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play slider
  React.useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2.5 rounded-2xl">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl text-gray-900 tracking-tight">PropertyHub</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900" onClick={onSignIn}>
                Sign In
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2" onClick={onSignUp}>
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="px-6 py-20 lg:px-8 lg:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Title */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl lg:text-7xl text-gray-900 mb-8 tracking-tight"
          >
            Redefining Real Estate
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience property transactions without boundaries. Connect directly with owners, 
            save on commissions, and discover your perfect space with complete transparency.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative max-w-3xl mx-auto mb-8"
          >
            <div className={`relative bg-white rounded-2xl shadow-xl border border-gray-200 transition-all duration-300 ${
              isFocused ? 'shadow-2xl ring-2 ring-blue-500/20' : 'hover:shadow-2xl'
            }`}>
              <div className="flex items-center px-6 py-5">
                <Search className="h-5 w-5 text-gray-400 mr-4" />
                <Input
                  value={searchQuery}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearchSubmit()}
                  placeholder="Describe your dream property... 'I need a 2BHK near tech park under 30L'"
                  className="flex-1 !border-0 !border-none bg-transparent text-lg placeholder:text-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 px-0 shadow-none"
                />
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <Mic className="h-5 w-5 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-50 rounded-xl transition-colors">
                    <Sparkles className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Suggestions Dropdown */}
            {(isFocused && suggestions.length > 0) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-10"
              >
                <div className="p-2">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-600">AI Suggestions</span>
                  </div>
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-3 cursor-pointer hover:bg-gray-50 rounded-xl mx-2 transition-colors"
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setIsFocused(false);
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Quick Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-2 mb-16"
          >
            {['Buy', 'Rent', '2 BHK', '3 BHK', 'Villa', 'Apartment', 'Commercial'].map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearchInput(searchQuery + (searchQuery ? ' ' : '') + tag)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              <span>AI-Powered Search</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Verified Results</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-orange-500" />
              <span>Instant Matches</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Property Discovery Section - New Section */}
      <section className="px-6 py-20 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <div className="space-y-8">
              <h2 className="text-4xl lg:text-6xl text-gray-900 tracking-tight">
                Transform Property Search Into Instant Discovery
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Upload your requirements and get an instant match with verified properties. 
                Our AI understands your needs and connects you with the perfect space in seconds, 
                not hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-gray-700">AI-powered property matching in real-time</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <span className="text-gray-700">Verified listings with authentic documentation</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-purple-600" />
                  </div>
                  <span className="text-gray-700">Direct owner contact, zero brokerage fees</span>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-black text-white hover:bg-gray-800 rounded-full px-8 py-4 text-lg btn-premium"
                onClick={() => onUserTypeSelect('buyer')}
              >
                Start Discovering <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-6"></div>
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl transform -rotate-3 blur-xl"></div>
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop&crop=center"
                alt="Modern luxury apartment with smart home features and city view"
                className="relative w-full h-[500px] object-cover rounded-3xl shadow-2xl"
              />
              {/* Overlay stats for credibility */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl text-gray-900 tracking-tight">50K+</div>
                      <div className="text-xs text-gray-600">Properties Listed</div>
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900 tracking-tight">₹0</div>
                      <div className="text-xs text-gray-600">Brokerage Fees</div>
                    </div>
                    <div>
                      <div className="text-2xl text-gray-900 tracking-tight">24hr</div>
                      <div className="text-xs text-gray-600">Quick Matches</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Success Stories Slider */}
      <section className="px-6 py-20 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-6xl text-gray-900 tracking-tight mb-6">
              Success Stories That Build Trust
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Real people, real transactions, real results. See how PropertyHub has transformed 
              property experiences for thousands of users.
            </p>
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="w-full flex-shrink-0">
                    <div className="grid lg:grid-cols-2 gap-12 items-center p-8 lg:p-16 bg-white">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-3"></div>
                        <ImageWithFallback
                          src={testimonial.image}
                          alt={testimonial.title}
                          className="relative w-full h-[400px] object-cover rounded-3xl shadow-2xl"
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
                      
                      <div className="space-y-8">
                        <div>
                          <h3 className="text-3xl lg:text-4xl text-gray-900 tracking-tight mb-4">
                            {testimonial.title}
                          </h3>
                          <div className="flex items-center gap-4 text-gray-600 mb-6">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>{testimonial.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{new Date(testimonial.dealDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="text-2xl lg:text-3xl text-blue-600 tracking-tight mb-8">
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
                          </div>
                          <p className="text-lg text-gray-700 leading-relaxed italic">
                            "{testimonial.testimonial}"
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Navigation */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Simple User Type Selection */}
      <section className="px-6 py-16 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl text-gray-900 mb-8"
          >
            Or choose what you want to do
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {userTypes.map((userType, index) => (
              <motion.button
                key={userType.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onUserTypeSelect(userType.type)}
                className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <span className="text-2xl">{userType.icon}</span>
                <span className="text-gray-900">{userType.title}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}