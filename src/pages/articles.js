/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { changeLocation } from "../action/location";
import "../css/homelowernews.css";
import { Link } from "gatsby";
// import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
// import Zoom from "react-medium-image-zoom";
// import Pic from "../../pics/unknown-person-icon-10.jpg";
// import Logo from "../../pics/logo.svg";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import MainNavbar from "../components/navbars/mainNavbar";
import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";
import { shallowEqual, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Articles = (props) => {
  const { isAuthenticated, u_id } = useSelector(
    (state) => ({
      isAuthenticated: state.isAuthenticated,
      u_id: state.user ? state.user.u_id : null,
    }),
    shallowEqual
  );
  const width = useWindowWidth();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(null);
  const [hasNext, setHasNext] = useState(true);
  const [isEmpty, setIsEmpty] = useState();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const loadPosts = () => {
    const timeoutId = setTimeout(async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/account-articles/?user=${u_id}`)
        .then((res) => {
          console.log(res.data);
          setData(res.data.results);
          setNext(res.data.next);
          if (res.data.next === null) {
            setHasNext(false);
          }
          setIsEmpty(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timeoutId);
  };

  const handleNext = async () => {
    console.log("next called");
    if (next !== null && data) {
      let newData = data;
      console.log(newData);
      console.log(data);
      await axios
        .get(next)
        .then((res) => {
          console.log(data.concat(res.data.results));
          setData(data.concat(res.data.results));
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

  useEffect(() => {
    setLoading(true);
    if (u_id !== null) {
      loadPosts();
    }
  }, [u_id]);

  return (
    <React.Fragment>
      <MainNavbar />
      <section className="posts-catogory-header">
        <span className="posts-divider"></span>
        <h1 className="posts-header-text">Articles</h1>
        <span className="posts-divider"></span>
      </section>
      <div className="home-bottom-section block">
        <div className="home-bottom-section-padded">
          <div className="home-bottom-section-padded-outer">
            <div className="">
              <div className="home-page-bottom-posts">
                <div>
                  <div className="block">
                    {isEmpty ? (
                      <div className="home-page-bottom-posts">
                        <p>We couldn’t find any Posts.</p>
                      </div>
                    ) : (
                      <>
                        <InfiniteScroll
                          dataLength={data && data ? data.length : 0}
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
                          {data &&
                            data.map((item, index) => (
                              <div
                                className="home-page-bottom-posts-container"
                                key={index}
                              >
                                <div className="home-page-bottom-posts-container-outer">
                                  <div className="home-page-bottom-posts-container-inner">
                                    <div className="home-page-bottom-post-textual block">
                                      <Link
                                        to={`/article/${item.slug}`}
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
                                      </Link>
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
                                      <div className="home-page-bottom-options">
                                        <div className="home-page-bottom-options-left">
                                          <button
                                            type="button"
                                            class="btn btn-primary"
                                          >
                                            Edit
                                          </button>
                                          <button
                                            type="button"
                                            class="btn btn-danger"
                                            style={{ marginLeft: "1rem" }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <Link
                                      to={`/article/${item.slug}`}
                                      className="link"
                                    >
                                      {width > 550 && (
                                        <img
                                          src={`https://miro.medium.com/v2/resize:fit:720/0*Ea5wE_fSMYHPRV5I`}
                                          width={200}
                                          height={133}
                                        />
                                      )}
                                      {width < 551 && (
                                        <img
                                          src={`https://miro.medium.com/v2/resize:fit:720/0*Ea5wE_fSMYHPRV5I`}
                                          width={100}
                                          height={100}
                                        />
                                      )}
                                    </Link>
                                  </div>
                                </div>
                                {index + 1 !== data.length && <hr />}
                              </div>
                            ))}
                        </InfiniteScroll>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Articles;

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
