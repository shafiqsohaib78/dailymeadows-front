import React from "react";
import HomeFront from "./frontmain";

function FrontSection() {
  return (
    <div className="home-page-outer">
      <div className="home-page-front-banner">
        <div className="home-page-front-banner-padded">
          <div className="home-page-front-banner-padded-inner">
            <div className="home-page-front-main-post">
              <HomeFront />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FrontSection;
