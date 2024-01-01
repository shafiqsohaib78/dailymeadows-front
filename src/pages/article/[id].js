import React, { useState, useEffect, useRef } from "react";
import Pic from "../../../public/unknown-person-icon-10.jpg";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { FaTwitter, FaLinkedin, FaFacebookSquare } from "react-icons/fa";
import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../../tools";
import "bootstrap/dist/css/bootstrap.css";
import "../../css/single-post.css";
import "../../css/test.css";
import MainNavbar from "../../components/navbars/mainNavbar";
import Footer from "../../components/footers/homeFooter";
import Swal from "sweetalert2";
import axios from "axios";

import store from "../../ReduxStore";
import { loadUser } from "../../Actions/CounterAction";
export default function Article(props) {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const [post, setPost] = useState();
  const [isEmpty, setIsEmpty] = useState();
  const ejInstance = useRef();
  // useEffect(() => {
  //   if (ejInstance.current === null) {
  //     initEditor();
  //   }

  //   return () => {
  //     ejInstance?.current?.destroy();
  //     ejInstance.current = null;
  //   };
  // }, []);
  useEffect(() => {
    getPost();
  }, []);
  const getPost = () => {
    const timeoutId = setTimeout(async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/articles-detail/?post=${props.id}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.results.length > 0) {
            setPost(res.data.results);

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
  const single = [1];
  const data = {
    time: 1683556418574,
  };
  const DEFAULT_INITIAL_DATA = {
    time: 1683556418574,
    blocks: [
      {
        id: "mhTl6ghSkV",
        type: "paragraph",
        data: {
          text: "Hey. Meet the new Editor. On this picture you can see it in action. Then, try a demo 🤓",
        },
      },
      {
        id: "l98dyx3yjb",
        type: "header",
        data: {
          text: "Key features",
          level: 3,
        },
      },
      {
        id: "os_YI4eub4",
        type: "list",
        data: {
          type: "unordered",
          items: [
            "It is a block-style editor",
            "It returns clean data output in JSON",
            `Designed to be extendable and pluggable with a <a href="https://editorjs.io/creating-a-block-tool">simple API</a>`,
          ],
        },
      },
      {
        id: "1yKeXKxN7-",
        type: "header",
        data: {
          text: "What does it mean «block-styled editor»",
          level: 3,
        },
      },
      {
        id: "TcUNySG15P",
        type: "paragraph",
        data: {
          text: `Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc. Each of them is an independent <sup data-tune="footnotes">1</sup> contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.`,
        },
        tunes: {
          footnotes: [
            "It works more stable then in other WYSIWYG editors. Same time it has smooth and well-known arrow navigation behavior like classic editors.",
          ],
        },
      },
      {
        id: "M3UXyblhAo",
        type: "header",
        data: {
          text: "What does it mean clean data output?",
          level: 3,
        },
      },
      {
        id: "KOcIofZ3Z1",
        type: "paragraph",
        data: {
          text: `There are dozens of ready-to-use Blocks and a simple API <sup data-tune="footnotes">2</sup> for creating any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA buttons, and even games.`,
        },
        tunes: {
          footnotes: [
            "Just take a look at our Creating Block Tool guide. You'll be surprised.",
          ],
        },
      },
      {
        id: "ksCokKAhQw",
        type: "paragraph",
        data: {
          text: `Classic WYSIWYG editors produce raw HTML-markup with both content data and content appearance. On the contrary, <mark class="cdx-marker">Editor.js outputs JSON object</mark> with data of each Block.`,
        },
      },
      {
        id: "XKNT99-qqS",
        type: "attaches",
        data: {
          file: {
            url: "https://drive.google.com/file/d/0B1HXnM1lBuoqMzVhZjcwNTAtZWI5OS00ZDg3LWEyMzktNzZmYWY2Y2NhNWQx/view?usp=sharing&resourcekey=0-5DqnTtXPFvySMiWstuAYdA",
            size: 12902,
            name: "file.pdf",
            extension: "pdf",
          },
          title: "My file",
        },
      },
      {
        id: "7RosVX2kcH",
        type: "paragraph",
        data: {
          text: "Given data can be used as you want: render with HTML for Web clients, render natively for mobile apps, create the markup for Facebook Instant Articles or Google AMP, generate an audio version, and so on.",
        },
      },
      {
        id: "eq06PsNsab",
        type: "paragraph",
        data: {
          text: "Clean data is useful to sanitize, validate and process on the backend.",
        },
      },
      {
        id: "hZAjSnqYMX",
        type: "image",
        data: {
          url: "https://ichef.bbci.co.uk/news/976/cpsprodpb/16213/production/_129634609_ndsbyyi8.png.webp",

          withBorder: false,
          withBackground: false,
          stretched: true,
          caption: "CodeX Code Camp 2019",
        },
      },
    ],
    version: "2.12.4",
  };
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "read-only-editor",
      // onReady: () => {
      //   ejInstance.current = editor;
      // },
      // autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      readOnly: true,
      // onChange: async () => {
      //   let content = await editor.saver.save();

      //   console.log(content);
      // },
      tools: { EDITOR_JS_TOOLS },
    });
  };

  return (
    <React.Fragment>
      <MainNavbar />
      <div
      // style={{ marginBottom: loading ? "100vh" : "0vh", minHeight: "100vh" }}
      >
        <React.Fragment>
          <React.Fragment>
            <article>
              <div>
                <section className="single-post-section">
                  <div className="single-post-header">
                    {single
                      ? single.map((item, index) => (
                          <div
                            className="single-post-header-padded"
                            key={index}
                          >
                            <div>
                              <h1 className="single-post-title font-weight">
                                {" "}
                                Ukraine war: Russia launches 'biggest' kamikaze
                                drone attack
                              </h1>
                            </div>
                            <div>
                              <h2 className="single-post-description font-weight">
                                Explosions were heard overnight in the capital,
                                Kyiv, where the mayor said five people had been
                                injured in the "biggest" kamikaze drone attack
                                so far.
                              </h2>
                              <div className="single-post-info">
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
                                              Dec 23, 2019
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
                                              6 min read
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
                                            title={item.title}
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
                                          title={item.title}
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
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* <EditorJS
                              autofocus
                              data={data}
                              holder="read-only-editor"
                              // onReady={onReady}
                              // onChange={onChange}
                              tools={EDITOR_JS_TOOLS}
                              readOnly="true"
                            > */}
                            <div id="read-only-editor" />
                            {/* </EditorJS> */}
                          </div>
                        ))
                      : null}
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
