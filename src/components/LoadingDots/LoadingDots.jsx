import React, { useState, useEffect } from 'react';
import './loadingdots.css'; // Create a CSS file for styling

function LoadingDots() {
  const [dotsCount, setDotsCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsCount((prevCount) => (prevCount % 3) + 1);
    }, 500); // Adjust the interval to control the animation speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-dots">
      {Array.from({ length: dotsCount }).map((_, index) => (
        <div key={index} className="dot" />
      ))}
    </div>
  );
}

export default LoadingDots;
