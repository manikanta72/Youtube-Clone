import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, Mic, MicOff, Bell, User, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useVideo } from '../context/VideoContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { isAuthenticated, user, logout } = useAuth();
  const { videos, searchVideos } = useVideo();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filteredSuggestions = videos
        .filter(video => 
          video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.channelName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          video.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, 6)
        .map(video => video.title);
      
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, videos]);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsRecording(false);
        // Automatically search after voice input
        setTimeout(() => handleSearch(transcript), 100);
      };

      recognitionRef.current.onerror = () => {
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
  }, []);

  const handleSearch = (query: string = searchQuery) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleVoiceSearch = () => {
    if (recognitionRef.current && !isRecording) {
      setIsRecording(true);
      recognitionRef.current.start();
    } else if (isRecording) {
      setIsRecording(false);
      recognitionRef.current?.stop();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Get search query from URL params if on search page
  useEffect(() => {
    if (location.pathname === '/search') {
      const urlParams = new URLSearchParams(location.search);
      const query = urlParams.get('q');
      if (query && query !== searchQuery) {
        setSearchQuery(query);
      }
    }
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 z-50 h-16">
      <div className="flex items-center justify-between px-4 h-full">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
          >
            <Menu className="h-6 w-6" />
          </Button>
          
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer">
            <div className="flex items-center">
              <svg viewBox="0 0 90 20" className="h-5 w-20">
                <svg viewBox="0 0 90 20" preserveAspectRatio="xMidYMid meet">
                  <g>
                    <path d="M27.9727 3.12324C27.6435 1.89323 26.6768 0.926623 25.4468 0.597366C23.2197 2.24288e-07 14.285 0 14.285 0C14.285 0 5.35042 2.24288e-07 3.12323 0.597366C1.89323 0.926623 0.926623 1.89323 0.597366 3.12324C2.24288e-07 5.35042 0 10 0 10C0 10 2.24288e-07 14.6496 0.597366 16.8768C0.926623 18.1068 1.89323 19.0734 3.12323 19.4026C5.35042 20 14.285 20 14.285 20C14.285 20 23.2197 20 25.4468 19.4026C26.6768 19.0734 27.6435 18.1068 27.9727 16.8768C28.5701 14.6496 28.5701 10 28.5701 10C28.5701 10 28.5677 5.35042 27.9727 3.12324Z" fill="#FF0000"/>
                    <path d="M11.4253 14.2854L18.8477 10.0004L11.4253 5.71533V14.2854Z" fill="white"/>
                  </g>
                  <g>
                    <g>
                      <path fillRule="evenodd" clipRule="evenodd" d="M35.7774 8.33333C35.7774 7.84512 35.8029 7.46667 35.8539 7.20001H35.8774L36.0774 5.46667H37.2129V6.84512C37.5516 6.09512 38.3871 5.73334 39.2484 5.73334C40.8516 5.73334 41.7387 6.84512 41.7387 8.64512V12.8H40.4516V8.86667C40.4516 7.73334 40.0387 7.20001 39.1 7.20001C38.1871 7.20001 37.2129 7.64512 37.2129 8.91334V12.8H35.9258L35.7774 8.33333Z" fill="black"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M46.5 6.53333L48.4 11.7333H48.5333L50.4333 6.53333H51.8667L49.1 13.6H47.8667L45.1 6.53333H46.5Z" fill="black"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M53.6 8.8C53.6 6.8 55.0667 5.6 56.8 5.6C58.5333 5.6 60 6.8 60 8.8V12.8H58.7333V8.93333C58.7333 7.86667 58.0667 7.2 57.0667 7.2C56.0667 7.2 55.4 7.86667 55.4 8.93333V12.8H54.1333L53.6 8.8Z" fill="black"/>
                    </g>
                  </g>
                </svg>
              </svg>
            </div>
          </Link>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-2xl mx-4 relative">
          <div className="flex items-center">
            <div className="relative flex-1">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => searchQuery && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
              
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-lg mt-1 z-50 max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-gray-900 dark:text-gray-100 transition-colors"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <div className="flex items-center">
                        <Search className="w-4 h-4 mr-3 text-gray-400" />
                        {suggestion}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <Button
              onClick={() => handleSearch()}
              className="px-6 py-2 bg-gray-100 dark:bg-gray-700 border border-l-0 border-gray-300 dark:border-gray-600 rounded-r-full hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition-colors"
              variant="ghost"
            >
              <Search className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={handleVoiceSearch}
              className={`ml-2 w-10 h-10 rounded-full cursor-pointer transition-all ${
                isRecording 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300'
              }`}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="icon" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <Plus className="h-6 w-6" />
              </Button>
              
              <Button variant="ghost" size="icon" className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                <Bell className="h-6 w-6" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" alt={user?.email} />
                      <AvatarFallback>
                        <User className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{user?.email}</p>
                      <p className="text-xs text-muted-foreground">Manage your Google Account</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Your channel</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/premium" className="cursor-pointer">YouTube Premium</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  Sign in
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
