import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ImageWithFallback } from './figma/ImageWithFallback';
import {
  Settings,
  Users,
  Building2,
  TrendingUp,
  FileText,
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Eye,
  Star,
  MapPin,
  Calendar,
  ArrowLeft,
  Upload,
  Save,
  X,
  Search,
  Filter,
  Mail,
  Phone,
  MoreHorizontal,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  Globe,
  Bell,
  Database,
  Key,
  UserCheck,
  UserX,
  Home,
  IndianRupee,
  Activity,
  BarChart3,
  Download,
  RefreshCw
} from 'lucide-react';
import { AppState } from '../App';

interface AdminPanelProps {
  onViewChange: (view: AppState['currentView']) => void;
}

export function AdminPanel({ onViewChange }: AdminPanelProps) {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<number[]>([]);

  const [newTestimonial, setNewTestimonial] = useState({
    title: '',
    location: '',
    price: '',
    image: '',
    client: '',
    testimonial: '',
    avatar: '',
    type: 'recent_deal'
  });

  // Mock data for testimonials management
  const [testimonials, setTestimonials] = useState([
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
    }
  ]);

  // Mock users data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Amit Sharma',
      email: 'amit.sharma@example.com',
      phone: '+91 9876543210',
      userType: 'buyer',
      joinDate: '2024-01-15',
      status: 'active',
      verified: true,
      properties: 3,
      totalSpent: 250000,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Priya Verma',
      email: 'priya.verma@example.com',
      phone: '+91 9876543211',
      userType: 'owner',
      joinDate: '2024-01-10',
      status: 'active',
      verified: true,
      properties: 5,
      totalSpent: 0,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Rohit Patel',
      email: 'rohit.patel@example.com',
      phone: '+91 9876543212',
      userType: 'renter',
      joinDate: '2024-01-20',
      status: 'inactive',
      verified: false,
      properties: 1,
      totalSpent: 45000,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ]);

  // Mock properties data
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: '3BHK Luxury Apartment',
      location: 'Koramangala, Bangalore',
      price: '₹2.8 Crores',
      type: 'sale',
      status: 'active',
      owner: 'Priya Sharma',
      postedDate: '2024-01-15',
      views: 1247,
      inquiries: 23,
      verified: true,
      featured: true,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 2,
      title: '2BHK Modern Villa',
      location: 'Electronic City, Bangalore',
      price: '₹45,000/month',
      type: 'rent',
      status: 'pending',
      owner: 'Rajesh Kumar',
      postedDate: '2024-01-20',
      views: 456,
      inquiries: 12,
      verified: false,
      featured: false,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Studio Apartment',
      location: 'Whitefield, Bangalore',
      price: '₹25,000/month',
      type: 'rent',
      status: 'inactive',
      owner: 'Amit Sharma',
      postedDate: '2024-01-18',
      views: 234,
      inquiries: 8,
      verified: true,
      featured: false,
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop&crop=center'
    }
  ]);

  // Mock analytics data
  const analytics = {
    totalUsers: 1247,
    activeListings: 89,
    dealsCompleted: 156,
    monthlyRevenue: 340000,
    userGrowth: 12.5,
    listingGrowth: 8.3,
    dealGrowth: 15.7,
    revenueGrowth: 23.4
  };

  const handleAddTestimonial = () => {
    const id = testimonials.length + 1;
    setTestimonials([...testimonials, { ...newTestimonial, id, rating: 5, dealDate: new Date().toISOString().split('T')[0], status: 'active' }]);
    setNewTestimonial({
      title: '',
      location: '',
      price: '',
      image: '',
      client: '',
      testimonial: '',
      avatar: '',
      type: 'recent_deal'
    });
    setIsEditing(null);
  };

  const handleEditTestimonial = (testimonial: any) => {
    setEditingTestimonial(testimonial);
    setIsEditing('edit');
  };

  const handleUpdateTestimonial = () => {
    if (editingTestimonial) {
      setTestimonials(testimonials.map(t => 
        t.id === editingTestimonial.id ? editingTestimonial : t
      ));
      setEditingTestimonial(null);
      setIsEditing(null);
    }
  };

  const handleDeleteTestimonial = (id: number) => {
    setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const toggleTestimonialStatus = (id: number) => {
    setTestimonials(testimonials.map(t => 
      t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t
    ));
  };

  const handleUserStatusChange = (id: number, status: 'active' | 'inactive') => {
    setUsers(users.map(u => u.id === id ? { ...u, status } : u));
  };

  const handlePropertyStatusChange = (id: number, status: 'active' | 'pending' | 'inactive') => {
    setProperties(properties.map(p => p.id === id ? { ...p, status } : p));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || user.userType === selectedFilter || user.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || property.type === selectedFilter || property.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Users</p>
                <p className="text-3xl text-gray-900 tracking-tight">{analytics.totalUsers.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-2xl">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+{analytics.userGrowth}%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Active Listings</p>
                <p className="text-3xl text-gray-900 tracking-tight">{analytics.activeListings}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-2xl">
                <Building2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+{analytics.listingGrowth}%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Deals Completed</p>
                <p className="text-3xl text-gray-900 tracking-tight">{analytics.dealsCompleted}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-2xl">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+{analytics.dealGrowth}%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Monthly Revenue</p>
                <p className="text-3xl text-gray-900 tracking-tight">₹{(analytics.monthlyRevenue / 1000).toFixed(0)}K</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-2xl">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-500">+{analytics.revenueGrowth}%</span>
              <span className="text-gray-500 ml-1">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'New user registration', user: 'Amit Sharma', time: '2 hours ago', type: 'user' },
              { action: 'Property listing approved', property: '3BHK in Koramangala', time: '4 hours ago', type: 'listing' },
              { action: 'Deal completed', deal: '₹2.5Cr sale in Whitefield', time: '1 day ago', type: 'deal' },
              { action: 'New testimonial added', client: 'Priya Verma', time: '2 days ago', type: 'testimonial' }
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-xl ${
                    activity.type === 'user' ? 'bg-blue-100' :
                    activity.type === 'listing' ? 'bg-green-100' :
                    activity.type === 'deal' ? 'bg-purple-100' : 'bg-orange-100'
                  }`}>
                    {activity.type === 'user' && <Users className="h-4 w-4 text-blue-600" />}
                    {activity.type === 'listing' && <Building2 className="h-4 w-4 text-green-600" />}
                    {activity.type === 'deal' && <FileText className="h-4 w-4 text-purple-600" />}
                    {activity.type === 'testimonial' && <Star className="h-4 w-4 text-orange-600" />}
                  </div>
                  <div>
                    <p className="text-gray-900">{activity.action}</p>
                    <p className="text-gray-600">{activity.user || activity.property || activity.deal || activity.client}</p>
                  </div>
                </div>
                <span className="text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderTestimonialForm = (testimonial?: any) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Property Title</Label>
          <Input
            value={testimonial ? testimonial.title : newTestimonial.title}
            onChange={(e) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, title: e.target.value });
              } else {
                setNewTestimonial({ ...newTestimonial, title: e.target.value });
              }
            }}
            placeholder="e.g., 3BHK Luxury Apartment"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Input
            value={testimonial ? testimonial.location : newTestimonial.location}
            onChange={(e) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, location: e.target.value });
              } else {
                setNewTestimonial({ ...newTestimonial, location: e.target.value });
              }
            }}
            placeholder="e.g., Whitefield, Bangalore"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Price</Label>
          <Input
            value={testimonial ? testimonial.price : newTestimonial.price}
            onChange={(e) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, price: e.target.value });
              } else {
                setNewTestimonial({ ...newTestimonial, price: e.target.value });
              }
            }}
            placeholder="e.g., ₹2.8 Crores"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Client Name</Label>
          <Input
            value={testimonial ? testimonial.client : newTestimonial.client}
            onChange={(e) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, client: e.target.value });
              } else {
                setNewTestimonial({ ...newTestimonial, client: e.target.value });
              }
            }}
            placeholder="e.g., Priya Sharma"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Property Image URL</Label>
          <Input
            value={testimonial ? testimonial.image : newTestimonial.image}
            onChange={(e) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, image: e.target.value });
              } else {
                setNewTestimonial({ ...newTestimonial, image: e.target.value });
              }
            }}
            placeholder="https://example.com/image.jpg"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2">
          <Label>Client Avatar URL</Label>
          <Input
            value={testimonial ? testimonial.avatar : newTestimonial.avatar}
            onChange={(e) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, avatar: e.target.value });
              } else {
                setNewTestimonial({ ...newTestimonial, avatar: e.target.value });
              }
            }}
            placeholder="https://example.com/avatar.jpg"
            className="h-12 rounded-xl"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label>Type</Label>
          <Select
            value={testimonial ? testimonial.type : newTestimonial.type}
            onValueChange={(value) => {
              if (testimonial) {
                setEditingTestimonial({ ...editingTestimonial, type: value });
              } else {
                setNewTestimonial({ ...newTestimonial, type: value });
              }
            }}
          >
            <SelectTrigger className="h-12 rounded-xl">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent_deal">Recent Deal</SelectItem>
              <SelectItem value="recent_listing">Recent Listing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Testimonial</Label>
        <Textarea
          value={testimonial ? testimonial.testimonial : newTestimonial.testimonial}
          onChange={(e) => {
            if (testimonial) {
              setEditingTestimonial({ ...editingTestimonial, testimonial: e.target.value });
            } else {
              setNewTestimonial({ ...newTestimonial, testimonial: e.target.value });
            }
          }}
          placeholder="Client testimonial..."
          rows={4}
          className="rounded-xl"
        />
      </div>

      <div className="flex items-center space-x-4">
        <Button
          onClick={testimonial ? handleUpdateTestimonial : handleAddTestimonial}
          className="bg-black text-white hover:bg-gray-800 rounded-xl px-6 py-2"
        >
          <Save className="h-4 w-4 mr-2" />
          {testimonial ? 'Update Testimonial' : 'Save Testimonial'}
        </Button>
        <Button
          onClick={() => {
            setIsEditing(null);
            setEditingTestimonial(null);
          }}
          variant="outline"
          className="rounded-xl px-6 py-2"
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );

  const renderTestimonialManagement = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 tracking-tight">Testimonial Management</h2>
        <Button
          onClick={() => setIsEditing('new')}
          className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      {/* Add/Edit Testimonial Form */}
      {isEditing && (
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900">
              {isEditing === 'new' ? 'Add New Testimonial' : 'Edit Testimonial'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {renderTestimonialForm(isEditing === 'edit' ? editingTestimonial : null)}
          </CardContent>
        </Card>
      )}

      {/* Testimonials List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.id} className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.title}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="text-gray-900">{testimonial.title}</h3>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-3 w-3" />
                        <span>{testimonial.location}</span>
                      </div>
                      <p className="text-blue-600">{testimonial.price}</p>
                    </div>
                  </div>
                  <Badge variant={testimonial.status === 'active' ? 'default' : 'secondary'}>
                    {testimonial.status}
                  </Badge>
                </div>

                <div className="flex items-center space-x-3">
                  <ImageWithFallback
                    src={testimonial.avatar}
                    alt={testimonial.client}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-gray-900">{testimonial.client}</p>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 text-sm italic">"{testimonial.testimonial}"</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500">{new Date(testimonial.dealDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleTestimonialStatus(testimonial.id)}
                      className="rounded-lg"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      {testimonial.status === 'active' ? 'Hide' : 'Show'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTestimonial(testimonial)}
                      className="rounded-lg"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTestimonial(testimonial.id)}
                      className="rounded-lg"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderUsersManagement = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 tracking-tight">User Management</h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="rounded-xl">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" className="rounded-xl">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48 h-12 rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Users</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
                <SelectItem value="seller">Sellers</SelectItem>
                <SelectItem value="owner">Owners</SelectItem>
                <SelectItem value="renter">Renters</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Properties</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id]);
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <ImageWithFallback
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{user.name}</span>
                          {user.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Mail className="h-3 w-3" />
                          <span>{user.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Phone className="h-3 w-3" />
                          <span>{user.phone}</span>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="capitalize rounded-full">
                      {user.userType}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {new Date(user.joinDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'secondary'} className="rounded-full">
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {user.properties} properties
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleUserStatusChange(user.id, user.status === 'active' ? 'inactive' : 'active')}
                        className="rounded-lg"
                      >
                        {user.status === 'active' ? <UserX className="h-4 w-4" /> : <UserCheck className="h-4 w-4" />}
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-blue-900">
                {selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex items-center space-x-2">
                <Button size="sm" variant="outline" className="rounded-lg">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button size="sm" variant="outline" className="rounded-lg">
                  <UserX className="h-4 w-4 mr-2" />
                  Deactivate
                </Button>
                <Button size="sm" variant="destructive" className="rounded-lg">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );

  const renderPropertiesManagement = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 tracking-tight">Property Management</h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="rounded-xl">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Button variant="outline" className="rounded-xl">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-xl"
                />
              </div>
            </div>
            <Select value={selectedFilter} onValueChange={setSelectedFilter}>
              <SelectTrigger className="w-48 h-12 rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="sale">For Sale</SelectItem>
                <SelectItem value="rent">For Rent</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="border-gray-200 shadow-sm">
            <CardContent className="p-0">
              <div className="relative">
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <Badge variant={property.type === 'sale' ? 'default' : 'secondary'} className="rounded-full">
                    {property.type}
                  </Badge>
                  {property.featured && (
                    <Badge variant="default" className="bg-yellow-500 rounded-full">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant={
                    property.status === 'active' ? 'default' :
                    property.status === 'pending' ? 'secondary' : 'outline'
                  } className="rounded-full">
                    {property.status}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{property.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-blue-600 font-semibold">
                    <IndianRupee className="h-4 w-4" />
                    <span>{property.price}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{property.views}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="h-4 w-4" />
                    <span>{property.inquiries}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(property.postedDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">by {property.owner}</span>
                    {property.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePropertyStatusChange(property.id, 
                        property.status === 'active' ? 'inactive' : 'active'
                      )}
                      className="rounded-lg"
                    >
                      {property.status === 'active' ? <Eye className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="rounded-lg">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderSystemSettings = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 tracking-tight">System Settings</h2>
        <Button className="bg-black text-white hover:bg-gray-800 rounded-xl px-6">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Platform Settings */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Settings className="h-5 w-5 mr-2" />
              Platform Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Platform Name</Label>
              <Input defaultValue="PropertyHub" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Support Email</Label>
              <Input defaultValue="support@propertyhub.com" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Default Currency</Label>
              <Select defaultValue="INR">
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">₹ Indian Rupee</SelectItem>
                  <SelectItem value="USD">$ US Dollar</SelectItem>
                  <SelectItem value="EUR">€ Euro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-600">Enable to disable public access</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* User Management Settings */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>User Registration</Label>
                <p className="text-sm text-gray-600">Allow new user registrations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Verification</Label>
                <p className="text-sm text-gray-600">Require email verification</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto-approve Listings</Label>
                <p className="text-sm text-gray-600">Automatically approve new listings</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Max Properties per User</Label>
              <Input type="number" defaultValue="10" className="h-12 rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Enable 2FA for admin accounts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Password Strength</Label>
                <p className="text-sm text-gray-600">Enforce strong passwords</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Session Timeout (minutes)</Label>
              <Input type="number" defaultValue="30" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Max Login Attempts</Label>
              <Input type="number" defaultValue="5" className="h-12 rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Send email notifications to users</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send SMS for critical updates</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-600">Browser push notifications</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Admin Email</Label>
              <Input defaultValue="admin@propertyhub.com" className="h-12 rounded-xl" />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <IndianRupee className="h-5 w-5 mr-2" />
              Payment Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Commission Rate (%)</Label>
              <Input type="number" defaultValue="2.5" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>Premium Listing Fee</Label>
              <Input type="number" defaultValue="999" className="h-12 rounded-xl" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Gateway</Label>
                <p className="text-sm text-gray-600">Enable online payments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Payment Methods</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span>UPI</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <span>Credit/Debit Cards</span>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span>Net Banking</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-xl text-gray-900 flex items-center">
              <Key className="h-5 w-5 mr-2" />
              API Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>API Access</Label>
                <p className="text-sm text-gray-600">Enable API endpoints</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label>Rate Limit (requests/hour)</Label>
              <Input type="number" defaultValue="1000" className="h-12 rounded-xl" />
            </div>
            <div className="space-y-2">
              <Label>API Key</Label>
              <div className="flex items-center space-x-2">
                <Input
                  type="password"
                  defaultValue="sk-1234567890abcdef"
                  className="h-12 rounded-xl"
                  readOnly
                />
                <Button variant="outline" className="rounded-xl">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Webhook URL</Label>
              <Input placeholder="https://your-app.com/webhook" className="h-12 rounded-xl" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onViewChange('dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2.5 rounded-2xl">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-2xl text-gray-900 tracking-tight">Admin Panel</span>
                  <p className="text-gray-600">PropertyHub Management</p>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 rounded-full">
              Administrator
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-8 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeSection} onValueChange={setActiveSection}>
            <TabsList className="grid w-full grid-cols-5 bg-gray-100 rounded-2xl p-1">
              <TabsTrigger value="dashboard" className="rounded-xl">Dashboard</TabsTrigger>
              <TabsTrigger value="testimonials" className="rounded-xl">Testimonials</TabsTrigger>
              <TabsTrigger value="users" className="rounded-xl">Users</TabsTrigger>
              <TabsTrigger value="properties" className="rounded-xl">Properties</TabsTrigger>
              <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="dashboard">
                {renderDashboard()}
              </TabsContent>

              <TabsContent value="testimonials">
                {renderTestimonialManagement()}
              </TabsContent>

              <TabsContent value="users">
                {renderUsersManagement()}
              </TabsContent>

              <TabsContent value="properties">
                {renderPropertiesManagement()}
              </TabsContent>

              <TabsContent value="settings">
                {renderSystemSettings()}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </div>
  );
}