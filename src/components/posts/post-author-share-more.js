import React, { useState, useEffect, useRef } from "react";
import Pic from "../../images/unknown-person-icon-10.jpg";
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
import "bootstrap/dist/css/bootstrap.css";
import "../../css/single-post.css";
import "../../css/test.css";
import { Link } from "gatsby";
import EditDeleteNav from "./edit-delete-nav";

const PostAuthorShareMore = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <>
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
                        <a href={`/@sohaib`} className="link">
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
                      {props.date}
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
                      {props.read_min} min read
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
                    title={props.title}
                    className="single-post-share-button"
                  >
                    <FaTwitter size="1.4rem" color="rgba(117, 117, 117, 1)" />
                  </TwitterShareButton>
                </button>
              </div>
              <div className="single-post-share-button-container block">
                <LinkedinShareButton
                  url={window.location.href}
                  title={props.title}
                  className="single-post-share-button"
                >
                  <FaLinkedin size="1.4rem" color="rgba(117, 117, 117, 1)" />
                </LinkedinShareButton>
              </div>
              <div className="single-post-share-button-container block">
                <FacebookShareButton
                  url={window.location.href}
                  title={props.title}
                  className="single-post-share-button"
                >
                  <FaFacebookSquare
                    size="1.4rem"
                    color="rgba(117, 117, 117, 1)"
                  />
                </FacebookShareButton>
              </div>
              <div
                className="single-post-share-button-container block "
                onClick={() => {
                  handleShow();
                }}
                style={{ cursor: "pointer" }}
              >
                {/* <OverlayTrigger
                  trigger="click"
                  placement="right"
                  rootClose
                  overlay={popover}
                > */}
                <FaEllipsisV size="1.4rem" color="rgba(117, 117, 117, 1)" />
                {/* </OverlayTrigger> */}
              </div>
            </div>
          </div>
        </div>
        {/* {show && ( */}
        <div
          className={`single-post-info-padded edit-drawer-${
            show === true ? "visible" : "hidden"
          }`}
          style={{
            height: "64px",
            overflow: "hidden",
            transitionDelay: "0s, 0s, 0.2s",
            transitionDuration: "0.2s, 0.2s, 0s",
            transitionTimingFunction: "ease",
            marginTop: `${show === true ? "-50px" : "0px"}`,
          }}
        >
          <EditDeleteNav slug={props.slug} {...props} />
        </div>
        {/* )} */}
      </div>
    </>
  );
};

export default PostAuthorShareMore;
