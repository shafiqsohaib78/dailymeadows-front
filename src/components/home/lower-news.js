/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { changeLocation } from "../action/location";
import "../../css/homelowernews.css";
import { Link } from "gatsby";
import Logo from "../../../static/whiteL.svg";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Zoom from "react-medium-image-zoom";
// import Pic from "../../pics/unknown-person-icon-10.jpg";
import SideLinks from "./sidelinks";
import axios from "axios";
import Swal from "sweetalert2";
// import Logo from "../../pics/logo.svg";

const MainPosts = () => {
  const width = useWindowWidth();
  const [post, setPost] = useState();
  const [next, setNext] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [isEmpty, setIsEmpty] = useState();
  useEffect(() => {
    getPost();
  }, []);
  const getPost = () => {
    const timeoutId = setTimeout(async () => {
      await axios
        .get("http://127.0.0.1:8000/api/post-main-bottom/")
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
                                    {/* <div className="home-page-bottom-post-owner block">
                                      <div className="home-page-bottom-post-owner-padded">
                                        <a
                                          href={`/@${item.username}`}
                                          className="link1"
                                        >
                                          <img
                                            src={
                                              item.avatar ? item.avatar : Pic
                                            }
                                            alt=""
                                            width="20px"
                                            height="20px"
                                            className="home-page-bottom-post-owner-image block"
                                          />
                                        </a>
                                        <div className="home-page-bottom-post-owner-name">
                                          <a
                                            href={`/@${item.username}`}
                                            className="link"
                                          >
                                            <h4 className="home-page-bottom-post-owner-name-text">
                                              {item.name}
                                            </h4>
                                          </a>
                                        </div>
                                      </div>
                                    </div> */}
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
                                    <a
                                      href={`/article/${item.slug}`}
                                      className="link"
                                    >
                                      <h2 className="home-page-bottom-post-title">
                                        I (mostly) automated my note-taking
                                        system — I’ve never been more productive
                                      </h2>
                                      {width > 500 && (
                                        <div className="home-page-bottom-post-description block">
                                          <h3 className="home-page-bottom-post-description-text">
                                            7 free websites you should use to
                                            increase productivity There are many
                                            apps out there that can help you
                                            increase your productivity, but not
                                            all of them are created equal. In
                                            this article, we will share some of
                                            the best web apps that will help you
                                            save time and boost…
                                          </h3>
                                        </div>
                                      )}
                                    </a>
                                    <div className="home-page-bottom-options">
                                      <div className="home-page-bottom-options-left">
                                        <span className="home-page-bottom-options-date">
                                          <span className="home-page-bottom-options-date-inner">
                                            Dec 23, 2024
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
                                                6 min read
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
                                        src={`https://media.newyorker.com/photos/643d8739d73b3d81aa0e371f/master/w_960,c_limit/Malone-Dominion.jpg`}
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
                                        src={`https://media.newyorker.com/photos/643d8739d73b3d81aa0e371f/master/w_960,c_limit/Malone-Dominion.jpg`}
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

export default MainPosts;

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
