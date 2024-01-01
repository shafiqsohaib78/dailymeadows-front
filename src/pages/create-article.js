import React, { useState, useEffect, useRef } from "react";
import Textarea from "react-expanding-textarea";
import { createReactEditorJS } from "react-editor-js";
import { EDITOR_JS_TOOLS } from "../tools";
import CreateStoryNav from "../components/posts/create-story-nav";
import "../css/upload-button.css";
import "../css/nav.css";
import Footer from "../components/footers/homeFooter";
import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";

const CreateArticle = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const ReactEditorJS = createReactEditorJS();
  const instanceRef = useRef(null);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [loading, setLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [dloading, setDLoading] = useState(false);
  const handleSave = () => {
    console.log("save");
  };
  const handleDraftSave = () => {
    console.log("save draft");
  };
  return (
    <React.Fragment>
      <CreateStoryNav
        submitFunc={handleSave}
        submitDraftFunc={handleDraftSave}
        loading={loading}
        floading={floading}
        dloading={dloading}
      />
      <div style={{ minHeight: "100vh", marginBottom: "2rem" }}>
        <div className="block" style={{ marginTop: "7rem" }}>
          <div className="create-title">
            <Textarea
              rows="1"
              placeholder="Title"
              className="title-textbox font-title"
              // id="title-textbox"
              maxLength="150"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Textarea>
            <span
              className="write-text-counter"
              style={{
                color: title.length < 150 ? "#757575" : "red",
                fontSize: "12px",
              }}
            >
              {title.length}/150
            </span>
            <Textarea
              rows="1"
              placeholder="Subtitle"
              className="title-textbox font-sub"
              // id="title-textbox1"
              value={meta}
              maxLength="200"
              onChange={(e) => {
                setMeta(e.target.value);
              }}
            ></Textarea>
            <span
              className="write-text-counter"
              style={{
                color: meta.length < 200 ? "#757575" : "red",
                fontSize: "12px",
              }}
            >
              {meta.length}/200
            </span>
            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />

            <div
              className="editor-section"
              style={{ cursor: "text", marginBottom: "4rem" }}
            >
              <ReactEditorJS
                // instanceRef={(instance) => (instanceRef.current = instance)}
                tools={EDITOR_JS_TOOLS}
                // onReady={onReady}
                holder="write-article-editor"
              >
                <div id="write-article-editor" />
              </ReactEditorJS>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CreateArticle;
