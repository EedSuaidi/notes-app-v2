import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import PropTypes from "prop-types";

function SearchBar({ keyword, keywordChange }) {
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  return (
    <section className="search-bar">
      <input
        className="search-bar"
        type="text"
        placeholder={
          locale === "id" ? "Cari berdasarkan judul ..." : "Search by title ..."
        }
        value={keyword}
        onChange={(event) => keywordChange(event.target.value)}
      />
    </section>
  );
}

SearchBar.propType = {
  keyword: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
};

export default SearchBar;
