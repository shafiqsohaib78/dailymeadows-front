/* eslint-disable no-lone-blocks */
import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector, shallowEqual } from "react-redux";
// import { changeLocation } from "../action/location";
import "../css/homelowernews.css";
import { Link } from "gatsby";
// import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import Zoom from "react-medium-image-zoom";
// import Pic from "../../pics/unknown-person-icon-10.jpg";
// import Logo from "../../pics/logo.svg";
import { TailSpin } from "react-loader-spinner";
import axios from "axios";
import MainNavbar from "../components/navbars/mainNavbar";
import Footer from "../components/footers/homeFooter";

import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";
const CatagoryPosts = (props) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const width = useWindowWidth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);

    axios.get(`https://jsonplaceholder.typicode.com/posts`).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  return (
    <React.Fragment>
      <MainNavbar />
      <section className="posts-catogory-header">
        <span className="posts-divider"></span>
        <h1 className="posts-header-text">Drafts</h1>
        <span className="posts-divider"></span>
      </section>
      <div className="home-bottom-section block">
        <div className="home-bottom-section-padded">
          <div className="home-bottom-section-padded-outer">
            <div className="">
              <div className="home-page-bottom-posts">
                <div>
                  <div className="block">
                    {loading === true ? (
                      <TailSpin color="#000" height={80} width={80} />
                    ) : (
                      data &&
                      data.map((item, index) => (
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
                              <a
                                href={`/@${item.username}/${item.slug}`}
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
                              </a>
                            </div>
                          </div>
                          {index + 1 !== data.length && <hr />}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
