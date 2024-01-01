import React, { useEffect, useState } from "react";
import "../../css/homefront.css";
import { Link } from "gatsby";
import axios from "axios";
import Swal from "sweetalert2";
export default function PrimaryPosts() {
  const [post, setPost] = useState();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = () => {
    const timeoutId = setTimeout(() => {
      axios
        .get("http://127.0.0.1:8000/api/article-front/")
        .then((res) => {
          console.log(res.data);
          setPost(res.data);
        })
        .catch((err) => {
          if (err.response) {
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 2000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: "Something went wrong.",
            });
          }
        });
    }, 500);
    return () => clearTimeout(timeoutId);
  };
  return (
    <React.Fragment>
      {post && post ? (
        <div className="home-page-front-main-post-container">
          {/* {item.image ? ( */}
          <Link
            to={`/article/${post[0].slug}`}
            className="home-page-front-main-post-link"
          >
            <img
              src={`${post[0].image}`}
              alt="nknlk"
              width="376"
              role="presentation"
              className="home-page-front-main-post-image"
            />
          </Link>

          <div className="home-page-front-main-post-title">
            <div className="home-page-front-suggestion-post-owner-name">
              {/* {post[0].category.map((item) => { */}

              <h4 className="home-page-front-suggestion-post-owner-name-text">
                {post[0].category.toString()}
              </h4>
              {/* })} */}
            </div>
            <Link
              to={`/article/${post[0].slug}`}
              className="home-page-front-main-post-title-link"
            >
              <h2 className="home-page-front-main-post-title-text">
                {post[0].title}
              </h2>
            </Link>
          </div>
          <div className="home-page-front-main-post-desc">
            <p className="home-page-front-main-post-desc-text">
              <Link
                to={`/article/${post[0].slug}`}
                className="home-page-front-main-post-desc-text-link"
              >
                {post[0].meta}
              </Link>
            </p>
          </div>
          <div className="home-page-front-main-post-info">
            <div className="home-page-front-main-post-info-inner">
              <h4 className="main-post-info-read-more">
                {/* <Link
                  to={`/article/${post[0].slug}`}
                  className="main-post-info-read-more-link"
                > */}
                {post[0].date}
                {/* </Link> */}
              </h4>
              <div className="home-page-front-suggestion-post-info-spacer">
                <span className="home-page-front-suggestion-post-info-spacer-outer">
                  <span className="home-page-front-suggestion-post-info-spacer-inner">
                    ·
                  </span>
                </span>
              </div>
              <span className="main-post-info-reading-time">
                {post[0].read_min} min read
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

{
  /* <div className="home-page-front-main-post-owner">
          <div className="home-page-front-main-post-owner-outer">
            <Link to={`/@sohaibshafiq`}>
              <img
                src="https://miro.medium.com/v2/resize:fill:48:48/1*-z7GUMUUq8maKPDl8jL21A.jpeg"
                alt=""
                className="home-page-front-main-post-owner-avatar"
                width="20px"
                height="20px"
              />
            </Link>
            <div className="home-page-front-main-post-owner-name">
              <Link
                to={`/@sohaibshafiq`}
                className="home-page-front-main-post-owner-name-link"
              >
                <h4 className="home-page-front-main-post-owner-name-text">
                  Sohaib Shafiq
                </h4>
              </Link>
            </div>
            <div className="home-page-front-suggestion-post-owner-name">
              <Link
                to={`/@sohaibshafiq`}
                className="home-page-front-suggestion-post-owner-name-link"
              >
                <h4 className="home-page-front-suggestion-post-owner-name-text">
                  Entertainment
                </h4>
              </Link>
            </div>
          </div>
        </div> */
}
