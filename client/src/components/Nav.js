import React from "react";

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
      <a className="navbar-brand" href="/">
        Mongo Scraper
      </a>
      <button
        className="navbar-toggler"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className={"nav-item " + (props.home ? "active" : "")}>
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className={"nav-item " + (props.saved ? "active" : "")}>
            <a className="nav-link" href="/saved">
              Saved Articles
            </a>
          </li>{" "}
          <li className="nav-item">{props.children}</li>
          {props.articles > 0 && (
            <li className="nav-item">
              <button
                className="btn btn-warning"
                onClick={() => props.clearClick()}
              >
                CLEAR ARTICLES!
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
