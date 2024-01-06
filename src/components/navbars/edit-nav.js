import React, { useEffect, useState } from "react";
import "../../css/nav.css";
import { BsThreeDots, BsArrowLeft } from "react-icons/bs";
import { Link } from "gatsby";
import Logo from "../../../public/drawing-4.svg";
import Loader from "react-loader-spinner";
import Avatar from "../../images/unknown-person-icon-10.jpg";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";

const EditStoryNav = (props) => {
  const { username, isAuthenticated, full_name } = useSelector(
    (state) => ({
      full_name: state.user ? state.user.name : "",
      username: state.user ? state.user.username : "",
      isAuthenticated: state.isAuthenticated,
    }),
    shallowEqual
  );

  const handleLogout = async () => {
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("_token_auth_user");
    }, 1000);
    return () => clearTimeout(timeoutId);
  };
  const popover = (
    <Popover id="notification-popover">
      <ul className="author-option-main-list flex">
        <React.Fragment>
          <li className="popover-item author-part">
            <div className="flex-center">
              <div className="flex1 popover-author-textual">
                <div className="popover-author-textual-inner">
                  <Link
                    className="user-name-link"
                    to={`/${username}`}
                    title="Go to the profile of Sohaib Shafiq"
                  >
                    {full_name}
                  </Link>
                </div>
              </div>
            </div>
          </li>
          <li className="list-divider popover-item"></li>
          <li className="popover-item" style={{ padding: 0 }}>
            <Link to="/create-article" className="list-button">
              Write an Article
            </Link>
          </li>

          <li className="popover-item" style={{ padding: 0 }}>
            <Link to="/articles" className="list-button">
              Articles
            </Link>
          </li>
          <li className="popover-item" style={{ padding: 0 }}>
            <Link to="/drafts" className="list-button">
              Drafts
            </Link>
          </li>
          <li className="popover-item" style={{ padding: 0 }}>
            <button
              className="list-button"
              onClick={() => {
                handleLogout();
              }}
            >
              Sign out
            </button>
          </li>
        </React.Fragment>
      </ul>
    </Popover>
  );
  return (
    <React.Fragment>
      <div className="create-story-nav create-story-nav-container">
        <div className="create-story-nav-container-inner">
          <div className="nav-block flex1 flex-center">
            <div
              className="block edit-mini-icon"
              style={{ marginRight: "10px" }}
            >
              <Link
                to="/"
                data-log-event="home"
                className="nav-logo fill-black flex0 flex-center padding-top0"
              >
                <span className="inline-block line-height25">
                  <img src={Logo} alt="Sotiotalk" width="30px" height="30px" />
                </span>
              </Link>
            </div>
            {props.dloading === true ? (
              <button
                className="save-draft-button"
                // data-action="show-prepublish"
                // data-action-source="post_edit_prepublish"
                disabled
              >
                <Loader
                  type="TailSpin"
                  color="#000"
                  height={20}
                  width={20}
                  // timeout={3000}
                />
              </button>
            ) : (
              <button
                className="save-draft-button"
                onClick={() => {
                  if (
                    props.floading === false &&
                    props.dloading === false &&
                    props.loading === false
                  ) {
                    props.submitDraftFunc();
                  }
                }}
                disabled={
                  props.dloading === true ||
                  props.floading === true ||
                  props.loading === true
                    ? true
                    : false
                }
              >
                Save Draft
              </button>
            )}
          </div>
          <div className="nav-block flex0 flex-center">
            {props.loading !== true && (
              <div className="flex-center height65 xs-height56 padding-left8 padding-right8 back-option">
                <Link
                  to="/drafts"
                  className="author-option-main-list-item-button"
                >
                  <BsArrowLeft
                    size="1.2rem"
                    style={{ verticalAlign: "middle" }}
                  />
                  Back to drafts
                </Link>
              </div>
            )}

            <div
              className="nav-block flex0 flex-center"
              style={{ paddingRight: "10px" }}
            >
              <div className="flex-center height65 xs-height56 padding-left8 padding-right8">
                {props.loading === true ? (
                  <button
                    className="publish-button button--smaller padding-left10 padding-right10 flex"
                    // data-action="show-prepublish"
                    // data-action-source="post_edit_prepublish"
                    disabled
                  >
                    <Loader
                      type="TailSpin"
                      color="#fff"
                      height={20}
                      width={20}
                      // timeout={3000}
                    />
                  </button>
                ) : (
                  <button
                    className="publish-button button--smaller padding-left10 padding-right10"
                    // data-action="show-prepublish"
                    // data-action-source="post_edit_prepublish"
                    onClick={() => {
                      if (
                        props.floading === false &&
                        props.dloading === false &&
                        props.loading === false
                      ) {
                        props.submitFunc();
                      }
                    }}
                    disabled={
                      props.dloading === true ||
                      props.floading === true ||
                      props.loading === true
                        ? true
                        : false
                    }
                  >
                    <span className="">Save & Publish</span>
                  </button>
                )}
              </div>
            </div>
            {isAuthenticated && (
              <div className="logged-nav-avatar">
                <div className="logged-nav-avatar-inner">
                  <button className="logged-nav-avatar-button">
                    <OverlayTrigger
                      trigger="click"
                      placement="bottom"
                      rootClose
                      overlay={popover}
                    >
                      <img
                        src={Avatar}
                        alt="knlknl"
                        className="logged-nav-avatar-img"
                      />
                    </OverlayTrigger>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditStoryNav;
