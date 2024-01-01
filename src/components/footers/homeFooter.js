import React from "react";
import { Link } from "gatsby";
import "../../css/footer.css";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="footer" id="footer">
        {/* <div className="footer-search">
          <div className="footer-search-inner">
            <form className="footer-search-form">
              <input className="footer-search-form-input" />
              <button className="footer-search-form-input-button">
                <div className="footer-search-form-input-button-text">
                  Search
                </div>
                <div className="footer-search-form-input-button-logo">
                  <svg
                    class="footer-search-form-input-button-logo-in"
                    style={{ outline: 0 }}
                    width="10"
                    height="10"
                    viewBox="0 0 20 20"
                    fill="#4D4D4D"
                    tabindex="-1"
                    focusable="false"
                    xmlns="https://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M1.53,8.52H14.76L10,3.71a1.5,1.5,0,0,1,2.12-2.12l7.44,7.47a1.49,1.49,0,0,1,0,2.12l-7.44,7.47a1.5,1.5,0,0,1-2.12,0,1.51,1.51,0,0,1,0-2.12l5-5H1.53a1.5,1.5,0,1,1,0-3Z"></path>
                  </svg>
                </div>
                <div className="footer-search-form-input-button-logo-mini">
                  <svg
                    class="search-icon"
                    style={{ outline: 0 }}
                    width="24"
                    height="24"
                    viewBox="0 0 64 64"
                    fill="#4D4D4D"
                    tabindex="-1"
                    focusable="false"
                    xmlns="https://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M55.3,51.89,42.46,39a19.22,19.22,0,1,0-3.38,3.43L51.9,55.29a2.38,2.38,0,0,0,3.4,0A2.42,2.42,0,0,0,55.3,51.89ZM11.2,27.28a16,16,0,1,1,16,16.07A16.07,16.07,0,0,1,11.2,27.28Z"></path>
                  </svg>
                </div>
              </button>
            </form>
          </div>
        </div> */}
        <div className="footer-login">
          <div className="footer-login-inner">
            <div className="footer-login-icon">
              <svg
                className="user-icon"
                width="24"
                height="24"
                viewBox="0 0 64 64"
                fill="#ffffff"
                tabindex="0"
                focusable="true"
                xmlns="https://www.w3.org/2000/svg"
                aria-labelledby="userIconTitle"
                role="img"
                style={{ outline: 0 }}
              >
                <title id="userIconTitle">User Login</title>
                <path
                  fill-rule="evenodd"
                  d="M32,59.7c-7.9,0-15.5-3.4-20.7-9.3c0.8-1.5,2-2.7,3.4-3.5c4.2-2.5,10.4-3.9,16.9-3.9s12.6,1.4,16.9,3.9 c1.7,0.9,3,2.3,3.6,4.1C47,56.5,39.6,59.7,32,59.7 M36.9,36.7c-5.1,2.9-11.6,1.1-14.5-4c-1.8-3.3-1.8-7.2,0-10.4 c0.9-1.7,2.3-3.3,4.1-4.1c5.2-2.8,11.7-0.9,14.5,4.3c1.7,3.1,1.7,7.1,0,10.2C40,34.4,38.6,35.8,36.9,36.7 M42.3,6.2 c7.5,2.7,13.3,8.8,15.8,16.3c2.9,8.2,1.8,17.5-3,24.8c-1.1-1.7-2.6-3.1-4.3-4.1c-3.3-1.8-6.8-3-10.5-3.7c4.9-3.4,7.3-9.3,6.1-15.2 c-1.2-6-6-10.5-11.9-11.5c-8-1.5-15.8,3.7-17.4,11.7c-1.1,5.9,1.3,11.7,6.2,15.1c-3.7,0.7-7.4,1.8-10.6,3.7 c-1.5,0.9-2.9,2.1-3.9,3.5C5.7,42.3,4.3,37.2,4.3,32C4.3,13.5,22.8-1,42.3,6.2 M42.6,1.8C25.9-4,7.6,4.8,1.8,21.5 c-2.4,6.8-2.4,14.3,0,21.2c3,9.2,10.3,16.5,19.5,19.5c16.7,5.9,35-2.9,40.9-19.7c2.4-6.8,2.4-14.3,0-21.2 C59.2,12.1,52,4.9,42.6,1.8"
                ></path>
              </svg>
            </div>
            <Link to="/login" className="footer-login-text">
              Staff Log In
            </Link>
          </div>
          <hr className="footer-divider"></hr>
        </div>
        <aside style={{ display: "block" }}>
          <div className="footer-links-sec">
            <div className="footer-links-sec-inner">
              <h2 className="footer-links-heading">Explore Daily Meadows</h2>
              <div className="footer-links-dev">
                <ul className="footer-links-list">
                  <li className="footer-link">
                    <Link to="" className="footer-link-link">
                      <span>Home</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/politics" className="footer-link-link">
                      <span>Politics</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/business" className="footer-link-link">
                      <span>Business</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/health" className="footer-link-link">
                      <span>Health</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/sports" className="footer-link-link">
                      <span>Sports</span>
                    </Link>
                  </li>

                  <li className="footer-link">
                    <Link to="/science" className="footer-link-link">
                      <span>Science</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/travel" className="footer-link-link">
                      <span>Travel</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/style" className="footer-link-link">
                      <span>Style</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/weather" className="footer-link-link">
                      <span>Weather</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/technology" className="footer-link-link">
                      <span>Technology</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/education" className="footer-link-link">
                      <span>Education</span>
                    </Link>
                  </li>
                  <li className="footer-link">
                    <Link to="/entertainment" className="footer-link-link">
                      <span>Entertainment</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </aside>
        <hr />
        <br />
        <div className="footer-share-sec">
          <div className="footer-share-sec-inner">
            <div className="footer-share-sec-inner-2">
              <div className="footer-share-left">
                <div className="footer-share-left-logo">
                  <Link to="/" className="footer-share-left-logo-link">
                    <svg
                      className="cnn-badge-icon"
                      style={{ outline: 0 }}
                      width="40"
                      height="40"
                      viewBox="0 0 240 240"
                      fill="#CC0000"
                      xmlns="https://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="#fff"
                      ></rect>
                      <path
                        d="M.31-.07v240h240V-.07ZM86.54,135.29V92.51c0-16.1,20.81-23.83,31.82-5.12.8,1.35,18.14,31.22,18.14,31.22V92.51c0-16.1,20.8-23.83,31.81-5.12.8,1.35,18.14,31.22,18.14,31.22V76.79h10.38V147a2.11,2.11,0,0,1-1.51,2.14c-1.1.3-2.26-.38-3.11-1.82-.17-.28-9-15.46-17.48-30.13L159.17,90.4c-2.18-3.7-5.43-4.35-7.74-3.72a6.23,6.23,0,0,0-4.55,6.13V147a2.12,2.12,0,0,1-1.51,2.14c-1.11.3-2.27-.38-3.11-1.82-.15-.25-8.34-14.36-16.25-28-10.08-17.38-16.7-28.78-16.8-28.95-2.18-3.71-5.44-4.35-7.77-3.72a6.24,6.24,0,0,0-4.56,6.13v53.05a2.9,2.9,0,0,1-2.72,2.71H67.23a28.64,28.64,0,0,1,0-57.28h14v10.36H67.35a18.28,18.28,0,1,0,0,36.56H83.68A2.84,2.84,0,0,0,86.54,135.29Zm124.77,12.05c0,16.1-20.81,23.83-31.82,5.13-.79-1.35-18.14-31.23-18.14-31.23v26.1c0,16.1-20.8,23.83-31.81,5.13-.8-1.35-18.14-31.23-18.14-31.23v24.61c0,11.17-6.63,17.22-17,17.22H67.25a43.14,43.14,0,0,1,0-86.28h14V87.15h-14a32.78,32.78,0,1,0,0,65.56H94.16a7,7,0,0,0,6.86-6.85V92.81a2.1,2.1,0,0,1,1.51-2.13c1.1-.3,2.26.38,3.11,1.82l16.79,28.93c9.76,16.83,16.17,27.88,16.25,28,2.19,3.7,5.45,4.35,7.78,3.71A6.22,6.22,0,0,0,151,147V92.82a2.11,2.11,0,0,1,1.49-2.14c1.09-.3,2.24.38,3.08,1.82l15.56,26.81,17.49,30.15c1.71,2.9,4.09,3.93,6.16,3.93a6,6,0,0,0,1.61-.22A6.23,6.23,0,0,0,201,147V76.79h10.34Z"
                        transform="translate(-0.31 0.07)"
                      ></path>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="footer-share-right">
                <div className="footer-share-right-inner">
                  <span className="footer-share-right-text">
                    Follow Daily Meadows
                  </span>
                  <ul className="follow-share-right-icons">
                    <li className="follow-share-right-icon">
                      <Link to="/" className="follow-share-right-icon-link">
                        <FaFacebook size={24} />
                      </Link>
                    </li>
                    <li className="follow-share-right-icon">
                      <Link to="/" className="follow-share-right-icon-link">
                        <FaTwitter size={24} />
                      </Link>
                    </li>
                    <li className="follow-share-right-icon">
                      <Link to="/" className="follow-share-right-icon-link">
                        <FaInstagram size={24} />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="follow-share-right-login">
                <div className="follow-share-right-login-divider"></div>
                <div className="follow-share-right-login-cont">
                  <div className="follow-share-right-login-cont-inner">
                    <button className="follow-share-right-login-button">
                      <Link
                        to="/login"
                        className="follow-share-right-login-text"
                      >
                        Staff Log In
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="">
          <div className="" style={{ textAlign: "center" }}>
            <span> © </span>
            {new Date().getFullYear()}
            <span> Daily Meadows. All Rights Reserved.</span>
          </div>
          <div className="" style={{ textAlign: "center" }}>
            <span>
              Daily Meadows is not responsible for the content of external
              sites.
            </span>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
