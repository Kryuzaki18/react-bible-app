import React from "react";

import reloadIcon from "../assets/images/reload.svg";

export default React.memo(
  ({ verses, isCollapseSearch, selectChapter, isMobile }) => {
    return (
      <div className="verse-details">
        {verses.map(({ verse, text }, key) => (
          <React.Fragment key={key}>
            <span className="verse-number">{verse}</span>
            <span className="verse-text">{text}</span>
          </React.Fragment>
        ))}
        {isCollapseSearch && isMobile && (
          <div className="reload-wrapper">
            <div
              className="reload"
              onClick={e => {
                selectChapter({ status: "" });
                document.getElementsByClassName("search").search.value = "";
              }}
            >
              <img src={reloadIcon} alt="Refresh" width="12px" />
              &#160;
              <span>Refresh</span>
            </div>
          </div>
        )}
      </div>
    );
  }
  // (oldProps, newProps) => {
  // if (
  //   oldProps.isSearching === newProps.isSearching &&
  //   oldProps.verses[0].chapter === newProps.verses[0].chapter &&
  //   oldProps.verses[0].bookId === newProps.verses[0].bookId
  // ) {
  //   return true;
  // }
  // }
);
