
import React from 'react';
import { Crown, Download, PlayCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';

const PremiumSection = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8 border border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              YouTube Premium
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Ad-free videos, background play, and downloads
            </p>
          </div>
        </div>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-medium px-6">
          Try Free
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="flex items-center space-x-3">
          <Shield className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">No ads</span>
        </div>
        <div className="flex items-center space-x-3">
          <Download className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Download videos</span>
        </div>
        <div className="flex items-center space-x-3">
          <PlayCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Background play</span>
        </div>
      </div>
    </div>
  );
};

export default PremiumSection;
