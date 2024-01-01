import React, { useState, useEffect } from "react";
import "../css/search-input.css";
import "../css/search-inner.css";
import Footer from "../components/footers/homeFooter";
import { Link } from "gatsby";
import MainNavbar from "../components/navbars/mainNavbar";
import axios from "axios";
import Swal from "sweetalert2";
import InfiniteScroll from "react-infinite-scroll-component";
import { TailSpin } from "react-loader-spinner";

import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";
export default function Search() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [value, setValue] = useState("");
  const [post, setPost] = useState();
  const [next, setNext] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [isEmpty, setIsEmpty] = useState();
  const handleOnChange = async (event) => {
    console.log(event.target.value);
    setValue(
      event.target.value && event.target.value && event.target.value
        ? event.target.value
        : ""
    );
  };
  useEffect(() => {
    console.log("value->", value.length);
  });
  useEffect(() => {
    if (value.length > 3) {
      handleSearch();
    }
  }, [value]);
  const handleSearch = () => {
    const timeoutId = setTimeout(() => {
      axios
        .get(`http://127.0.0.1:8000/api/search-articles/?search=${value}`)
        .then((res) => {
          console.log(res.data);
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
      <MainNavbar />
      <div style={{ minHeight: "100vh" }}>
        <div className="search-inner-container p-r">
          <div
            className="search-input"
            style={{
              marginRight: "-20px",
              marginLeft: "-20px",
              boxSizing: "border-box",
              paddingBottom: "40px",
            }}
          >
            <header className="search-input-heading">
              <form
                style={{ margin: 0 }}
                // action=""
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="search"
                  value={value}
                  id="search-input-box"
                  placeholder="Search SotioTalk"
                  className="search-input-box"
                  onChange={(e) => handleOnChange(e)}
                />
              </form>
            </header>
          </div>
          <div className="search-sub-comp" style={{ display: "inline-block" }}>
            <div className="search-posts f-l">
              <div style={{ maxWidth: "600px !important" }}>
                {/* <header className="search-posts-header">
                <div className="search-posts-header-text">
                  <span className="search-posts-header-text-inner">
                    Articles
                  </span>
                </div>
              </header> */}
                {!value.length > 0 ? (
                  <div className="home-page-bottom-posts">
                    <p>Search the articles in Daily Meadows....</p>
                  </div>
                ) : (
                  <>
                    {isEmpty ? (
                      <div className="home-page-bottom-posts">
                        <p>We couldn’t find any Posts.</p>
                      </div>
                    ) : (
                      <>
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
                              <div className="search-posts-item" key={index}>
                                {/* <div className="search-posts-item-inner p-r">
                    <div className="f-l search-post-author">
                      <div className="flex a-i-c">
                        <div className="flex0">
                          <Link to={`/sohaib`} className="avatar-link avatar">
                            <img
                              src={`https://miro.medium.com/v2/resize:fit:720/0*tTyseMQyKWc1bS1Z`}
                              className="avatar-img"
                              alt="Go to the profile of Kristyna Zapletal"
                            ></img>
                          </Link>
                        </div>

                        <div className="search-author-textual flex1">
                          <Link
                            className="search-author-name "
                            to={`/sohaib}`}
                            data-action="show-user-card"
                            data-action-source="search_post---------0"
                            data-action-value="7823a5a28248"
                            data-action-type="hover"
                            data-user-id="7823a5a28248"
                            dir="auto"
                          >
                            Sohaib Shafiq
                          </Link>{" "}
                          <div className="search-post-info">
                            <Link className="avatar-link" to={`/sohaibshafiq`}>
                              <time>23 Dec, 2024</time>
                            </Link>
                            <span className="dot-spacer"></span>
                            <span
                              className="search-post-time"
                              title="3 min read"
                            ></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                                <div className="search-post-content">
                                  <Link
                                    to={`/article/${item.slug}`}
                                    className="avatar-link"
                                  >
                                    <section className="search-post-content-section">
                                      <div>
                                        <div className="search-post-data">
                                          <picture>
                                            <source
                                              media="(max-width: 800px)"
                                              srcSet={`https://miro.medium.com/v2/resize:fit:720/0*tTyseMQyKWc1bS1Z`}
                                            />
                                            <img
                                              alt="that wanaka tree"
                                              src={`https://miro.medium.com/v2/resize:fit:720/0*tTyseMQyKWc1bS1Z`}
                                              width="100%"
                                              height="300"
                                              className="search-image"
                                            />
                                          </picture>
                                        </div>
                                        <h3 className="search-post-title">
                                          {item.title}
                                        </h3>
                                        <h4 className="search-post-meta">
                                          {item.meta}
                                        </h4>
                                      </div>
                                    </section>
                                  </Link>
                                </div>
                                <React.Fragment>
                                  <Link
                                    className="read-more-link"
                                    to={`/article/${item.slug}`}
                                  >
                                    Read more…
                                  </Link>
                                </React.Fragment>
                              </div>
                            ))}
                        </InfiniteScroll>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Footer id="footer" />
        </div>
      </div>
    </React.Fragment>
  );
}
