
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Video } from '../context/VideoContext';
import { useWatchLater } from '../context/WatchLaterContext';
import { useLikedVideos } from '../context/LikedVideosContext';
import { formatDistanceToNow } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, MoreVertical, ThumbsUp, ThumbsDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface VideoCardProps {
  video: Video;
  className?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToWatchLater, isInWatchLater } = useWatchLater();
  const { addToLiked, removeFromLiked, isLiked } = useLikedVideos();

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const timeAgo = formatDistanceToNow(new Date(video.uploadDate), { addSuffix: true });

  const handleWatchLater = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToWatchLater(video);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked(video.id)) {
      removeFromLiked(video.id);
    } else {
      addToLiked(video);
    }
  };

  return (
    <div 
      className={`group cursor-pointer transition-all duration-300 hover:scale-105 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/video/${video.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Duration overlay */}
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
            {video.duration}
          </div>
          
          {/* Category badge */}
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="text-xs bg-white/90 text-black hover:bg-white cursor-pointer">
              {video.category}
            </Badge>
          </div>

          {/* Action buttons - Shows on hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-black/10 flex items-end justify-between p-3">
              <div className="flex space-x-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleLike}
                  className={`h-8 px-3 transition-colors cursor-pointer ${
                    isLiked(video.id) 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-white/90 text-black hover:bg-white'
                  }`}
                >
                  <ThumbsUp className="h-3 w-3 mr-1" />
                  {isLiked(video.id) ? 'Liked' : 'Like'}
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleWatchLater}
                  className={`h-8 px-3 transition-colors cursor-pointer ${
                    isInWatchLater(video.id) 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-white/90 text-black hover:bg-white'
                  }`}
                >
                  <Clock className="h-3 w-3 mr-1" />
                  {isInWatchLater(video.id) ? 'Added' : 'Save'}
                </Button>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-black h-8 w-8 p-0 cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleWatchLater} className="cursor-pointer">
                    <Clock className="mr-2 h-4 w-4" />
                    {isInWatchLater(video.id) ? 'Added to Watch Later' : 'Save to Watch Later'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLike} className="cursor-pointer">
                    <ThumbsUp className="mr-2 h-4 w-4" />
                    {isLiked(video.id) ? 'Unlike' : 'Like'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="flex mt-3 space-x-3">
          {/* Channel Avatar */}
          <Avatar className="h-9 w-9 flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={video.channelAvatar} alt={video.channelName} />
            <AvatarFallback>
              {video.channelName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {/* Video Details */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-snug mb-1 line-clamp-2 group-hover:text-red-600 transition-colors cursor-pointer">
              {video.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-1 hover:text-gray-900 dark:hover:text-gray-200 transition-colors cursor-pointer">
              {video.channelName}
            </p>
            
            <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm space-x-1">
              <span>{formatViews(video.views)} views</span>
              <span>•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
