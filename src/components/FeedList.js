import React from 'react';
import FeedItem from './FeedItem';
import './FeedList.css';

function FeedList({ feeds }) {
  if (feeds.length === 0) {
    return <div className="no-feeds">No feeds found.</div>;
  }

  return (
    <div className="feed-list">
      {feeds.map((feed, index) => (
        <FeedItem key={index} feed={feed} />
      ))}
    </div>
  );
}

export default FeedList;
