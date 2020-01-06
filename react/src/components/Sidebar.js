import React from "react";
export default React.memo(({ books, getVerses, setActiveBook }) => {
  const list = () => {
    const content = books.map(({ id, name, chaptersCount, isActive }, key) => (
      <li key={key}>
        <button
          onClick={e => {
            e.preventDefault();
            getVerses(id);
            setActiveBook(name);
          }}
          className={isActive ? "active" : ""}
        >
          <span>{name}</span>
          <span className="chapters-count">{chaptersCount}</span>
        </button>
      </li>
    ));

    return content;
  };

  return (
    <aside id="sidebar" className="sidebar-wrapper">
      <ul className="book-lists">{list()}</ul>
    </aside>
  );
});
