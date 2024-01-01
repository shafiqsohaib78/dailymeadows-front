import React, { useEffect } from "react";
import Helmet from "react-helmet";
import { useLocation } from "react-router-dom";
import Pic from "../../../public/drawing-4.svg";
import "./loader.css";
const Loader = () => {
  let location3 = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location3]);
  return (
    <React.Fragment>
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      {/* <filter id="goo"> */}
      <div className="loader">
        <img src={Pic} className="rotate" />
      </div>
      {/* </filter> */}
      {/* <svg>
          <defs>
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="2"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 5 -2"
                result="gooey"
              />
              <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </defs>
        </svg> */}
      {/* </div> */}
    </React.Fragment>
  );
};

export default Loader;
