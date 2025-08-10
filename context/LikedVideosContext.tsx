
import React, { createContext, useContext, useState } from 'react';
import { Video } from './VideoContext';
import { toast } from '../components/ui/use-toast';

interface LikedVideosContextType {
  likedVideos: Video[];
  addToLiked: (video: Video) => void;
  removeFromLiked: (videoId: string) => void;
  isLiked: (videoId: string) => boolean;
}

const LikedVideosContext = createContext<LikedVideosContextType | undefined>(undefined);

export const useLikedVideos = () => {
  const context = useContext(LikedVideosContext);
  if (context === undefined) {
    throw new Error('useLikedVideos must be used within a LikedVideosProvider');
  }
  return context;
};

export const LikedVideosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [likedVideos, setLikedVideos] = useState<Video[]>([]);

  const addToLiked = (video: Video) => {
    if (!isLiked(video.id)) {
      setLikedVideos(prev => [...prev, video]);
      toast({
        title: "Added to Liked Videos",
        description: `"${video.title}" has been liked.`,
      });
    }
  };

  const removeFromLiked = (videoId: string) => {
    setLikedVideos(prev => prev.filter(video => video.id !== videoId));
    toast({
      title: "Removed from Liked Videos",
      description: "Video has been removed from your liked videos.",
    });
  };

  const isLiked = (videoId: string) => {
    return likedVideos.some(video => video.id === videoId);
  };

  const value = {
    likedVideos,
    addToLiked,
    removeFromLiked,
    isLiked,
  };

  return <LikedVideosContext.Provider value={value}>{children}</LikedVideosContext.Provider>;
};
