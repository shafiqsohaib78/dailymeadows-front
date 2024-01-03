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
import Swal from "sweetalert2";
import { map } from "jquery";
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
  const [category1, setCategory1] = useState("");
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
  const onReady = async () => {
    // https://editorjs.io/configuration#editor-modifications-callback
    console.log("Editor.js is ready to work!");
  };
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(title);
    console.log(meta);
    console.log(savedData);
    const timeoutId = setTimeout(async () => {
      console.log(category);
      var form = new FormData();
      form.append("title", title);
      form.append("meta", meta);
      form.append("description", JSON.stringify(savedData));
      form.append("user", token);
      if (savedData.blocks.length > 0 && title.length > 0 && meta.length > 0) {
        axios
          .post("http://127.0.0.1:8000/api/articles-create/", form, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `JWT ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            console.log(res.status);
            setLoading(false);
            window.location.href = `/@${username}`;
            setFLoading(false);
          })
          .catch((err) => {
            console.log(err.response.data.message);
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
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleDraftSave = () => {
    console.log("save draft");
  };
  const handleTitleChange = async (event) => {
    // console.log(event.target.value);
    setTitle(
      event.target.value && event.target.value && event.target.value
        ? event.target.value
        : ""
    );
    // const timeoutId = setTimeout(async () => {
    //   console.log(title);
    // }, 1000);
    // return () => clearTimeout(timeoutId);
  };
  const handleMetaChange = async (event) => {
    // console.log(event.target.value);
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
      // category?.map((item, index) => {
      //   category2 += index === 0 ? `${item.value}` : `, ${item.value}`;
      // });
      console.log(category3);
      setCategory2(category3);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [category]);
  const submit = () => {
    console.log(title);
    console.log(meta);
    console.log(description);
    console.log(category1);
    console.log(read_min);
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
            console.log(res.data);
            console.log(res.status);
            setLoading(false);
            window.location.href = `/articles`;
            setFLoading(false);
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
        <div className="block" style={{ marginTop: "7rem" }}>
          <div className="create-title">
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
                // onReady={onReady}
                holder="write-article-editor"
                onChange={handleDescriptionChange}
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
