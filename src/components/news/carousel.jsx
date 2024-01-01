import React, { useState } from "react";
import "./carousel.css";
const news1 =
  "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/6c773c35-62c7-4f39-b68e-896354c8e6f0.jpeg";
const news2 =
  "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/1203fcb9-b1b5-4fbe-8b61-a13536e47398.jpeg";

const NewsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const newsItems = [
    {
      id: 1,
      image: news1,
      title: "Breaking News: Example Headline 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 2,
      image: news2,
      title: "Sports News: Example Headline 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 3,
      image: news1,
      title: "Entertainment News: Example Headline 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 4,
      image: news1,
      title: "World News: Example Headline 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 5,
      image: news1,
      title: "Breaking News: Example Headline 1",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 6,
      image: news1,
      title: "Sports News: Example Headline 2",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 7,
      image: news1,
      title: "Entertainment News: Example Headline 3",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
    {
      id: 8,
      image: news1,
      title: "World News: Example Headline 4",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
    },
  ];

  const handlePrevious = () => {
    setActiveIndex(activeIndex === 0 ? newsItems.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex(activeIndex === newsItems.length - 1 ? 0 : activeIndex + 1);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="news-carousel">
      <div className="news-carousel-images">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className={`news-carousel-image ${
              activeIndex === index ? "active" : ""
            }`}
          >
            <img src={item.image} alt={item.title} />
          </div>
        ))}
      </div>
      <div className="news-carousel-content">
        <h2 className="news-carousel-title">{newsItems[activeIndex].title}</h2>
        <p className="news-carousel-description">
          {newsItems[activeIndex].description}
        </p>
      </div>
      <div className="news-carousel-navigation">
        <button className="news-carousel-previous" onClick={handlePrevious}>
          &lt;
        </button>
        <div className="news-carousel-dots">
          {newsItems.map((item, index) => (
            <div
              key={index}
              className={`news-carousel-dot ${
                activeIndex === index ? "active" : ""
              }`}
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
        </div>
        <button className="news-carousel-next" onClick={handleNext}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
