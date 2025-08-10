
import React from 'react';
import { Home, TrendingUp, PlaySquare, Clock, ThumbsUp, User, Settings, History, Crown, Music, Film, Newspaper, Gamepad2, Trophy } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWatchLater } from '../context/WatchLaterContext';
import { useLikedVideos } from '../context/LikedVideosContext';
import { cn } from '../lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { watchLaterVideos } = useWatchLater();
  const { likedVideos } = useLikedVideos();

  const mainMenuItems = [
    { icon: Home, label: 'Home', path: '/', id: 'home' },
    { icon: TrendingUp, label: 'Trending', path: '/trending', id: 'trending' },
    { icon: PlaySquare, label: 'Subscriptions', path: '/subscriptions', id: 'subscriptions' },
  ];

  const libraryItems = [
    { icon: History, label: 'History', path: '/history', id: 'history' },
    { icon: Clock, label: `Watch Later${watchLaterVideos.length > 0 ? ` (${watchLaterVideos.length})` : ''}`, path: '/watch-later', id: 'watch-later' },
    { icon: ThumbsUp, label: `Liked Videos${likedVideos.length > 0 ? ` (${likedVideos.length})` : ''}`, path: '/liked', id: 'liked' },
    { icon: User, label: 'Your Channel', path: '/channel', id: 'channel' },
  ];

  const exploreItems = [
    { icon: Film, label: 'Movies', path: '/?category=Movies', id: 'movies' },
    { icon: Music, label: 'Music', path: '/?category=Music', id: 'music' },
    { icon: Newspaper, label: 'News', path: '/?category=News', id: 'news' },
    { icon: Gamepad2, label: 'Gaming', path: '/?category=Gaming', id: 'gaming' },
    { icon: Trophy, label: 'Sports', path: '/?category=Sports', id: 'sports' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 transition-all duration-300 overflow-y-auto",
          isOpen ? "w-64" : "w-20 lg:w-20",
          "lg:translate-x-0"
        )}
      >
        <div className="p-2">
          {/* Main Menu */}
          <div className="space-y-1 mb-4">
            {mainMenuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className={cn(
                  "flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group",
                  isActive(item.path) && "bg-red-50 text-red-600 font-medium dark:bg-red-900/20"
                )}
                title={item.label}
              >
                <item.icon className="h-6 w-6 min-w-[24px]" />
                {isOpen && (
                  <span className="ml-6 text-sm">{item.label}</span>
                )}
                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3" />

          {/* Library Section */}
          {isAuthenticated && (
            <div className="space-y-1 mb-4">
              {isOpen && (
                <div className="px-3 py-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    Library
                  </h3>
                </div>
              )}
              {libraryItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  onClick={() => window.innerWidth < 1024 && onClose()}
                  className={cn(
                    "flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group",
                    isActive(item.path) && "bg-red-50 text-red-600 font-medium dark:bg-red-900/20"
                  )}
                  title={item.label}
                >
                  <item.icon className="h-6 w-6 min-w-[24px]" />
                  {isOpen && (
                    <span className="ml-6 text-sm">{item.label}</span>
                  )}
                  {!isOpen && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label.split(' (')[0]}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          )}

          {/* Premium Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3" />
          <div className="space-y-1 mb-4">
            <Link
              to="/premium"
              onClick={() => window.innerWidth < 1024 && onClose()}
              className="flex items-center p-3 rounded-lg hover:bg-yellow-50 dark:hover:bg-yellow-900/20 transition-colors cursor-pointer group"
              title="YouTube Premium"
            >
              <Crown className="h-6 w-6 min-w-[24px] text-yellow-600" />
              {isOpen && (
                <span className="ml-6 text-sm text-yellow-600 font-medium">YouTube Premium</span>
              )}
              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  YouTube Premium
                </span>
              )}
            </Link>
          </div>

          {/* Explore Categories */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3" />
          <div className="space-y-1 mb-4">
            {isOpen && (
              <div className="px-3 py-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  Explore
                </h3>
              </div>
            )}
            
            {exploreItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => window.innerWidth < 1024 && onClose()}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
                title={item.label}
              >
                <item.icon className="h-6 w-6 min-w-[24px]" />
                {isOpen && (
                  <span className="ml-6 text-sm">{item.label}</span>
                )}
                {!isOpen && (
                  <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                    {item.label}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 dark:border-gray-700 my-3" />
          <div className="px-1 py-2">
            <Link
              to="/settings"
              className="flex items-center p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer group"
              title="Settings"
              onClick={() => window.innerWidth < 1024 && onClose()}
            >
              <Settings className="h-6 w-6 min-w-[24px]" />
              {isOpen && (
                <span className="ml-6 text-sm">Settings</span>
              )}
              {!isOpen && (
                <span className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                  Settings
                </span>
              )}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
