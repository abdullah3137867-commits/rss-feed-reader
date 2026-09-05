import React from 'react';
import './FeedItem.css';

function FeedItem({ feed }) {
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const stripHtml = (html) => {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  return (
    <article className="feed-item">
      <div className="feed-item-header">
        <h2 className="feed-item-title">{feed.title}</h2>
        <span className="feed-item-category">{feed.category}</span>
      </div>
      
      <p className="feed-item-date">📅 {formatDate(feed.pubDate)}</p>
      
      <div className="feed-item-description">
        {stripHtml(feed.description).substring(0, 200)}...
      </div>
      
      <a href={feed.link} target="_blank" rel="noopener noreferrer" className="feed-item-link">
        Read Full Post →
      </a>
    </article>
  );
}

export default FeedItem;
