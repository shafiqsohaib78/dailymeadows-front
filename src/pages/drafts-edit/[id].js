import React, { useState, useEffect, useRef } from "react";
import { createReactEditorJS } from "react-editor-js";
// import EditorJs from "@natterstefan/react-editor-js";
import { EDITOR_JS_TOOLS } from "../../tools";
import "../../css/write-editor.css";
import TextArea from "react-expanding-textarea";
import { Link } from "gatsby";
import Footer from "../../components/footers/homeFooter";
import EditPostNav from "../../components/navbars/edit-post-nav";
// import EditStoryNav from "../../components/navbars/edit-nav";

// import "../../css/post/tooltip.scss";

import store from "../../ReduxStore";
import { loadUser } from "../../Actions/CounterAction";
import Swal from "sweetalert2";
import { shallowEqual, useSelector } from "react-redux";
import axios from "axios";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { TailSpin } from "react-loader-spinner";
const animatedComponents = makeAnimated();

const EditDraftStoryInner = (props) => {
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
        setLoading(true);
        getPost();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isAuthenticated]);
  // useEffect(() => {
  //   setLoading(true);
  //   getPost();
  // }, []);
  const width = useWindowWidth();
  const instanceRef = useRef(null);
  const [title, setTitle] = useState("");
  const [meta, setMeta] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [loading, setLoading] = useState(true);
  const [floading, setFLoading] = useState(false);
  const [dloading, setDLoading] = useState(false);
  const [read_min, setRead_Min] = useState(2);
  const [read_minD, setRead_MinD] = useState();
  const [category, setCategory] = useState();
  const [category2, setCategory2] = useState([]);
  const [description, setDescription] = useState();
  const [post, setPost] = useState([]);
  const ReactEditorJS = createReactEditorJS();
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);
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

  const getPost = () => {
    console.log(props.id);
    const timeoutId = setTimeout(async () => {
      await axios
        .get(`http://127.0.0.1:8000/api/draft-detail/?post=${props.id}`)
        .then((res) => {
          console.log(res.data[0]);
          // if (res.data.results.length > 0) {
          if (res.data) {
            // setTitle(res.data[0].title);
            // setMeta(res.data[0].meta);
            // setRead_Min(res.data[0].read_min);
            // setDescription(res.data[0].description);
            // setCategory(res.data[0].description);
            setPost(res.data);
            setIsEmpty(false);
            // handleEditPostPrevData();
          } else {
            setIsEmpty(true);
            setLoading(false);
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
          setLoading(false);
        });
    }, 1000);
    return () => clearTimeout(timeoutId);
  };
  const submitDraft = () => {
    setDLoading(true);
    console.log("save draft");
    const timeoutId = setTimeout(async () => {
      console.log(category2);
      var form = new FormData();
      form.append("title", title);
      form.append("meta", meta);
      form.append("description", JSON.stringify(description));
      form.append("category", JSON.stringify(category2));
      form.append("user", token);
      form.append("read_min", read_min);
      form.append("slug", props.id);
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
  const saveData = async () => {
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
      form.append("slug", props.id);
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

  const handleDescriptionChange = async () => {
    // console.log(event.target.value);
    const savedData = await editorCore.current.save();
    setDescription(savedData);
  };

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
  useEffect(() => {
    console.log(post.length);
    if (post.length > 0) {
      handleEditPostPrevData();
    }
  }, [post.length]);
  const handleEditPostPrevData = () => {
    const timeoutId = setTimeout(async () => {
      const category4 = [];
      const read_min2 = [];
      post &&
        post.map((item) => {
          setTitle(item.title);
          setMeta(item.meta);
          setDescription(JSON.parse(item.description));
          read_min_options.map((item3, index4) => {
            if (item.read_min == item3.value) {
              read_min2.push(read_min_options[index4]);
            }
          });
          console.log(read_min2);
          setRead_MinD(read_min2);
          item.category.map((item1, index2) => {
            console.log(item1);
            options.map((item2, index3) => {
              console.log(item2.value);
              if (item1 == item2.value) {
                category4.push(options[index3]);
              }
            });
          });
          console.log(category4);
          setCategory(category4);
        });
      setLoading(false);
    }, 500);
    console.log(read_min_options[4]);
    return () => clearTimeout(timeoutId);
  };
  useEffect(() => {
    let category3 = [];
    const timeoutId = setTimeout(async () => {
      category &&
        category.map((item, index) => {
          category3.push(item.value);
        });
      console.log(category3);
      setCategory2(category3);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [category]);

  return (
    <React.Fragment>
      {loading == true ? (
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
            <>
              {/* <EditStoryNav
                submitFunc={saveData}
                submitDraftFunc={submitDraft}
                {...props}
                // data={props.data}
                loading={loading}
                floading={floading}
                dloading={dloading}
              /> */}
              <EditPostNav
                // submitFunc={handleSave}
                submitFunc={saveData}
                submitDraftFunc={submitDraft}
                loading={loading}
                floading={floading}
                dloading={dloading}
              />
              <div style={{ minHeight: "100vh" }}>
                <div className="block" style={{ marginTop: "2rem" }}>
                  <section className="posts-catogory-header">
                    <h1 className="posts-header-text">Edit Drafts</h1>
                    <span className="posts-divider"></span>
                  </section>
                  <div
                    className="create-title"
                    style={{ marginBottom: "2rem" }}
                  >
                    {width < 501 && (
                      <Link to={`/drafts`} className="link">
                        <span>← Back to Drafts</span>
                      </Link>
                    )}
                    <TextArea
                      // rows="3"
                      placeholder="Title (upto-150 characters)"
                      className="title-textbox font-title"
                      // id="title-textbox"
                      maxLength="150"
                      onChange={(e) => {
                        handleTitleChange(e.target.value);
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
                        handleMetaChange(e.target.value);
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
                        data={description}
                        onChange={handleDescriptionChange}
                        // onInitialize={(instance) => (instanceRef.current = instance)}
                        // tools={EDITOR_JS_TOOLS}
                        // onReady={onReady}
                        // holder="write-article-editor"
                        // onChange={() => handleSave()}
                      >
                        <div id="write-article-editor" />
                      </ReactEditorJS>

                      {/* <div className="create-title">
                          <hr style={{ marginTop: "2rem", marginBottom: "5rem" }} />
                        </div> */}
                    </div>
                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={category}
                      placeholder={<div>Select Article Category!</div>}
                      isMulti
                      options={options}
                      onChange={(e) => handleCategoryChange(e)}
                    />
                    <hr style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                    <Select
                      closeMenuOnSelect={false}
                      components={animatedComponents}
                      defaultValue={read_minD}
                      placeholder={<div>Select Total Reading Minutes!</div>}
                      options={read_min_options}
                      onChange={(e) => handleReadMinChange(e)}
                      classNamePrefix="select"
                      isClearable
                    />
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
            </>
          )}
        </>
      )}
    </React.Fragment>
  );
};

export default EditDraftStoryInner;

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
