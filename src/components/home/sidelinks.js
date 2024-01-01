import React from "react";
import { Link } from "gatsby";
import Logo from "../../../static/whiteL.svg";

function SideLinks() {
  return (
    <div>
      <div
        className="home-page-bottom-info-message"
        style={{
          backgroundColor: "#000",
          border: "1px solid #757575",
        }}
      >
        <div className="home-page-bottom-info-message-header">
          <div className="home-page-bottom-info-message-header-text block">
            <h2
              className="home-page-bottom-info-message-header-text-inner"
              style={{ color: "#fff" }}
            >
              <b>Join Daily Meadows Now</b>
            </h2>
          </div>
          <div className="block">
            <img
              src={Logo}
              alt=""
              style={{
                width: "20px",
                height: "20px",
                verticalAlign: "middle",
                bottom: "10px",
              }}
            />
          </div>
        </div>
        <div className="block">
          <h4
            className="home-page-bottom-info-message-detail"
            style={{ color: "#fff" }}
          >
            Gain <b>Depth Knowledge</b> by reading <b>Inspiring</b> and{" "}
            <b>Creative Articles.</b>
          </h4>
        </div>
      </div>

      <div className="home-page-bottom-info-links">
        <div className="home-page-bottom-info-links-single block">
          <Link to="/politics" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">
              Politics
            </h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/business" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">
              Business
            </h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/technology" className="link">
            <h4 className="home-page-bottom-info-links-single-text">
              Technology
            </h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/entertainment" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">
              Entertainment
            </h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/education" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">
              Education
            </h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/science" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">Science</h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/sports" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">Sports</h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/style" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">Style</h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/travel" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">Travel</h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/health" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">Health</h4>
          </Link>
        </div>
        <div className="home-page-bottom-info-links-single block">
          <Link to="/weather" className="link" rel="noopener">
            <h4 className="home-page-bottom-info-links-single-text">Weather</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideLinks;
