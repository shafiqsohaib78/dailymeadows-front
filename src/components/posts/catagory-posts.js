/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { changeLocation } from "../action/location";
import "../../css/homelowernews.css";
import { Link } from "gatsby";
// import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Swal from "sweetalert2";
// import Zoom from "react-medium-image-zoom";
// import Pic from "../../pics/unknown-person-icon-10.jpg";
import SideLinks from "../home/sidelinks";
// import Logo from "../../pics/logo.svg";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";

const CatagoryPosts = (props) => {
  const width = useWindowWidth();
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState();
  const [next, setNext] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [isEmpty, setIsEmpty] = useState();
  useEffect(() => {
    setLoading(true);
    getPost();
  }, []);
  const getPost = () => {
    const timeoutId = setTimeout(async () => {
      await axios
        .get(
          `http://127.0.0.1:8000/api/category-articles/?category=${props.data}`
        )
        .then((res) => {
          console.log(res.data);
          // setPost(res.data.results);
          if (res.data.results.length > 0) {
            setPost(res.data.results);
            setNext(res.data.next);
            if (res.data.next === null) {
              setHasNext(false);
            }
            setIsEmpty(false);
          } else {
            setIsEmpty(true);
          }
          setLoading(false);
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
  const handleNext = async () => {
    console.log("next called");
    if (next !== null && post) {
      let newData = post;
      console.log(newData);
      console.log(post);
      await axios
        .get(next)
        .then((res) => {
          console.log(post.concat(res.data.results));
          setPost(post.concat(res.data.results));
          setNext(res.data.next);
          if (res.data.next === null) {
            setHasNext(false);
          }
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
    }
  };

  return (
    <React.Fragment>
      <div className="home-bottom-section block">
        <div className="home-bottom-section-padded">
          <div className="home-bottom-section-padded-outer">
            <div className="home-bottom-section-padded-inner">
              {isEmpty ? (
                <div className="home-page-bottom-posts">
                  <p>We couldn’t find any Posts.</p>
                </div>
              ) : (
                <div className="home-page-bottom-posts">
                  <div>
                    <div className="block">
                      <InfiniteScroll
                        dataLength={post && post ? post.length : 0}
                        next={handleNext}
                        hasMore={hasNext}
                        loader={
                          <TailSpin
                            color="#000"
                            height={50}
                            width={50}
                            // timeout={3000}
                          />
                        }
                      >
                        {post &&
                          post.map((item, index) => (
                            <div
                              className="home-page-bottom-posts-container"
                              key={index}
                            >
                              <div className="home-page-bottom-posts-container-outer">
                                <div className="home-page-bottom-posts-container-inner">
                                  <div className="home-page-bottom-post-textual block">
                                    <a
                                      href={`/@${item.username}/${item.slug}`}
                                      className="link"
                                    >
                                      <h2 className="home-page-bottom-post-title">
                                        {item.title}
                                      </h2>
                                      {width > 500 && (
                                        <div className="home-page-bottom-post-description block">
                                          <h3 className="home-page-bottom-post-description-text">
                                            {item.body}
                                          </h3>
                                        </div>
                                      )}
                                    </a>
                                    <div className="home-page-bottom-options">
                                      <div className="home-page-bottom-options-left">
                                        <span className="home-page-bottom-options-date">
                                          <span className="home-page-bottom-options-date-inner">
                                            {item.date}
                                          </span>
                                        </span>
                                        {width > 500 && (
                                          <React.Fragment>
                                            <div className="home-page-bottom-options-spacer block">
                                              <span className="block">
                                                <span className="home-page-bottom-options-spacer-inner">
                                                  ·
                                                </span>
                                              </span>
                                            </div>
                                            <span className="home-page-bottom-options-reading-time">
                                              <span className="home-page-bottom-options-reading-time-inner">
                                                {item.read_min} min read
                                              </span>
                                            </span>
                                          </React.Fragment>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <a
                                    href={`/article/${item.slug}`}
                                    className="link"
                                  >
                                    {width > 550 && (
                                      <img
                                        src={`https://miro.medium.com/v2/resize:fit:720/0*Ea5wE_fSMYHPRV5I`}
                                        width={200}
                                        height={133}
                                      />
                                      // <Image
                                      //   src={item.image}
                                      //   width={200}
                                      //   height={133}
                                      // />
                                    )}
                                    {width < 551 && (
                                      <img
                                        src={`https://miro.medium.com/v2/resize:fit:720/0*Ea5wE_fSMYHPRV5I`}
                                        width={100}
                                        height={100}
                                      />
                                    )}
                                  </a>
                                </div>
                              </div>
                              {index + 1 !== post.length && <hr />}
                            </div>
                          ))}
                      </InfiniteScroll>
                    </div>
                  </div>
                </div>
              )}
              <div className="home-page-bottom-info">
                <div className="home-page-bottom-info-inner block">
                  <SideLinks />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CatagoryPosts;

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWidth = async () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  });
  return width;
}
