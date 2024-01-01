import { Link } from "gatsby";
import React from "react";
import "../../css/front.css";
export const FrontMain = () => {
  return (
    <React.Fragment>
      <section className="padding home-front-header">
        <h2 className="home-front-header-title">
          <span className="front-header-title-text">
            Welcome to Daily Meadows
          </span>
          Thursday, 30 March
        </h2>
      </section>
      <section
        className="padding front-posts-container"
        style={{ padding: "2rem 0 25rem 0" }}
      >
        <div className="front-posts-inner">
          <ul className="front-posts-list">
            <li className={`front-post-item item-${"1"}`}>
              <div className="media front-post-hero media-overlay post-link">
                <Link className="" to="/">
                  <div className="post-image">
                    <div className="post-resp-image">
                      <img
                        src="https://ichef.bbc.co.uk/wwhp/800/cpsprodpb/13B33/production/_129219608_sergei_roldugin_getty.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="front-post-content">
                    <h3 className="front-post-title">
                      <Link className="front-post-title-link">
                        US journalist arrested in Russia accused of spying
                      </Link>
                    </h3>
                    <p className="front-post-desc">
                      A cellist who is godfather to the Russian leader's
                      daughter deposited huge sums in Swiss accounts.{" "}
                    </p>
                    <Link className="front-post-topic">Europe</Link>
                  </div>
                </Link>
              </div>
            </li>
            <li className={`front-post-item-min item-${"2"}`}>
              <div className="media front-post-hero media-overlay post-link">
                <Link className="" to="/">
                  <div className="post-image">
                    <div className="post-resp-image">
                      <img
                        src="https://ichef.bbc.co.uk/wwhp/800/cpsprodpb/13B33/production/_129219608_sergei_roldugin_getty.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="front-post-content-min">
                    <h3 className="front-post-title-min">
                      <Link className="front-post-title-link">
                        US journalist arrested in Russia accused of spying
                      </Link>
                    </h3>
                    <Link className="front-post-topic">Europe</Link>
                  </div>
                </Link>
              </div>
            </li>
            <li className={`front-post-item-min item-${"2"}`}>
              <div className="media front-post-hero media-overlay post-link">
                <Link className="" to="/">
                  <div className="post-image">
                    <div className="post-resp-image">
                      <img
                        src="https://ichef.bbc.co.uk/wwhp/800/cpsprodpb/13B33/production/_129219608_sergei_roldugin_getty.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="front-post-content-min">
                    <h3 className="front-post-title-min">
                      <Link className="front-post-title-link">
                        US journalist arrested in Russia accused of spying
                      </Link>
                    </h3>
                    <Link className="front-post-topic">Europe</Link>
                  </div>
                </Link>
              </div>
            </li>
            <li className={`front-post-item-min item-${"2"}`}>
              <div className="media front-post-hero media-overlay post-link">
                <Link className="" to="/">
                  <div className="post-image">
                    <div className="post-resp-image">
                      <img
                        src="https://ichef.bbc.co.uk/wwhp/800/cpsprodpb/13B33/production/_129219608_sergei_roldugin_getty.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="front-post-content-min">
                    <h3 className="front-post-title-min">
                      <Link className="front-post-title-link">
                        US journalist arrested in Russia accused of spying
                      </Link>
                    </h3>
                    <Link className="front-post-topic">Europe</Link>
                  </div>
                </Link>
              </div>
            </li>
            <li className={`front-post-item-min item-${"2"}`}>
              <div className="media front-post-hero media-overlay post-link">
                <Link className="" to="/">
                  <div className="post-image">
                    <div className="post-resp-image">
                      <img
                        src="https://ichef.bbc.co.uk/wwhp/800/cpsprodpb/13B33/production/_129219608_sergei_roldugin_getty.jpg"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="front-post-content-min">
                    <h3 className="front-post-title-min">
                      <Link className="front-post-title-link">
                        US journalist arrested in Russia accused of spying
                      </Link>
                    </h3>
                    <Link className="front-post-topic">Europe</Link>
                  </div>
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </React.Fragment>
  );
};
