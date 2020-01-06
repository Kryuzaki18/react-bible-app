import React from "react";
import clearIcon from "../assets/images/clear.svg";
export default React.memo(
  ({
    selectedBook,
    selectedChapter,
    selectChapter,
    search,
    isCollapseSearch,
    hasSearchValue
  }) => {
    const { name, chapters } = selectedBook;

    const clearSearch = () => {
      selectChapter({ status: "" });
      document.getElementsByClassName("search").search.value = "";
    };

    const searchVerses = e => {
      e.preventDefault();
      const value = e.target.value;
      search(value);
    };

    return (
      <div className="searchbar flex-row">
        <div className="verse-header">
          <span>Book of</span>
          <span className="roboto-black">"{name}"</span>
          <span>|</span>
          <span>Chapter {selectedChapter}</span>
        </div>
        {isCollapseSearch && (
          <div className="search-div flex-row">
            <div className="search-wrapper">
              <input
                className="search"
                type="text"
                name="search"
                placeholder="Search keyword..."
                onChange={e => searchVerses(e)}
              />
              {hasSearchValue && (
                <img
                  className="clear-search"
                  src={clearIcon}
                  alt="clear search"
                  onClick={clearSearch.bind()}
                />
              )}

              {chapters.length > 1 && (
                <select
                  className="select-chapter"
                  onChange={e => {
                    selectChapter({
                      chapter: parseInt(e.target.value.replace("Chapter", ""))
                    });
                  }}
                >
                  {chapters.map((data, key) => (
                    <option key={key}>Chapter {data}</option>
                  ))}
                </select>
              )}
            </div>

            <div className="btn-wrapper">
              {selectedChapter > 1 && (
                <button
                  className="button-prev"
                  onClick={() => {
                    selectChapter({ status: "prev" });
                  }}
                >
                  Previous Chapter
                </button>
              )}
              {selectedChapter < chapters.length && (
                <button
                  className="button-next"
                  onClick={() => {
                    selectChapter({ status: "next" });
                  }}
                >
                  Next Chapter
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
