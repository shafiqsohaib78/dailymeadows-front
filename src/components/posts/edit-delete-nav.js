import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "gatsby";

const EditDeleteNav = (props) => {
  return (
    <div className="create-story-nav">
      {/* <div className="create-story-nav-container-inner"> */}
      <div className="nav-block">
        {/* <div className="home-page-bottom-options">
            <div className="home-page-bottom-options-left"> */}
        <section className="single-post-section">
          <div className="single-post-header">
            <div className="single-post-header-padded" key={1}>
              <div style={{ float: "right" }}>
                <button className="edit-delete-button">
                  <Link className="link" to={`/drafts-edit/${props.slug}`}>
                    Edit
                  </Link>
                </button>
                <button
                  className="edit-delete-button"
                  style={{ marginLeft: "1rem" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* </div> */}
    </div>
  );
};
export default EditDeleteNav;
