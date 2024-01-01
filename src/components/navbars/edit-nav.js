import React, { useEffect, useState } from "react";
import "../../css/nav.css";
import { BsThreeDots, BsArrowLeft } from "react-icons/bs";
import { Link } from "gatsby";
import Logo from "../../../public/drawing-4.svg";
import Loader from "react-loader-spinner";

const EditStoryNav = (props) => {
  const width = useWindowWidth;
  const [data, setData] = useState();
  const [resendLoading, setResendLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [notCount, setNotCount] = useState();

  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {
    setTimeout(() => {
      setData(props.data);
    }, 1000);
  };

  const handleLogout = async () => {
    const timeoutId = setTimeout(() => {
      localStorage.removeItem("_token_auth_user");
    }, 1000);
    return () => clearTimeout(timeoutId);
  };
  const handleReload = async () => {
    const timeoutId = setTimeout(() => {
      window.location.reload();
    }, 1000);
    return () => clearTimeout(timeoutId);
  };
  return (
    <React.Fragment>
      <div className="create-story-nav create-story-nav-container">
        <div className="create-story-nav-container-inner">
          <div className="nav-block flex1 flex-center">
            <div
              className="block edit-mini-icon"
              style={{ marginRight: "10px" }}
            >
              <a
                href="/"
                data-log-event="home"
                className="nav-logo fill-black flex0 flex-center padding-top0"
              >
                <span className="inline-block line-height25">
                  <img src={Logo} alt="Sotiotalk" width="30px" height="30px" />
                </span>
              </a>
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
                  if (props.floading === false) {
                    props.submitDraftFunc();
                  }
                }}
                disabled={
                  props.dloading === true || props.floading === true
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
                  to="/me/articles/drafts"
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
                      if (props.floading === false) {
                        props.submitFunc();
                      }
                    }}
                    disabled={
                      props.dloading === true || props.floading === true
                        ? true
                        : false
                    }
                  >
                    <span className="">Save & Publish</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default EditStoryNav;

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
