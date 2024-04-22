import React from "react";
import SearchBar from "../components/SearchBar";
import ArchievedNotesList from "../components/ArchievedNotesList";
import { getArchivedNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

function ArchievesPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <ArchievesPage
      defaultKeyword={keyword}
      keywordChange={changeSearchParams}
    />
  );
}

class ArchievesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getArchivedNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  onKeywordChangeHandler(keyword) {
    this.setState(() => {
      return {
        keyword,
      };
    });

    this.props.keywordChange(keyword);
  }

  render() {
    const notes = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.keyword.toLowerCase());
    });

    const locale = localStorage.getItem("locale");

    return (
      <section className="ArchievesPage">
        <h2>{locale === "id" ? "Catatan Arsip" : "Archived Notes"}</h2>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <ArchievedNotesList notes={notes} />
      </section>
    );
  }
}

ArchievesPage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default ArchievesPageWrapper;
