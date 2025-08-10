
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import VideoCard from '../components/VideoCard';
import { useVideo } from '../context/VideoContext';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const SearchResults = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { searchVideos, categories } = useVideo();
  const [results, setResults] = useState(searchVideos(query));
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    setResults(searchVideos(query));
  }, [query, searchVideos]);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const filteredResults = selectedFilter === 'All' 
    ? results 
    : results.filter(video => video.category === selectedFilter);

  const availableCategories = ['All', ...Array.from(new Set(results.map(video => video.category)))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuClick={handleMenuClick} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className={`pt-16 transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'
      }`}>
        <div className="p-6">
          {/* Search Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Search results for "{query}"
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {filteredResults.length} results found
            </p>
          </div>

          {/* Filter Pills */}
          <div className="mb-6">
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {availableCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedFilter === category ? "default" : "secondary"}
                  size="sm"
                  onClick={() => setSelectedFilter(category)}
                  className={`whitespace-nowrap transition-all duration-200 ${
                    selectedFilter === category 
                      ? 'youtube-red text-white shadow-md' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category}
                  <Badge variant="outline" className="ml-2 text-xs">
                    {category === 'All' ? results.length : results.filter(v => v.category === category).length}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filteredResults.length > 0 ? (
            <>
              {/* List View for Search Results */}
              <div className="space-y-4 mb-8">
                {filteredResults.slice(0, 3).map((video) => (
                  <div key={video.id} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-full sm:w-80 aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>{video.views.toLocaleString()} views</span>
                        <span>•</span>
                        <span>{new Date(video.uploadDate).toLocaleDateString()}</span>
                        <Badge variant="outline" className="text-xs">
                          {video.category}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <img
                          src={video.channelAvatar}
                          alt={video.channelName}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {video.channelName}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {video.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Grid View for Remaining Results */}
              {filteredResults.length > 3 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      More results
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {filteredResults.slice(3).map((video) => (
                      <VideoCard key={video.id} video={video} />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            /* No Results */
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No results found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try searching with different keywords or check your spelling.
              </p>
              <Button variant="outline" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchResults;
