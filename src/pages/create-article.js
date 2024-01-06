import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Textarea from "react-expanding-textarea";
import { createReactEditorJS } from "react-editor-js";
// import EditorJS from "@editorjs/editorjs";
import { EDITOR_JS_TOOLS } from "../tools";
// import { EDITOR_JS_TOOLS } from "../tools";
import CreateStoryNav from "../components/posts/create-story-nav";
import "../css/upload-button.css";
import "../css/nav.css";
import Footer from "../components/footers/homeFooter";
import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { BsArrowLeft } from "react-icons/bs";
import Swal from "sweetalert2";
import { map } from "jquery";
import { Link } from "gatsby";
const animatedComponents = makeAnimated();

const CreateArticle = () => {
  const { user, username, token, isAuthenticated } = useSelector(
    (state) => ({
      user: state.user ? state.user.id : "",
      token: state.user ? state.user.token : null,
      username: state.user ? state.user.username : "",
      isAuthenticated: state.isAuthenticated,
    }),
    shallowEqual
  );
  const ReactEditorJS = createReactEditorJS();
  let editor = null;
  const instanceRef = useRef(null);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [loading, setLoading] = useState(false);
  const [floading, setFLoading] = useState(false);
  const [dloading, setDLoading] = useState(false);
  const [read_min, setRead_Min] = useState(2);
  const [category, setCategory] = useState();
  const [category2, setCategory2] = useState([]);
  const [description, setDiscription] = useState();

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  useEffect(() => {
    if (isAuthenticated === false) {
      window.location.href = "/";
    }
  }, [isAuthenticated]);

  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleDraftSave = () => {
    console.log("save draft");
    setDLoading(true);
    const timeoutId = setTimeout(async () => {
      console.log(category);
      var form = new FormData();
      form.append("title", title);
      form.append("meta", meta);
      form.append("description", JSON.stringify(description));
      form.append("category", JSON.stringify(category2));
      form.append("user", token);
      form.append("read_min", read_min);
      if (
        description !== undefined &&
        title.length > 20 &&
        meta.length > 20 &&
        category2.length !== 0
      ) {
        axios
          .post("http://127.0.0.1:8000/api/draft-create/", form, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `JWT ${token}`,
            },
          })
          .then((res) => {
            setDLoading(false);
            window.location.href = `/drafts`;
          })
          .catch((err) => {
            console.log(err.response);
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
              title: err.response.data.message,
            });
            setDLoading(false);
          });
      } else {
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
          title: "Title, Meta, Description, & Category is Must!",
        });
        setDLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  };
  const handleTitleChange = async (event) => {
    setTitle(
      event.target.value && event.target.value && event.target.value
        ? event.target.value
        : ""
    );
  };
  const handleMetaChange = async (event) => {
    setMeta(
      event.target.value && event.target.value && event.target.value
        ? event.target.value
        : ""
    );
  };
  const handleDescriptionChange = async () => {
    // console.log(event.target.value);
    const savedData = await editorCore.current.save();
    setDiscription(savedData);
  };
  const read_min_options = [
    { value: 1, label: "1 Minute" },
    { value: 2, label: "2  Minute" },
    { value: 3, label: "3  Minute" },
    { value: 4, label: "4  Minute" },
    { value: 5, label: "5  Minute" },
    { value: 6, label: "6 Minute" },
    { value: 7, label: "7 Minute" },
    { value: 8, label: "8 Minute" },
    { value: 9, label: "9 Minute" },
    { value: 10, label: "10 Minute" },
  ];
  const options = [
    { value: "Politics", label: "Politics" },
    { value: "Business", label: "Business" },
    { value: "Sports", label: "Sports" },
    { value: "Travel", label: "Travel" },
    { value: "Health", label: "Health" },
    { value: "Style", label: "Style" },
    { value: "Science", label: "Science" },
    { value: "Technology", label: "Technology" },
    { value: "Education", label: "Education" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Weather", label: "Weather" },
  ];
  const handleReadMinChange = (e) => {
    if (e !== null) {
      console.log(e.value);
      const timeoutId = setTimeout(async () => {
        setRead_Min(e.value);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  };
  const handleCategoryChange = (e) => {
    console.log(e);
    const timeoutId = setTimeout(async () => {
      setCategory(e);
    }, 500);
    return () => clearTimeout(timeoutId);
  };
  useEffect(() => {
    let category3 = [];
    const timeoutId = setTimeout(async () => {
      category?.map((item, index) => {
        category3.push(item.value);
      });
      console.log(category3);
      setCategory2(category3);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [category]);

  const submit = () => {
    setFLoading(true);
    const timeoutId = setTimeout(async () => {
      console.log(category);
      var form = new FormData();
      form.append("title", title);
      form.append("meta", meta);
      form.append("description", JSON.stringify(description));
      form.append("category", JSON.stringify(category2));
      form.append("user", token);
      form.append("read_min", read_min);
      if (
        description !== undefined &&
        title.length > 20 &&
        meta.length > 20 &&
        category2.length !== 0
      ) {
        axios
          .post("http://127.0.0.1:8000/api/articles-create/", form, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `JWT ${token}`,
            },
          })
          .then((res) => {
            setFLoading(false);
            window.location.href = `/articles`;
          })
          .catch((err) => {
            console.log(err.response);
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
              title: err.response.data.message,
            });
            setFLoading(false);
          });
      } else {
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
          title: "Title, Meta, Description, & Category is Must!",
        });
        setFLoading(false);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  };
  return (
    <React.Fragment>
      <CreateStoryNav
        // submitFunc={handleSave}
        submitFunc={submit}
        submitDraftFunc={handleDraftSave}
        loading={loading}
        floading={floading}
        dloading={dloading}
      />
      <div style={{ minHeight: "100vh", marginBottom: "2rem" }}>
        <div className="block" style={{ marginTop: "6rem" }}>
          <div className="go-back-link">
            <BsArrowLeft />
            <Link className="go-back-link-link" to="/">
              Go To Homepage
            </Link>
          </div>
        </div>
        <div className="block" style={{ marginTop: "2rem" }}>
          <div className="create-title" style={{ marginBottom: "2rem" }}>
            <Textarea
              rows="1"
              placeholder="Title"
              className="title-textbox font-title"
              // id="title-textbox"
              maxLength="150"
              onChange={(e) => {
                handleTitleChange(e);
              }}
            />
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
                handleMetaChange(e);
              }}
            />
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
                onInitialize={handleInitialize}
                tools={EDITOR_JS_TOOLS}
                holder="write-article-editor"
                onChange={handleDescriptionChange}
                // onReady={onReady}
              >
                <div id="write-article-editor" />
              </ReactEditorJS>
            </div>
            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={}
              placeholder={<div>Select Article Category!</div>}
              isMulti
              options={options}
              onChange={(e) => handleCategoryChange(e)}
            />
            <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              // defaultValue={}
              placeholder={<div>Select Total Reading Minutes!</div>}
              options={read_min_options}
              onChange={(e) => handleReadMinChange(e)}
              classNamePrefix="select"
              isClearable
            />
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default CreateArticle;

{
  /* <EditorJs
  instanceRef={(instance) => (instanceRef.current = instance)}
  tools={EDITOR_JS_TOOLS}
  onReady={onReady}
  holder="write-article-editor"
>
  <div id="write-article-editor" />
</EditorJs> */
}

// const editor = new EditorJS({
//   /**
//    * Id of Element that should contain the Editor
//    */
//   holder: "write-article-editor",
//   // readOnly: true,
//   // autofocus: true,
//   onReady:onReady,
//   // data: DEFAULT_INITIAL_DATA,

//   /**
//    * Available Tools list.
//    * Pass Tool's class or Settings object for each Tool you want to use
//    */
//   tools: EDITOR_JS_TOOLS,
// });
// const handleSaveEditor = () => {
//   editor
//     .save()
//     .then((outputData) => {
//       console.log("Article data: ", outputData);
//     })
//     .catch((error) => {
//       console.log("Saving failed: ", error);
//     });
// };

// const handleSave = () => {
//   console.log("save");
//   // var form=new FormData();
//   // handleSaveEditor();

// };
