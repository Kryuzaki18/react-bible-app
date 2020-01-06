import React, { useState, useEffect } from "react";

import axios from "axios";

import "./App.css";

import Loader from "./Loader";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Searchbar from "./Searchbar";

const Verses = React.lazy(() => import("./Verses"));

const apiBaseUrl = "http://127.0.0.1:7777/v1";

export default () => {
  const [isCollapse, setCollapse] = useState(false);
  const [isCollapseSearch, setCollapseSearch] = useState(true);
  const [books, setBooks] = useState([]);
  const [verses, setVerses] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [isLoad, setIsload] = useState(false);
  const [hasSearchValue, setHasSearchValue] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsload(true);
    fetchBooks();
    if (window.innerWidth <= 768) {
      setCollapseSearch(false);
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    if (books.length > 0 && isLoad) {
      setIsload(false);

      let book = books.filter(data => {
        return data.id === 1;
      })[0];

      let count = 1,
        arrChapters = [],
        chaptersCount = book.chaptersCount;

      while (chaptersCount >= count) {
        arrChapters.push(count);
        count++;
      }

      book.chapters = arrChapters;
      book.isActive = true;
      setSelectedBook(book);

      fetchVerses({
        bookdId: book.id,
        chapter: 1
      });
    }
  }, [books, isLoad]);

  const fetchBooks = () => {
    axios
      .get(`${apiBaseUrl}/books`)
      .then(response => {
        if (response.status === 200) setBooks(response.data);
      })
      .catch(error => {});
  };

  const setActiveBook = name => {
    const newBook = books.map(book => {
      book.isActive = book.name === name ? true : false;
      return book;
    });
    setBooks(newBook);
  };

  const collapse = () => {
    if (isMobile) setCollapseSearch(false);
    const newIsCollapse = !isCollapse;
    setCollapse(newIsCollapse);
  };

  const collapseSearch = () => {
    setCollapse(false);
    setHasSearchValue(false);
    const newIsCollapseSearch = !isCollapseSearch;
    setCollapseSearch(newIsCollapseSearch);
  };

  const getVerses = bookId => {
    const book = getBook(bookId);
    fetchVerses({
      bookdId: book.id,
      chapter: 1
    });

    setHasSearchValue(false);
    if (isCollapseSearch) {
      document.getElementsByClassName("search").search.value = "";
      const selectChapter = document.getElementsByClassName("select-chapter");
      if (selectChapter.length > 0) selectChapter[0][0].selected = true;
    }
  };

  const getBook = bookId => {
    let book = books.filter(data => {
      return data.id === bookId;
    })[0];

    let count = 1,
      chaptersCount = book.chaptersCount,
      arrChapters = [];

    while (chaptersCount >= count) {
      arrChapters.push(count);
      count++;
    }

    book.chapters = arrChapters;
    setSelectedBook(book);
    return book;
  };

  const fetchVerses = ({ bookdId, chapter }) => {
    setSelectedChapter(chapter);
    axios
      .get(`${apiBaseUrl}/verses?bookId=${bookdId}&chapter=${chapter}`)
      .then(response => {
        if (response.status === 200) setVerses(response.data);
      })
      .catch(error => {});
  };

  const selectChapter = ({ chapter, status }) => {
    let newSelectedChapter = chapter ? chapter : selectedChapter;
    const selectChapter = document.getElementsByClassName("select-chapter");
    document.getElementsByClassName("search").search.value = "";
    setHasSearchValue(false);

    if (status === "next") {
      newSelectedChapter = selectedChapter + 1;
      selectChapter[0][selectedChapter].selected = true;
    } else if (status === "prev") {
      if (newSelectedChapter > 1) {
        newSelectedChapter = selectedChapter - 1;
        selectChapter[0][newSelectedChapter - 1].selected = true;
      } else return;
    }

    fetchVerses({
      bookdId: selectedBook.id,
      chapter: newSelectedChapter
    });
  };

  const debounceEvent = (callback, time = 500, interval) => (...args) =>
    clearTimeout(interval, (interval = setTimeout(callback, time, ...args)));

  const search = debounceEvent(async value => {
    if (value.length === 0) {
      selectChapter({
        chapter: selectedChapter
      });
      return;
    } else if (value.length <= 2) return;

    const filterVerses = await verses.filter(verse => {
      return verse.text.toLowerCase().search(value.toLowerCase()) !== -1;
    });

    if (filterVerses.length > 0) {
      setHasSearchValue(true);
      setVerses(filterVerses);
    }
  });

  return (
    <div className="app-wrapper">
      <header className="header">
        <Header
          isCollapse={isCollapse}
          collapse={collapse}
          collapseSearch={collapseSearch}
        />
      </header>
      <main className="main flex-row">
        {isCollapse && (
          <Sidebar
            books={books}
            getVerses={getVerses}
            setActiveBook={setActiveBook}
          />
        )}
        <div className="verse-wrapper">
          {verses.length > 0 && (
            <React.Fragment>
              <Searchbar
                selectedBook={selectedBook}
                selectChapter={selectChapter}
                selectedChapter={selectedChapter}
                search={search}
                isCollapseSearch={isCollapseSearch}
                hasSearchValue={hasSearchValue}
              />

              <React.Suspense fallback={<Loader />}>
                <Verses
                  verses={verses}
                  isCollapseSearch={isCollapseSearch}
                  selectChapter={selectChapter}
                  isMobile={isMobile}
                />
              </React.Suspense>
            </React.Fragment>
          )}
        </div>
      </main>
    </div>
  );
};
