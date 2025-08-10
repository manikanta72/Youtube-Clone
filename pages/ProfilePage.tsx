
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, Edit, Settings, Shield, Bell } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Profile Header */}
          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src={user.avatar} alt={user.username} />
                    <AvatarFallback className="text-2xl">
                      {user.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors">
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                        {user.username}
                      </h1>
                      <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                      <div className="flex items-center justify-center sm:justify-start space-x-4 mt-2">
                        <Badge variant="secondary">Creator</Badge>
                        <span className="text-sm text-gray-500">Member since 2024</span>
                      </div>
                    </div>
                    <Button className="mt-4 sm:mt-0">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">127</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Subscriptions</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">45</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Playlists</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900 dark:text-gray-100">1.2K</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Liked Videos</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                        <Bell className="h-5 w-5 text-red-600 dark:text-red-400" />
                      </div>
                      <span>Watch Later</span>
                    </CardTitle>
                    <CardDescription>23 videos saved for later</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <Settings className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <span>Liked Videos</span>
                    </CardTitle>
                    <CardDescription>1,247 videos you liked</CardDescription>
                  </CardHeader>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                        <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <span>Privacy</span>
                    </CardTitle>
                    <CardDescription>Manage your privacy settings</CardDescription>
                  </CardHeader>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent YouTube activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="w-16 h-9 bg-gray-300 dark:bg-gray-600 rounded" />
                        <div className="flex-1">
                          <p className="font-medium text-sm">Watched: Sample Video Title</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">2 hours ago</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="playlists">
              <Card>
                <CardHeader>
                  <CardTitle>Your Playlists</CardTitle>
                  <CardDescription>Manage your video playlists</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      No playlists created yet
                    </p>
                    <Button>Create Playlist</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Watch History</CardTitle>
                  <CardDescription>Your YouTube watch history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Your watch history will appear here
                    </p>
                    <Button variant="outline">Clear History</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      General Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Privacy & Security
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="h-4 w-4 mr-2" />
                      Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
