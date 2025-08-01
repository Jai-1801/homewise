import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Settings,
  Edit,
  Camera,
  Phone,
  Mail,
  MapPin,
  Star,
  Eye,
  Heart,
  FileText,
  Calendar,
  CheckCircle,
  LogOut,
  Building2
} from 'lucide-react';
import { UserType, AppState } from '../App';

interface UserProfileProps {
  userType: UserType | null;
  onViewChange: (view: AppState['currentView']) => void;
  onSignOut: () => void;
}

export function UserProfile({ userType, onViewChange, onSignOut }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    location: 'Bangalore, Karnataka',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    marketingEmails: false
  });

  const stats = {
    owner: {
      totalListings: 5,
      activeListings: 3,
      totalViews: 1247,
      totalInquiries: 89,
      rating: 4.8,
      joinedDate: 'January 2023'
    },
    buyer: {
      savedProperties: 15,
      scheduledVisits: 4,
      completedVisits: 12,
      applications: 3,
      rating: 4.6,
      joinedDate: 'March 2023'
    }
  };

  const activities = [
    {
      id: 1,
      type: 'listing',
      title: 'Property listed successfully',
      description: '3BHK Apartment in Koramangala',
      date: '2 days ago',
      status: 'completed'
    },
    {
      id: 2,
      type: 'inquiry',
      title: 'New inquiry received',
      description: 'Someone interested in your villa',
      date: '5 days ago',
      status: 'pending'
    },
    {
      id: 3,
      type: 'visit',
      title: 'Property visit scheduled',
      description: 'Visit on March 15, 2024',
      date: '1 week ago',
      status: 'upcoming'
    }
  ];

  const documents = [
    {
      id: 1,
      name: 'Aadhaar Card',
      status: 'verified',
      uploadedDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'PAN Card',
      status: 'verified',
      uploadedDate: '2024-01-15'
    },
    {
      id: 3,
      name: 'Address Proof',
      status: 'pending',
      uploadedDate: '2024-03-10'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-24">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 py-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
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
                  <span className="text-2xl text-gray-900 tracking-tight">Profile</span>
                  <p className="text-gray-600">Manage your account</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors p-2 hover:bg-gray-100 rounded-full"
              >
                <Edit className="h-5 w-5" />
              </button>
              <button
                onClick={onSignOut}
                className="flex items-center text-red-600 hover:text-red-700 transition-colors p-2 hover:bg-red-50 rounded-full"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8 border-gray-200 shadow-sm">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
              <div className="relative">
                <ImageWithFallback
                  src={profileData.avatar}
                  alt={profileData.name}
                  className="w-32 h-32 rounded-3xl object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-2xl shadow-lg hover:bg-blue-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-4">
                {isEditing ? (
                  <div className="space-y-4">
                    <Input 
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      className="h-12 text-base rounded-xl"
                    />
                    <Input 
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                      className="h-12 text-base rounded-xl"
                    />
                    <Input 
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      className="h-12 text-base rounded-xl"
                    />
                    <Input 
                      value={profileData.location}
                      onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                      className="h-12 text-base rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h2 className="text-3xl text-gray-900 tracking-tight">{profileData.name}</h2>
                    <div className="space-y-2 text-gray-600">
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <Mail className="h-4 w-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-2">
                        <MapPin className="h-4 w-4" />
                        <span>{profileData.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-center md:justify-start space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-gray-900">
                          {userType === 'owner' ? stats.owner.rating : stats.buyer.rating}
                        </span>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        {userType === 'owner' ? 'Property Owner' : 'Verified User'}
                      </Badge>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-100">
                <Button variant="outline" onClick={() => setIsEditing(false)} className="rounded-xl px-6">
                  Cancel
                </Button>
                <Button onClick={() => setIsEditing(false)} className="bg-black text-white hover:bg-gray-800 rounded-xl px-6">
                  Save Changes
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {userType === 'owner' && (
            <>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.totalListings}</div>
                  <div className="text-gray-600">Total Listings</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.totalViews.toLocaleString()}</div>
                  <div className="text-gray-600">Total Views</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.totalInquiries}</div>
                  <div className="text-gray-600">Inquiries</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.owner.activeListings}</div>
                  <div className="text-gray-600">Active</div>
                </CardContent>
              </Card>
            </>
          )}
          {(userType === 'buyer' || userType === 'renter') && (
            <>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.buyer.savedProperties}</div>
                  <div className="text-gray-600">Saved</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.buyer.scheduledVisits}</div>
                  <div className="text-gray-600">Scheduled</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.buyer.completedVisits}</div>
                  <div className="text-gray-600">Completed</div>
                </CardContent>
              </Card>
              <Card className="border-gray-200 shadow-sm">
                <CardContent className="p-6 text-center space-y-2">
                  <div className="text-3xl text-gray-900 tracking-tight">{stats.buyer.applications}</div>
                  <div className="text-gray-600">Applications</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Tabs */}
        <Tabs defaultValue="activity" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 rounded-2xl p-1">
            <TabsTrigger value="activity" className="rounded-xl">Activity</TabsTrigger>
            <TabsTrigger value="documents" className="rounded-xl">Documents</TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl">Settings</TabsTrigger>
            <TabsTrigger value="billing" className="rounded-xl">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="activity">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-2xl bg-gray-50">
                    <div className={`p-3 rounded-2xl ${
                      activity.type === 'listing' ? 'bg-blue-100' :
                      activity.type === 'inquiry' ? 'bg-green-100' :
                      'bg-purple-100'
                    }`}>
                      {activity.type === 'listing' && <FileText className="h-5 w-5 text-blue-600" />}
                      {activity.type === 'inquiry' && <Mail className="h-5 w-5 text-green-600" />}
                      {activity.type === 'visit' && <Calendar className="h-5 w-5 text-purple-600" />}
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-gray-900">{activity.title}</h4>
                      <p className="text-gray-600">{activity.description}</p>
                      <p className="text-gray-500">{activity.date}</p>
                    </div>
                    <Badge variant={
                      activity.status === 'completed' ? 'default' :
                      activity.status === 'pending' ? 'secondary' :
                      'outline'
                    } className="rounded-full">
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Verification Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-100 p-3 rounded-2xl">
                        <FileText className="h-5 w-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-gray-900">{doc.name}</h4>
                        <p className="text-gray-600">
                          Uploaded on {new Date(doc.uploadedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={doc.status === 'verified' ? 'default' : 'secondary'} className="rounded-full">
                        {doc.status === 'verified' ? 'Verified' : 'Pending'}
                      </Badge>
                      {doc.status === 'verified' && (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full h-12 rounded-xl">
                  <FileText className="h-4 w-4 mr-2" />
                  Upload New Document
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-6">
              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Notification Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">Email Alerts</label>
                      <p className="text-gray-600">Get notified about new inquiries</p>
                    </div>
                    <Switch 
                      checked={notifications.emailAlerts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, emailAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">SMS Alerts</label>
                      <p className="text-gray-600">Receive SMS for urgent updates</p>
                    </div>
                    <Switch 
                      checked={notifications.smsAlerts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, smsAlerts: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">Push Notifications</label>
                      <p className="text-gray-600">Browser notifications</p>
                    </div>
                    <Switch 
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, pushNotifications: checked }))}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">Marketing Emails</label>
                      <p className="text-gray-600">Property recommendations and tips</p>
                    </div>
                    <Switch 
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketingEmails: checked }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">Show Phone Number</label>
                      <p className="text-gray-600">Make your phone visible to inquirers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">Show Email</label>
                      <p className="text-gray-600">Make your email visible to inquirers</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-red-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-red-600">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-gray-900">Delete Account</label>
                      <p className="text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" className="rounded-xl">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Billing & Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-blue-900">Free Plan</h4>
                    <Badge className="rounded-full">Active</Badge>
                  </div>
                  <p className="text-blue-700 mb-6">
                    3 property listings • Basic support • Standard features
                  </p>
                  <Button className="w-full h-12 bg-black text-white hover:bg-gray-800 rounded-xl">
                    Upgrade to Premium
                  </Button>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h4 className="text-gray-900 mb-4">Payment Methods</h4>
                  <Button variant="outline" className="w-full h-12 rounded-xl">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}