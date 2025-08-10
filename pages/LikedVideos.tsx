
import React from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { useLikedVideos } from '../context/LikedVideosContext';
import { ThumbsUp } from 'lucide-react';

const LikedVideos = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { likedVideos } = useLikedVideos();

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="p-6">
          <div className="flex items-center mb-6">
            <ThumbsUp className="w-8 h-8 mr-3 text-gray-700 dark:text-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Liked Videos</h1>
          </div>
          
          {likedVideos.length === 0 ? (
            <div className="text-center py-12">
              <ThumbsUp className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                No liked videos yet
              </h2>
              <p className="text-gray-500 dark:text-gray-500">
                Like videos to see them here
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {likedVideos.map((video) => (
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default LikedVideos;
