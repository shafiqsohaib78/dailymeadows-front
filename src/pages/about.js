import React, { useEffect } from "react";
import {} from "gatsby";
import store from "../ReduxStore";
import { loadUser } from "../Actions/CounterAction";

const About = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return <div>About</div>;
};

export default About;
