
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { VideoProvider } from './context/VideoContext';
import { WatchLaterProvider } from './context/WatchLaterContext';
import { LikedVideosProvider } from './context/LikedVideosContext';
import { Toaster } from './components/ui/toaster';
import YouTubeLoader from './components/YouTubeLoader';
import Index from './pages/Index';
import VideoPage from './pages/VideoPage';
import SearchResults from './pages/SearchResults';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProfilePage from './pages/ProfilePage';
import WatchLater from './pages/WatchLater';
import LikedVideos from './pages/LikedVideos';
import Premium from './pages/Premium';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';

function App() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('youtube-visited');
    
    if (!hasVisited) {
      // First visit - show loader
      localStorage.setItem('youtube-visited', 'true');
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    } else {
      // Not first visit - skip loader
      setShowLoader(false);
    }
  }, []);

  if (showLoader) {
    return <YouTubeLoader />;
  }

  return (
    <AuthProvider>
      <VideoProvider>
        <WatchLaterProvider>
          <LikedVideosProvider>
            <Router>
              <div className="App">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/video/:id" element={<VideoPage />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/watch-later" element={<WatchLater />} />
                  <Route path="/liked" element={<LikedVideos />} />
                  <Route path="/premium" element={<Premium />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/trending" element={<Navigate to="/" replace />} />
                  <Route path="/subscriptions" element={<Navigate to="/" replace />} />
                  <Route path="/history" element={<Navigate to="/" replace />} />
                  <Route path="/channel" element={<Navigate to="/profile" replace />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
              </div>
            </Router>
          </LikedVideosProvider>
        </WatchLaterProvider>
      </VideoProvider>
    </AuthProvider>
  );
}

export default App;
