import React, { useState, useEffect, useRef } from "react";
import Pic from "../../../public/unknown-person-icon-10.jpg";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import {
  FaTwitter,
  FaLinkedin,
  FaFacebookSquare,
  FaEllipsisV,
} from "react-icons/fa";
// import { SlOptionsVertical } from "react-icons/sl";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../tools";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/single-post.css";
import "../../css/test.css";
import MainNavbar from "../../components/navbars/mainNavbar";
import Footer from "../../components/footers/homeFooter";
import PostAuthorShareMore from "../../components/posts/post-author-share-more";
import Swal from "sweetalert2";
import axios from "axios";

import store from "../../ReduxStore";
import { loadUser } from "../../Actions/CounterAction";
import { TailSpin } from "react-loader-spinner";
import { shallowEqual, useSelector } from "react-redux";
import { OverlayTrigger, Popover, Tooltip } from "react-bootstrap";
import { Link } from "gatsby";
import EditDeleteNav from "../../components/posts/edit-delete-nav";
export default function DraftArticle(props) {
  const { user, username, token, isAuthenticated } = useSelector(
    (state) => ({
      user: state.user ? state.user.id : "",
      token: state.user ? state.user.token : null,
      username: state.user ? state.user.username : "",
      isAuthenticated: state.isAuthenticated,
    }),
    shallowEqual
  );
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.href = "/";
    } else {
      const timeoutId = setTimeout(async () => {
        // setIsLoading(true);
        getPost();
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated]);
  const [title, setTitle] = useState();
  const [meta, setMeta] = useState();
  const [description, setDescription] = useState();
  const [read_min, setReadMin] = useState();
  const [date, setDate] = useState();
  const [isEmpty, setIsEmpty] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  // const ejInstance = useRef();

  const getPost = () => {
    const timeoutId = setTimeout(async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/draft-detail/?post=${props.id}`)
        .then((res) => {
          console.log(res.data[0]);
          // if (res.data.results.length > 0) {
          if (res.data) {
            setTitle(res.data[0].title);
            setMeta(res.data[0].meta);
            setReadMin(res.data[0].read_min);
            setDescription(res.data[0].description);
            setDate(res.data[0].date);

            setIsEmpty(false);
          } else {
            setIsEmpty(true);
          }
          setIsLoading(false);
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
          setIsLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timeoutId);
  };
  // useEffect(() => {
  //   if (!isEmpty) {
  //     if (ejInstance.current === null) {
  //       initEditor();
  //     }

  //     console.log(JSON.parse(description));
  //     return () => {
  //       ejInstance?.current?.destroy();
  //       ejInstance.current = null;
  //     };
  //   }
  // }, [isEmpty]);

  useEffect(() => {
    if (!isEmpty && !isLoading) {
      const editor = new EditorJS({
        /**
         * Id of Element that should contain the Editor
         */
        holder: "read-only-editor",
        readOnly: true,
        // autofocus: true,
        data: JSON.parse(description),

        /**
         * Available Tools list.
         * Pass Tool's class or Settings object for each Tool you want to use
         */
        tools: EDITOR_JS_TOOLS,
      });
    }
  });

  return (
    <React.Fragment>
      <MainNavbar />
      {/* {isAuthenticated && <EditDeleteNav />} */}

      <div
      // style={{ marginBottom: loading ? "100vh" : "0vh", minHeight: "100vh" }}
      >
        <React.Fragment>
          <React.Fragment>
            <article>
              <div>
                <section className="single-post-section">
                  <div className="single-post-header">
                    <>
                      {isLoading ? (
                        <TailSpin
                          color="#000"
                          height={50}
                          width={50}
                          // timeout={3000}
                        />
                      ) : (
                        <>
                          {isEmpty ? (
                            <div className="home-page-bottom-posts">
                              <p>We couldn’t find any Posts.</p>
                            </div>
                          ) : (
                            <div className="single-post-header-padded" key={1}>
                              <div>
                                <h1 className="single-post-title font-weight">
                                  {" "}
                                  {title}
                                </h1>
                              </div>
                              <div>
                                <h2 className="single-post-description font-weight">
                                  {meta}
                                </h2>
                                {/* <div className="single-post-info">
                                  <div className="single-post-info-padded">
                                    <div className="single-post-owner">
                                      <div>
                                        <a href={`/@sohaib`}>
                                          <div className="single-post-owner-img-container">
                                            <img
                                              className="single-post-owner-img block"
                                              src={Pic}
                                              alt=""
                                              width="48px"
                                              height="48px"
                                            />
                                          </div>
                                        </a>
                                      </div>
                                      <div className="single-post-owner-textual block">
                                        <div className="single-post-owner-textual-info">
                                          <div style={{ flex: "1 1 0%" }}>
                                            <span className="single-post-owner-textual-outer font-weight">
                                              <div className="single-post-owner-textual-inner">
                                                <span className="single-post-owner-name font-weight">
                                                  <a
                                                    href={`/@sohaib`}
                                                    className="link"
                                                  >
                                                    Sohaib Shafiq
                                                  </a>
                                                </span>
                                              </div>
                                            </span>
                                          </div>
                                        </div>
                                        <span className="single-post-infontime font-weight">
                                          <div className="home-page-bottom-options-left">
                                            <span className="home-page-bottom-options-date">
                                              <span className="home-page-bottom-options-date-inner">
                                                {date}
                                              </span>
                                            </span>
                                            <div className="home-page-bottom-options-spacer block">
                                              <span className="block">
                                                <span className="home-page-bottom-options-spacer-inner">
                                                  ·
                                                </span>
                                              </span>
                                            </div>
                                            <span className="home-page-bottom-options-reading-time">
                                              <span className="home-page-bottom-options-reading-time-inner">
                                                {read_min} min read
                                              </span>
                                            </span>
                                          </div>
                                        </span>
                                      </div>
                                    </div>
                                    <div className="single-post-share-section">
                                      <div className="single-post-share-section-padded">
                                        <div className="single-post-share-button-container block">
                                          <button
                                            className="single-post-share-button"
                                            aria-label="Share on twitter"
                                          >
                                            <TwitterShareButton
                                              url={window.location.href}
                                              title={title}
                                              className="single-post-share-button"
                                            >
                                              <FaTwitter
                                                size="1.4rem"
                                                color="rgba(117, 117, 117, 1)"
                                              />
                                            </TwitterShareButton>
                                          </button>
                                        </div>
                                        <div className="single-post-share-button-container block">
                                          <LinkedinShareButton
                                            url={window.location.href}
                                            title={title}
                                            className="single-post-share-button"
                                          >
                                            <FaLinkedin
                                              size="1.4rem"
                                              color="rgba(117, 117, 117, 1)"
                                            />
                                          </LinkedinShareButton>
                                        </div>
                                        <div className="single-post-share-button-container block">
                                          <FacebookShareButton
                                            url={window.location.href}
                                            title={`Explosions were heard overnight in the capital, Kyiv, where the mayor said five people had been injured in the "biggest" kamikaze drone attack so far.`}
                                            className="single-post-share-button"
                                          >
                                            <FaFacebookSquare
                                              size="1.4rem"
                                              color="rgba(117, 117, 117, 1)"
                                            />
                                          </FacebookShareButton>
                                        </div>
                                        <div className="single-post-share-button-container block">
                                          <OverlayTrigger
                                            trigger="click"
                                            placement="right"
                                            rootClose
                                            overlay={popover}
                                          >
                                            <FaEllipsisV
                                              size="1.4rem"
                                              color="rgba(117, 117, 117, 1)"
                                            />
                                          </OverlayTrigger>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div> */}
                                <PostAuthorShareMore
                                  date={date}
                                  read_min={read_min}
                                  title={title}
                                  slug={props.id}
                                />
                              </div>

                              <div id="read-only-editor" />
                            </div>
                          )}
                        </>
                      )}
                      {/* {single
                        ? single.map((item, index) => ( */}

                      {/* <EditorJS
                              autofocus
                              data={data}
                              holder="read-only-editor"
                              // onReady={onReady}
                              // onChange={onChange}
                              tools={EDITOR_JS_TOOLS}
                              readOnly="true"
                            > */}
                      {/* </EditorJS> */}
                      {/* )) */}
                      {/* : null} */}
                    </>
                  </div>
                </section>
              </div>
            </article>
          </React.Fragment>
        </React.Fragment>
      </div>
      <Footer />
    </React.Fragment>
  );
}
