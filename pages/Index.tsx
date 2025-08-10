
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import PremiumSection from '../components/PremiumSection';
import { useVideo } from '../context/VideoContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { videos, getVideosByCategory, categories } = useVideo();
  const [filteredVideos, setFilteredVideos] = useState(videos);

  useEffect(() => {
    setFilteredVideos(getVideosByCategory(selectedCategory));
  }, [selectedCategory, getVideosByCategory, videos]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="p-4">
          {/* Category Filter Pills */}
          <div className="mb-4">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  size="sm"
                  onClick={() => handleCategoryChange(category)}
                  className={`whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === category 
                      ? 'bg-red-600 text-white shadow-md hover:bg-red-700' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Premium Section - Only show on 'All' category */}
          {selectedCategory === 'All' && <PremiumSection />}

          {/* Videos Grid */}
          {filteredVideos.length === 0 ? (
            <div className="text-center py-8">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400 mb-2">
                No videos found in this category
              </h3>
              <p className="text-gray-400 dark:text-gray-500">
                Try selecting a different category or check back later
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 fade-in">
              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {filteredVideos.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" size="lg" className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors">
                Load More Videos
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
