
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, Share, Download, MoreHorizontal, Bell } from 'lucide-react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../context/VideoContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';

const VideoPage = () => {
  const { id } = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { getVideoById, videos, likeVideo, addComment } = useVideo();
  const { isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const video = id ? getVideoById(id) : null;
  const relatedVideos = videos.filter(v => v.id !== id).slice(0, 12);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const handleLike = () => {
    if (video) {
      likeVideo(video.id);
      setIsLiked(!isLiked);
    }
  };

  const handleComment = () => {
    if (video && newComment.trim()) {
      addComment(video.id, newComment);
      setNewComment('');
    }
  };

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header onMenuClick={handleMenuClick} />
        <div className="pt-16 flex items-center justify-center h-96">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Video Not Found</h1>
            <Link to="/" className="text-red-600 hover:text-red-700">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="max-w-7xl mx-auto p-4">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Main Video Section */}
            <div className="xl:col-span-2 space-y-4">
              {/* Video Player */}
              <div className="bg-black rounded-xl overflow-hidden aspect-video">
                <video
                  className="w-full h-full"
                  controls
                  poster={video.thumbnail}
                  preload="metadata"
                >
                  <source src={video.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              {/* Video Info */}
              <div className="space-y-4">
                <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {video.title}
                  </h1>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                      <span>{formatViews(video.views)} views</span>
                      <span>•</span>
                      <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                      <Badge variant="outline">{video.category}</Badge>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant={isLiked ? "default" : "outline"}
                        size="sm"
                        onClick={handleLike}
                        className={isLiked ? "youtube-red text-white" : ""}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        {formatViews(video.likes)}
                      </Button>
                      <Button variant="outline" size="sm">
                        <ThumbsDown className="h-4 w-4 mr-2" />
                        {formatViews(video.dislikes)}
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Channel Info */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={video.channelAvatar} alt={video.channelName} />
                      <AvatarFallback>
                        {video.channelName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {video.channelName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        1.2M subscribers
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={handleSubscribe}
                    className={isSubscribed ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "youtube-red text-white"}
                  >
                    {isSubscribed ? (
                      <>
                        <Bell className="h-4 w-4 mr-2" />
                        Subscribed
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </Button>
                </div>

                {/* Description */}
                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {video.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                    <p className={`text-gray-700 dark:text-gray-300 ${
                      showFullDescription ? '' : 'line-clamp-3'
                    }`}>
                      {video.description}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFullDescription(!showFullDescription)}
                      className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    >
                      {showFullDescription ? 'Show less' : 'Show more'}
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Comments Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Comments ({video.comments.length})
                  </h3>
                  
                  {isAuthenticated && (
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="resize-none"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => setNewComment('')}>
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleComment}
                          disabled={!newComment.trim()}
                          className="youtube-red text-white"
                        >
                          Comment
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Comments List */}
                  <div className="space-y-4">
                    {video.comments.map((comment) => (
                      <div key={comment.id} className="flex space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={comment.avatar} alt={comment.username} />
                          <AvatarFallback>
                            {comment.username.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-sm text-gray-900 dark:text-gray-100">
                              {comment.username}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {comment.text}
                          </p>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {comment.likes}
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - Related Videos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Up next
              </h3>
              <div className="space-y-3">
                {relatedVideos.map((relatedVideo) => (
                  <Link
                    key={relatedVideo.id}
                    to={`/video/${relatedVideo.id}`}
                    className="flex space-x-3 group hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
                  >
                    <div className="relative w-40 aspect-video bg-gray-200 dark:bg-gray-700 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={relatedVideo.thumbnail}
                        alt={relatedVideo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                      <div className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 rounded">
                        {relatedVideo.duration}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-red-600 transition-colors text-gray-900 dark:text-gray-100">
                        {relatedVideo.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {relatedVideo.channelName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {formatViews(relatedVideo.views)} views
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VideoPage;
