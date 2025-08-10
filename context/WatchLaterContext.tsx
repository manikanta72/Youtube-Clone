
import React, { createContext, useContext, useState } from 'react';
import { Video } from './VideoContext';
import { toast } from '../components/ui/use-toast';

interface WatchLaterContextType {
  watchLaterVideos: Video[];
  addToWatchLater: (video: Video) => void;
  removeFromWatchLater: (videoId: string) => void;
  isInWatchLater: (videoId: string) => boolean;
}

const WatchLaterContext = createContext<WatchLaterContextType | undefined>(undefined);

export const useWatchLater = () => {
  const context = useContext(WatchLaterContext);
  if (context === undefined) {
    throw new Error('useWatchLater must be used within a WatchLaterProvider');
  }
  return context;
};

export const WatchLaterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [watchLaterVideos, setWatchLaterVideos] = useState<Video[]>([]);

  const addToWatchLater = (video: Video) => {
    if (!isInWatchLater(video.id)) {
      setWatchLaterVideos(prev => [...prev, video]);
      toast({
        title: "Added to Watch Later",
        description: `"${video.title}" has been added to your Watch Later list.`,
      });
    }
  };

  const removeFromWatchLater = (videoId: string) => {
    setWatchLaterVideos(prev => prev.filter(video => video.id !== videoId));
    toast({
      title: "Removed from Watch Later",
      description: "Video has been removed from your Watch Later list.",
    });
  };

  const isInWatchLater = (videoId: string) => {
    return watchLaterVideos.some(video => video.id === videoId);
  };

  const value = {
    watchLaterVideos,
    addToWatchLater,
    removeFromWatchLater,
    isInWatchLater,
  };

  return <WatchLaterContext.Provider value={value}>{children}</WatchLaterContext.Provider>;
};
