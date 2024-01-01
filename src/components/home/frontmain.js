import React from "react";
import PrimaryPosts from "./primaryposts";
import SecondaryPosts from "./secondaryposts";

export default function HomeFront() {
  return (
    <React.Fragment>
      <div className="home-page-front-main-post-outer">
        <div className="home-page-front-main-post-bordered">
          <div className="home-page-front-main-post-inner">
            <PrimaryPosts />
          </div>
        </div>
      </div>
      <div className="home-page-front-suggestion">
        <div className="home-page-front-suggestion-inner">
          <SecondaryPosts />
        </div>
      </div>
    </React.Fragment>
  );
}
