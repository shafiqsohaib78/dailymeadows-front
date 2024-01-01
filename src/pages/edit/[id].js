import React, { useState, useEffect, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
// import EditorJs from "@natterstefan/react-editor-js";
import { EDITOR_JS_TOOLS } from "../../tools";
import "../../css/write-editor.css";
import TextArea from "react-expanding-textarea";
import { Link } from "gatsby";
import Footer from "../../components/footers/homeFooter";
import EditStoryNav from "../../components/navbars/edit-nav";

// import "../../css/post/tooltip.scss";

import store from "../../ReduxStore";
import { loadUser } from "../../Actions/CounterAction";
const EditStoryInner = (props) => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  const width = useWindowWidth();
  const instanceRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [dloading, setDLoading] = useState(false);
  const [description1, setDescription1] = useState();
  const ReactEditorJS = createReactEditorJS();
  const [title, setTitle] = useState(
    "Ukraine war: Russia launches 'biggest' kamikaze drone attack"
  );
  const [meta, setMeta] = useState(
    `Explosions were heard overnight in the capital, Kyiv, where the mayor said five people had been injured in the "biggest" kamikaze drone attack so far.`
  );
  const description = {
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
  };
  async function handleSave() {
    const savedData = await instanceRef.current.save();

    console.log(window.location);
    console.log(savedData);
    var form = new FormData();
    // form.append("draft_slug", props.match.params.slug);
    form.append("title", title);
    form.append("meta", meta);
    form.append("description", JSON.stringify(savedData));
    console.log(form);
    // form.append("user", user);
  }
  async function submitDraft() {
    const savedData = await instanceRef.current.save();
    console.log(savedData);
    console.log(props.match.params);
    var form = new FormData();
    // form.append("draft_slug", props.match.params.slug);
    form.append("title", title);
    form.append("meta", meta);
    form.append("description", JSON.stringify(savedData));
    // form.append("user", user);
    console.log(form);
  }
  const saveData = async () => {
    const savedData = await instanceRef.current.save();
    console.log(savedData);
  };

  const onReady = async () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };

  return (
    <React.Fragment>
      <EditStoryNav
        submitFunc={handleSave}
        submitDraftFunc={submitDraft}
        {...props}
        data={props.data}
        loading={loading}
        floading={floading}
        dloading={dloading}
      />
      <div style={{ minHeight: "100vh" }}>
        <div className="block" style={{ marginTop: "5rem" }}>
          <div className="create-title">
            {width < 501 && (
              <Link to={`/@sohaib`} className="help-footer-home-link">
                <span>← Back to Article</span>
              </Link>
            )}
            {/* <button
              onClick={() => {
                saveData();
              }}
            >
              Save
            </button> */}

            <TextArea
              // rows="3"
              placeholder="Title (upto-150 characters)"
              className="title-textbox font-title"
              // id="title-textbox"
              maxLength="150"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              value={title}
            ></TextArea>
            <span
              className="write-text-counter"
              style={{
                color: title.length < 150 ? "#757575" : "red",
                fontSize: "12px",
              }}
            >
              {title.length}/150
            </span>

            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <TextArea
              // rows={meta === "" ? 1 : 3}
              placeholder="Subtitle (`Meta`) (upto-200 characters)"
              className="title-textbox font-sub"
              // id="title-textbox1"
              value={meta}
              maxLength="200"
              onChange={(e) => {
                setMeta(e.target.value);
              }}
            ></TextArea>
            <span
              className="write-text-counter"
              style={{
                color: meta.length < 200 ? "#757575" : "red",
                fontSize: "12px",
              }}
            >
              {meta.length}/200
            </span>
            {/* <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} /> */}
            <hr style={{ marginTop: "1rem", marginBottom: "3rem" }} />
            <div
              className="editor-section"
              style={{ cursor: "text", marginBottom: "6rem" }}
            >
              <ReactEditorJS
                // instanceRef={(instance) => (instanceRef.current = instance)}
                onInitialize={(instance) => (instanceRef.current = instance)}
                tools={EDITOR_JS_TOOLS}
                onReady={onReady}
                holder="write-article-editor"
                data={description}
                onChange={() => handleSave()}
              >
                <div id="write-article-editor" />
              </ReactEditorJS>

              {/* <div className="create-title">
                <hr style={{ marginTop: "2rem", marginBottom: "5rem" }} />
              </div> */}
            </div>
          </div>
          {/* <div className="create-title">
              <div className="row">
                <p className="mx-auto story-desc-header">
                  Write your story by clicking below
                </p>
              </div>
            </div> */}
        </div>
      </div>
      <div style={{ borderTop: "3px solid #000" }}>
        <Footer />
      </div>
    </React.Fragment>
  );
};

export default EditStoryInner;

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
