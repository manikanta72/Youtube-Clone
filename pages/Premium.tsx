
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import { Crown, Check, Download, PlayCircle, Shield, Music } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Premium = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const plans = [
    {
      name: 'Monthly',
      price: '$11.99',
      duration: 'per month',
      savings: null,
      originalPrice: null,
    },
    {
      name: '3 Months',
      price: '$29.99',
      duration: 'for 3 months',
      savings: '16%',
      originalPrice: '$35.97',
    },
    {
      name: '6 Months',
      price: '$56.99',
      duration: 'for 6 months',
      savings: '20%',
      originalPrice: '$71.94',
    },
    {
      name: 'Annual',
      price: '$99.99',
      duration: 'per year',
      savings: '30%',
      originalPrice: '$143.88',
    },
  ];

  const features = [
    { icon: Shield, text: 'Ad-free videos' },
    { icon: Download, text: 'Download videos to watch offline' },
    { icon: PlayCircle, text: 'Background play' },
    { icon: Music, text: 'Access to YouTube Music Premium' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="p-6 max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Crown className="w-12 h-12 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
                YouTube Premium
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Enjoy an enhanced YouTube experience with ad-free videos, background play, downloads, and more
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
                <div className="bg-red-100 dark:bg-red-900/20 p-3 rounded-full">
                  <feature.icon className="w-6 h-6 text-red-600" />
                </div>
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border-2 ${
                plan.name === 'Annual' ? 'border-yellow-400' : 'border-gray-200 dark:border-gray-700'
              } relative`}>
                {plan.savings && (
                  <Badge className="absolute -top-2 left-4 bg-red-600 text-white">
                    Save {plan.savings}
                  </Badge>
                )}
                
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {plan.name}
                  </h3>
                  
                  {plan.originalPrice && (
                    <p className="text-sm text-gray-500 line-through">
                      {plan.originalPrice}
                    </p>
                  )}
                  
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                      {plan.price}
                    </span>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {plan.duration}
                    </p>
                  </div>
                  
                  <Button className={`w-full ${
                    plan.name === 'Annual' 
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                      : 'youtube-red text-white hover:bg-red-700'
                  }`}>
                    {plan.name === 'Annual' ? 'Most Popular' : 'Get Premium'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              All plans include a 1-month free trial. Cancel anytime.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <span className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                No commitment
              </span>
              <span className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                Cancel anytime
              </span>
              <span className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                Works on all devices
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Premium;
