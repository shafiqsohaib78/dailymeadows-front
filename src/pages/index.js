import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../css/index.css";
import Footer from "../components/footers/homeFooter";
import MainNavbar from "../components/navbars/mainNavbar";
import FrontSection from "../components/home/homefront";
import LowerNews from "../components/home/lower-news";
import reduxStore from "../ReduxStore";
import { useSelector, connect } from "react-redux";
import {
  increment,
  decrement,
  reset,
  loadUser,
} from "../Actions/CounterAction";
import styled from "styled-components";
import store from "../ReduxStore";

const Home = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <React.Fragment>
      <MainNavbar />
      <main>
        <div className="news-container">
          <FrontSection />
        </div>
      </main>
      <hr />
      <LowerNews />
      <div>
        <div>
          <Footer id="footer" />
        </div>
      </div>
    </React.Fragment>
  );
};
export default connect(
  (state) => ({ counterData: state.counterData }),
  null
)(Home);
