import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/index.css";
import Footer from "../components/footers/homeFooter";
import MainNavbar from "../components/navbars/mainNavbar";
import PostsMain from "../components/posts/posts";

import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";
export default function Business() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <React.Fragment>
      <MainNavbar />
      <PostsMain url="Sports" />
      <div>
        <div>
          <Footer id="footer" />
        </div>
      </div>
    </React.Fragment>
  );
}
