import React, { useEffect, useState } from "react";
import "../../css/posts.css";
import { AiOutlineFire, AiFillFire } from "react-icons/ai";
import { Link } from "gatsby";
import CatagoryPosts from "./catagory-posts";

const PostsMain = (props) => {
  const post = [1, 2, 3, 4, 5, 6, 7];

  return (
    <React.Fragment>
      <React.Fragment>
        <section className="posts-catogory-header">
          <span className="posts-divider"></span>
          <h1 className="posts-header-text">{props.url}</h1>
          <span className="posts-divider"></span>
        </section>
        {/* <div className="posts-catagory-container">
          <div className="posts-catagory-inner">
            <div className="posts-catagory-inner2"></div>
          </div>
        </div> */}
        <CatagoryPosts data={props.url} />
      </React.Fragment>
    </React.Fragment>
  );
};

export default PostsMain;
