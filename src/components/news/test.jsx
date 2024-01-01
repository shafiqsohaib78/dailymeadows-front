import React from "react";
import "./test.css";
const news1 =
  "https://dynaimage.cdn.cnn.com/cnn/digital-images/org/6c773c35-62c7-4f39-b68e-896354c8e6f0.jpeg";

const NewsTimeline = () => {
  const newsItems = [
    {
      id: 1,
      image: news1,
      title: "Breaking News: Example Headline",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
      date: "March 24, 2023",
    },
    {
      id: 2,
      image: news1,
      title: "Sports News: Example Headline",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
      date: "March 23, 2023",
    },
    {
      id: 3,
      image: news1,
      title: "Entertainment News: Example Headline",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
      date: "March 22, 2023",
    },
    {
      id: 4,
      image: news1,
      title: "World News: Example Headline",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae enim est.",
      date: "March 21, 2023",
    },
  ];

  return (
    <div className="news-timeline">
      {newsItems.map((newsItem) => (
        <div key={newsItem.id} className="news-item">
          <img
            src={newsItem.image}
            alt={newsItem.title}
            className="news-item-image"
          />
          <div className="news-item-content">
            <div className="news-item-title">{newsItem.title}</div>
            <div className="news-item-description">{newsItem.description}</div>
            <div className="news-item-date">{newsItem.date}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NewsTimeline;
