import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Search, 
  MapPin, 
  Filter, 
  Heart, 
  Share, 
  Phone,
  MessageSquare,
  ArrowLeft,
  Bed,
  Bath,
  Car,
  Maximize,
  Star,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { UserType, AppState } from '../App';

interface PropertySearchProps {
  userType: UserType | null;
  onViewChange: (view: AppState['currentView']) => void;
}

export function PropertySearch({ userType, onViewChange }: PropertySearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([10000, 100000]);
  const [bhkFilter, setBhkFilter] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [propertyType, setPropertyType] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [likedProperties, setLikedProperties] = useState<number[]>([]);

  const propertyResults = [
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      price: '₹45,000/month',
      location: 'Koramangala, Bangalore',
      area: '1200 sq ft',
      bedrooms: 3,
      bathrooms: 2,
      parking: 1,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop&crop=center',
      amenities: ['Swimming Pool', 'Gym', 'Security'],
      ownerName: 'Rajesh Kumar',
      postedDays: 2,
      verified: true
    },
    {
      id: 2,
      title: '2BHK Modern Villa',
      price: '₹35,000/month',
      location: 'Whitefield, Bangalore',
      area: '950 sq ft',
      bedrooms: 2,
      bathrooms: 2,
      parking: 1,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&crop=center',
      amenities: ['Garden', 'Parking', 'Security'],
      ownerName: 'Priya Sharma',
      postedDays: 5,
      verified: true
    },
    {
      id: 3,
      title: '1BHK Studio Apartment',
      price: '₹18,000/month',
      location: 'HSR Layout, Bangalore',
      area: '550 sq ft',
      bedrooms: 1,
      bathrooms: 1,
      parking: 0,
      rating: 4.4,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&crop=center',
      amenities: ['WiFi', 'AC', 'Furnished'],
      ownerName: 'Amit Patel',
      postedDays: 1,
      verified: false
    }
  ];

  const quickFilters = [
    { label: 'Under ₹30k', active: false },
    { label: '2-3 BHK', active: false },
    { label: 'Furnished', active: false },
    { label: 'Pet Friendly', active: false }
  ];

  const locationSuggestions = [
    'Koramangala, Bangalore',
    'Whitefield, Bangalore',
    'HSR Layout, Bangalore',
    'Indiranagar, Bangalore',
    'Electronic City, Bangalore'
  ];

  const amenityOptions = [
    'Swimming Pool', 'Gym', 'Security', 'Parking', 'Garden', 
    'WiFi', 'AC', 'Furnished', 'Elevator', 'Balcony'
  ];

  const handleBhkToggle = (bhk: string) => {
    setBhkFilter(prev => 
      prev.includes(bhk) 
        ? prev.filter(b => b !== bhk)
        : [...prev, bhk]
    );
  };

  const handleAmenityToggle = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const toggleLike = (propertyId: number) => {
    setLikedProperties(prev =>
      prev.includes(propertyId)
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-40">
        <div className="flex items-center justify-between p-4 max-w-6xl mx-auto">
          <button
            onClick={() => onViewChange('dashboard')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>
          <h1 className="text-lg text-gray-900 tracking-tight">Search Properties</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300"
          >
            <Filter className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Search Bar */}
        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by location, property type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-base rounded-2xl border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 transition-all duration-300 search-bar"
              />
            </div>
            <Button 
              variant="outline" 
              size="lg"
              className="h-14 px-4 rounded-2xl border-gray-200 hover:bg-gray-50"
            >
              <MapPin className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
          
          {/* Location Suggestions */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 suggestions-dropdown overflow-hidden">
              {locationSuggestions
                .filter(location => location.toLowerCase().includes(searchQuery.toLowerCase()))
                .map((location, index) => (
                  <button
                    key={index}
                    onClick={() => setSearchQuery(location)}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-900">{location}</span>
                  </button>
                ))
              }
            </div>
          )}
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3">
          {quickFilters.map((filter, index) => (
            <Button 
              key={index}
              variant="outline" 
              size="sm" 
              className={`search-tag rounded-full px-4 py-2 border-gray-200 hover:border-gray-300 ${
                filter.active ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white text-gray-700'
              }`}
            >
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <Card className="border-gray-200 shadow-sm rounded-3xl overflow-hidden">
            <CardHeader className="bg-gray-50 border-b border-gray-100">
              <CardTitle className="text-lg text-gray-900">Filters</CardTitle>
            </CardHeader>
            <CardContent className="p-8 space-y-8">
              {/* Price Range */}
              <div>
                <label className="block mb-4 text-base text-gray-900">Price Range</label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={200000}
                  min={5000}
                  step={5000}
                  className="mb-4"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0].toLocaleString()}</span>
                  <span>₹{priceRange[1].toLocaleString()}</span>
                </div>
              </div>

              {/* BHK Filter */}
              <div>
                <label className="block mb-4 text-base text-gray-900">BHK Type</label>
                <div className="flex flex-wrap gap-3">
                  {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map((bhk) => (
                    <Button
                      key={bhk}
                      variant={bhkFilter.includes(bhk) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleBhkToggle(bhk)}
                      className="rounded-xl px-4 py-2"
                    >
                      {bhk}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block mb-4 text-base text-gray-900">Property Type</label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="villa">Villa</SelectItem>
                    <SelectItem value="studio">Studio</SelectItem>
                    <SelectItem value="penthouse">Penthouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Amenities */}
              <div>
                <label className="block mb-4 text-base text-gray-900">Amenities</label>
                <div className="grid grid-cols-2 gap-4">
                  {amenityOptions.map((amenity) => (
                    <div key={amenity} className="flex items-center space-x-3">
                      <Checkbox
                        checked={amenities.includes(amenity)}
                        onCheckedChange={() => handleAmenityToggle(amenity)}
                        className="rounded-md"
                      />
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl text-gray-900 tracking-tight">Found {propertyResults.length} properties</h2>
          <Select defaultValue="recent">
            <SelectTrigger className="w-40 h-10 rounded-xl border-gray-200">
              <SelectValue />
              <ChevronDown className="h-4 w-4" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Recent</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Property Results */}
        <div className="space-y-6">
          {propertyResults.map((property) => (
            <Card key={property.id} className="hover-scale cursor-pointer border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-3xl overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <div className="relative">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.title}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(property.id);
                        }}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-300"
                      >
                        <Heart 
                          className={`h-5 w-5 ${
                            likedProperties.includes(property.id) 
                              ? 'fill-red-500 text-red-500' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </button>
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-all duration-300">
                        <Share className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                    {property.verified && (
                      <Badge className="absolute bottom-4 left-4 bg-green-500 hover:bg-green-600 rounded-full px-3 py-1">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl text-gray-900 tracking-tight mb-1">{property.title}</h3>
                        <p className="text-gray-600 mb-2 flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {property.location}
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-gray-700">{property.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl text-blue-600 tracking-tight">{property.price}</p>
                        <p className="text-gray-600">{property.area}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 text-gray-600">
                      <div className="flex items-center gap-1">
                        <Bed className="h-4 w-4" />
                        <span>{property.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Bath className="h-4 w-4" />
                        <span>{property.bathrooms}</span>
                      </div>
                      {property.parking > 0 && (
                        <div className="flex items-center gap-1">
                          <Car className="h-4 w-4" />
                          <span>{property.parking}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {property.amenities.slice(0, 3).map((amenity, index) => (
                        <Badge key={index} variant="secondary" className="rounded-full px-3 py-1">
                          {amenity}
                        </Badge>
                      ))}
                      {property.amenities.length > 3 && (
                        <Badge variant="secondary" className="rounded-full px-3 py-1">
                          +{property.amenities.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600">
                      Posted by {property.ownerName} • {property.postedDays} days ago
                    </p>

                    <div className="flex gap-3 pt-2">
                      <Button className="flex-1 h-12 bg-black text-white hover:bg-gray-800 rounded-xl">
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Visit
                      </Button>
                      <Button variant="outline" size="lg" className="h-12 px-4 rounded-xl">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="outline" size="lg" className="h-12 px-4 rounded-xl">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center pt-8">
          <Button variant="outline" className="rounded-full px-8 py-3">
            Load More Properties
          </Button>
        </div>
      </div>
    </div>
  );
}