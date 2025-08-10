
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Settings as SettingsIcon, User, Shield, Bell, Eye, Globe, Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Settings = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);
  const [autoplay, setAutoplay] = React.useState(true);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const settingsCategories = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Personal info', description: 'Manage your personal information' },
        { label: 'Privacy', description: 'Control your privacy settings' },
        { label: 'Security', description: 'Manage account security' },
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Email notifications', description: 'Control email preferences', toggle: true },
        { label: 'Push notifications', description: 'Mobile and desktop notifications', toggle: true },
      ]
    },
    {
      title: 'Playback',
      icon: Eye,
      items: [
        { label: 'Autoplay', description: 'Automatically play next video', toggle: true },
        { label: 'Quality', description: 'Default video quality', select: true },
        { label: 'Captions', description: 'Default caption settings' },
      ]
    },
    {
      title: 'General',
      icon: Globe,
      items: [
        { label: 'Language', description: 'Choose your language', select: true },
        { label: 'Location', description: 'Your content location' },
        { label: 'Restricted mode', description: 'Filter potentially mature content' },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <SettingsIcon className="w-8 h-8 mr-3 text-gray-700 dark:text-gray-300" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Settings</h1>
          </div>

          <div className="space-y-8">
            {settingsCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <category.icon className="w-6 h-6 mr-3 text-gray-600 dark:text-gray-300" />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {category.title}
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {item.description}
                        </p>
                      </div>
                      
                      <div className="ml-4">
                        {item.toggle && (
                          <Switch
                            checked={item.label === 'Autoplay' ? autoplay : notifications}
                            onCheckedChange={(checked) => {
                              if (item.label === 'Autoplay') {
                                setAutoplay(checked);
                              } else {
                                setNotifications(checked);
                              }
                            }}
                          />
                        )}
                        {item.select && (
                          <Select>
                            <SelectTrigger className="w-40">
                              <SelectValue placeholder={
                                item.label === 'Quality' ? 'Auto' : 
                                item.label === 'Language' ? 'English' : 'Select'
                              } />
                            </SelectTrigger>
                            <SelectContent>
                              {item.label === 'Quality' ? (
                                <>
                                  <SelectItem value="auto">Auto</SelectItem>
                                  <SelectItem value="1080p">1080p</SelectItem>
                                  <SelectItem value="720p">720p</SelectItem>
                                  <SelectItem value="480p">480p</SelectItem>
                                </>
                              ) : (
                                <>
                                  <SelectItem value="en">English</SelectItem>
                                  <SelectItem value="es">Español</SelectItem>
                                  <SelectItem value="fr">Français</SelectItem>
                                  <SelectItem value="de">Deutsch</SelectItem>
                                </>
                              )}
                            </SelectContent>
                          </Select>
                        )}
                        {!item.toggle && !item.select && (
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                            Manage
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;
