import React, { useState, useEffect } from 'react';
import './App.css';
import FeedList from './components/FeedList';

function App() {
  const [feeds, setFeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      setLoading(true);
      const url = 'https://api.allorigins.win/raw?url=http://tedbundyjr.github.io/feed.xml';
      const response = await fetch(url);
      const text = await response.text();
      
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(text, 'text/xml');
      
      const items = xmlDoc.querySelectorAll('item');
      const feedItems = Array.from(items).map(item => ({
        title: item.querySelector('title')?.textContent || 'No Title',
        description: item.querySelector('description')?.textContent || 'No Description',
        link: item.querySelector('link')?.textContent || '#',
        pubDate: item.querySelector('pubDate')?.textContent || 'No Date',
        category: item.querySelector('category')?.textContent || 'General'
      }));
      
      setFeeds(feedItems);
      setError(null);
    } catch (err) {
      setError('Failed to load RSS feed.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>📰 RSS Feed Reader</h1>
        <p>Haris Subandie's Blog Posts</p>
      </header>

      {loading && <div className="loading">Loading feed...</div>}
      {error && <div className="error">❌ {error}</div>}
      {!loading && !error && <FeedList feeds={feeds} />}
      
      <button className="refresh-btn" onClick={fetchFeed} disabled={loading}>
        🔄 Refresh Feed
      </button>
    </div>
  );
}

export default App;
