import React, { useState } from 'react';
import './Carousel.css'; 

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <button onClick={handlePrev}>&lt;</button>
      <div className="carousel-content">
        <img src={items[currentIndex]} alt={`Slide ${currentIndex}`} />
      </div>
      <button onClick={handleNext}>&gt;</button>
    </div>
  );
};

export default Carousel;

