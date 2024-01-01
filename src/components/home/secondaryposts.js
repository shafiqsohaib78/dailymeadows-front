import React, { useEffect, useState } from "react";
import "../../css/homefront.css";
import { Link } from "gatsby";
import axios from "axios";
import Swal from "sweetalert2";

export default function SecondaryPosts() {
  const data = [1, 2, 3, 4];
  const [post, setPost] = useState();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = () => {
    const timeoutId = setTimeout(() => {
      axios
        .get("http://127.0.0.1:8000/api/article-secondry/")
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
      {post &&
        post.map((item, index) => (
          <div className="home-page-front-suggestion-post">
            <div className="home-page-front-suggestion-post-inner">
              <div className="home-page-front-suggestion-post-textual">
                <div className="home-page-front-suggestion-post-textual-inner">
                  <div className="home-page-front-suggestion-post-owner">
                    <div className="home-page-front-suggestion-post-owner-inner">
                      <div className="home-page-front-suggestion-post-owner-name">
                        <h4 className="home-page-front-suggestion-post-owner-name-text">
                          {item.category.toString()}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/article/${item.slug}`}
                    className="home-page-front-suggestion-post-title"
                  >
                    <h2 className="home-page-front-suggestion-post-title-text">
                      {item.title}
                    </h2>
                  </Link>
                  <div className="home-page-front-suggestion-post-info">
                    <h4 className="home-page-front-suggestion-post-info-outer">
                      <div className="home-page-front-suggestion-post-info-inner">
                        <span className="home-page-front-suggestion-post-info-date">
                          <h4 className="home-page-front-suggestion-post-info-date-text">
                            {item.date}
                          </h4>
                        </span>
                        <div className="home-page-front-suggestion-post-info-spacer">
                          <span className="home-page-front-suggestion-post-info-spacer-outer">
                            <span className="home-page-front-suggestion-post-info-spacer-inner">
                              ·
                            </span>
                          </span>
                        </div>
                        <span className="home-page-front-suggestion-post-info-reading-time">
                          <span className="home-page-front-suggestion-post-info-reading-time-text">
                            {item.read_min} min read
                          </span>
                        </span>
                      </div>
                    </h4>
                  </div>
                </div>
              </div>
              {/* {item.image ? ( */}
              <Link
                to={`/article/${item.slug}`}
                className="home-page-front-suggestion-post-image"
              >
                <img
                  src={`https://miro.medium.com/v2/resize:fill:224:224/1*0z_I9LEk95fqR8j9rj-Nfg.jpeg`}
                  width={100}
                  height={100}
                  role="presentation"
                  alt=""
                  className="home-page-front-suggestion-post-image-pic"
                />
              </Link>
              {/* ) : null} */}
            </div>
            {index + 1 !== data.length && <hr />}
          </div>
        ))}
    </React.Fragment>
  );
}
