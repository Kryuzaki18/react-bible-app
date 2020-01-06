import React from "react";
import searchIcon from "../assets/images/search.svg";

export default React.memo(({ isCollapse, collapse, collapseSearch }) => {
  const hamburger = document.getElementById("hamburger");

  const handleHamburgerAnimation = () => {
    if (!isCollapse) hamburger.classList.add("active");
    else hamburger.classList.remove("active");

    collapse();
  };

  const handleCollapseSearch = () => {
    hamburger.classList.remove("active");
    collapseSearch();
  };

  return (
    <header className="header-wrapper flex-row">
      <div
        className="hamburger-wrapper"
        onClick={handleHamburgerAnimation.bind()}
      >
        <div id="hamburger" className="hamburger"></div>
      </div>

      <div className="app-title-wrapper">
        <span className="app-title">The Bible - King James Version</span>
      </div>

      <div
        className="search-icon-wrapper"
        onClick={handleCollapseSearch.bind()}
      >
        <img src={searchIcon} alt="search" />
      </div>
    </header>
  );
});
