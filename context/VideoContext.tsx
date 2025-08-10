
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  channelName: string;
  channelAvatar: string;
  views: number;
  likes: number;
  dislikes: number;
  uploadDate: string;
  duration: string;
  category: string;
  tags: string[];
  comments: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}

interface VideoContextType {
  videos: Video[];
  featuredVideo: Video | null;
  getVideoById: (id: string) => Video | undefined;
  searchVideos: (query: string) => Video[];
  getVideosByCategory: (category: string) => Video[];
  likeVideo: (videoId: string) => void;
  addComment: (videoId: string, comment: string) => void;
  categories: string[];
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

// Mock video data
const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Amazing Nature Documentary - Wildlife in 4K',
    description: 'Experience the beauty of nature like never before. This stunning documentary showcases wildlife from around the world in breathtaking 4K resolution.',
    thumbnail: '/videos/work2.webp',
    videoUrl: '/videos/1.mp4',
    channelName: 'Nature Explorer',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=nature',
    views: 2400000,
    likes: 95000,
    dislikes: 1200,
    uploadDate: '2024-01-15',
    duration: '12:45',
    category: 'Movies',
    tags: ['nature', 'wildlife', '4k', 'documentary'],
    comments: [
      {
        id: '1',
        username: 'NatureLover',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=naturelover',
        text: 'Absolutely breathtaking footage! The cinematography is incredible.',
        timestamp: '2024-01-20',
        likes: 45
      }
    ]
  },
  {
    id: '2',
    title: 'Telugu Hit Songs 2024 | Latest Tollywood Music',
    description: 'Best Telugu hit songs collection from 2024. Enjoy the latest Tollywood music hits from your favorite artists.',
    thumbnail: 'https://i.ytimg.com/vi/-_7fHKMiMnI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqp-uSw_3cApWHxKaSEGAXF3sIEQ',
    videoUrl: '/videos/2.mp4',
    channelName: 'Telugu Music Hub',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=telugu',
    views: 1800000,
    likes: 125000,
    dislikes: 800,
    uploadDate: '2024-02-01',
    duration: '45:30',
    category: 'Telugu Songs',
    tags: ['telugu', 'songs', '2024', 'tollywood'],
    comments: []
  },
  {
    id: '3',
    title: 'Breaking News: Technology Breakthrough',
    description: 'Latest developments in artificial intelligence and machine learning. Stay updated with the most recent tech news.',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=225&fit=crop&crop=center',
    videoUrl: '/videos/3.mp4',
    channelName: 'Tech News Today',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    views: 890000,
    likes: 34000,
    dislikes: 500,
    uploadDate: '2024-02-10',
    duration: '8:22',
    category: 'News',
    tags: ['technology', 'ai', 'breaking news'],
    comments: []
  },
  {
    id: '4',
    title: 'English Pop Hits 2024 | Best Songs Playlist',
    description: 'The hottest English pop songs of 2024. Perfect playlist for your workout, study, or relaxation time.',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop&crop=center',
    videoUrl: '/videos/4.mp4',
    channelName: 'Pop Music Central',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pop',
    views: 3200000,
    likes: 180000,
    dislikes: 2100,
    uploadDate: '2024-01-28',
    duration: '52:15',
    category: 'English Songs',
    tags: ['english', 'pop', 'hits', '2024'],
    comments: []
  },
  {
    id: '5',
    title: 'Political Analysis: Current Affairs Discussion',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=225&fit=crop&crop=center',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Politics',
    tags: ['politics', 'analysis', 'current affairs'],
    comments: []
  },
  {
    id: '6',
    title: 'English songs hollywood',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th/id/OIP.BjnjYzQBu0MBbaFxaf2dYgHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'English songs',
    tags: ['hollywood', 'analysis', 'songs'],
    comments: []
  },
  {
    id: '7',
    title: 'Black Adam',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th?q=Cover+Photo+Ultra+4K+HD&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
    videoUrl: '/videos/6.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Movies',
    tags: ['politics', 'analysis', 'current affairs'],
    comments: []
  },
  {
    id: '8',
    title: 'Doctors',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th?q=Background+Kesehatan+HD+Cover&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
    videoUrl: '/videos/7.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Health',
    tags: ['Doctor'],
    comments: []
  },
    {
    id: '9',
    title: 'Political Analysis: Current Affairs Discussion',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: '/videos/work-1.png',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Politics',
    tags: ['politics', 'analysis', 'current affairs'],
    comments: []
  },
  {
    id: '10',
    title: 'English songs hollywood',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: '/videos/work-2.png',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'English songs',
    tags: ['hollywood', 'analysis', 'songs'],
    comments: []
  },
  {
    id: '11',
    title: 'coolie',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th/id/OIP.JEeAEUHmv5DHW0CpOiTSQwHaEL?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    videoUrl: '/videos/8.mp4',
    channelName: 'Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Songs',
    tags: ['tollywood','songs'],
    comments: []
  },
  {
    id: '12',
    title: 'Doctors',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: '/videos/work-2.png',
    videoUrl: '/videos/9.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Health',
    tags: ['Doctor'],
    comments: []
  },
  {
    id: '13',
    title: 'Telugu Hit Songs 2024 | Latest Tollywood Music',
    description: 'Best Telugu hit songs collection from 2024. Enjoy the latest Tollywood music hits from your favorite artists.',
    thumbnail: 'https://i.ytimg.com/vi/-_7fHKMiMnI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCqp-uSw_3cApWHxKaSEGAXF3sIEQ',
    videoUrl: '/videos/2.mp4',
    channelName: 'Telugu Music Hub',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=telugu',
    views: 1800000,
    likes: 125000,
    dislikes: 800,
    uploadDate: '2024-02-01',
    duration: '45:30',
    category: 'Telugu Songs',
    tags: ['telugu', 'songs', '2024', 'tollywood'],
    comments: []
  },
  {
    id: '14',
    title: 'Breaking News: Technology Breakthrough',
    description: 'Latest developments in artificial intelligence and machine learning. Stay updated with the most recent tech news.',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=225&fit=crop&crop=center',
    videoUrl: '/videos/3.mp4',
    channelName: 'Tech News Today',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tech',
    views: 890000,
    likes: 34000,
    dislikes: 500,
    uploadDate: '2024-02-10',
    duration: '8:22',
    category: 'News',
    tags: ['technology', 'ai', 'breaking news'],
    comments: []
  },
  {
    id: '15',
    title: 'English Pop Hits 2024 | Best Songs Playlist',
    description: 'The hottest English pop songs of 2024. Perfect playlist for your workout, study, or relaxation time.',
    thumbnail: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=225&fit=crop&crop=center',
    videoUrl: '/videos/4.mp4',
    channelName: 'Pop Music Central',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=pop',
    views: 3200000,
    likes: 180000,
    dislikes: 2100,
    uploadDate: '2024-01-28',
    duration: '52:15',
    category: 'English Songs',
    tags: ['english', 'pop', 'hits', '2024'],
    comments: []
  },
  {
    id: '16',
    title: 'Political Analysis: Current Affairs Discussion',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=225&fit=crop&crop=center',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Politics',
    tags: ['politics', 'analysis', 'current affairs'],
    comments: []
  },
  {
    id: '17',
    title: 'English songs hollywood',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th/id/OIP.BjnjYzQBu0MBbaFxaf2dYgHaEK?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'English songs',
    tags: ['hollywood', 'analysis', 'songs'],
    comments: []
  },
  {
    id: '18',
    title: 'Black Adam',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th?q=Cover+Photo+Ultra+4K+HD&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
    videoUrl: '/videos/6.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Movies',
    tags: ['politics', 'analysis', 'current affairs'],
    comments: []
  },
  {
    id: '19',
    title: 'Doctors',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th?q=Background+Kesehatan+HD+Cover&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247',
    videoUrl: '/videos/7.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Health',
    tags: ['Doctor'],
    comments: []
  },
    {
    id: '20',
    title: 'Political Analysis: Current Affairs Discussion',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: '/videos/work-1.png',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Politics',
    tags: ['politics', 'analysis', 'current affairs'],
    comments: []
  },
  {
    id: '21',
    title: 'English songs hollywood',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: '/videos/work-2.png',
    videoUrl: '/videos/5.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'English songs',
    tags: ['hollywood', 'analysis', 'songs'],
    comments: []
  },
  {
    id: '22',
    title: 'coolie',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: 'https://th.bing.com/th/id/OIP.JEeAEUHmv5DHW0CpOiTSQwHaEL?w=286&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3',
    videoUrl: '/videos/8.mp4',
    channelName: 'Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Songs',
    tags: ['tollywood','songs'],
    comments: []
  },
  {
    id: '23',
    title: 'Doctors',
    description: 'In-depth analysis of current political developments. Expert opinions and balanced reporting on recent events.',
    thumbnail: '/videos/work-2.png',
    videoUrl: '/videos/9.mp4',
    channelName: 'Political Insights',
    channelAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=politics',
    views: 650000,
    likes: 28000,
    dislikes: 1500,
    uploadDate: '2024-02-05',
    duration: '25:18',
    category: 'Health',
    tags: ['Doctor'],
    comments: []
  },
  

];

// Add more videos to reach 25 total
const generateMoreVideos = (): Video[] => {
  const categories = ['Movies', 'Telugu Songs', 'English Songs', 'News', 'Politics', 'Accidents'];
  const moreVideos: Video[] = [];
  
  for (let i = 6; i <= 25; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    moreVideos.push({
      id: i.toString(),
      title: `Sample Video ${i} - ${category} Content`,
      description: `This is a sample video for ${category} category. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
      thumbnail: `https://images.unsplash.com/photo-${1441974231531 + i}?w=400&h=225&fit=crop&crop=center`,
      videoUrl: 'https://sample-videos.com/zip/10/mp4/mp4-SampleVideo_1280x720_1mb.mp4',
      channelName: `Channel ${i}`,
      channelAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=channel${i}`,
      views: Math.floor(Math.random() * 5000000) + 100000,
      likes: Math.floor(Math.random() * 200000) + 5000,
      dislikes: Math.floor(Math.random() * 5000) + 100,
      uploadDate: `2024-0${Math.floor(Math.random() * 2) + 1}-${Math.floor(Math.random() * 28) + 1}`,
      duration: `${Math.floor(Math.random() * 30) + 5}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
      category,
      tags: [category.toLowerCase(), 'sample', 'video'],
      comments: []
    });
  }
  
  return moreVideos;
};

const allVideos = [...mockVideos, ...generateMoreVideos()];

export const VideoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [videos] = useState<Video[]>(allVideos);
  const [featuredVideo] = useState<Video | null>(allVideos[0]);

  const getVideoById = (id: string): Video | undefined => {
    return videos.find(video => video.id === id);
  };

  const searchVideos = (query: string): Video[] => {
    const lowercaseQuery = query.toLowerCase();
    return videos.filter(video => 
      video.title.toLowerCase().includes(lowercaseQuery) ||
      video.description.toLowerCase().includes(lowercaseQuery) ||
      video.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      video.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  const getVideosByCategory = (category: string): Video[] => {
    if (category === 'All') return videos;
    return videos.filter(video => video.category === category);
  };

  const likeVideo = (videoId: string) => {
    // In a real app, this would update the backend
    console.log(`Liked video ${videoId}`);
  };

  const addComment = (videoId: string, comment: string) => {
    // In a real app, this would update the backend
    console.log(`Added comment to video ${videoId}: ${comment}`);
  };

  const categories = ['All', 'Movies', 'Telugu Songs', 'English Songs', 'News', 'Politics', 'Accidents'];

  const value = {
    videos,
    featuredVideo,
    getVideoById,
    searchVideos,
    getVideosByCategory,
    likeVideo,
    addComment,
    categories
  };

  return <VideoContext.Provider value={value}>{children}</VideoContext.Provider>;
};
