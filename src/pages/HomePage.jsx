import React from "react";
import SearchBar from "../components/SearchBar";
import NotesList from "../components/NotesList";
import AddButton from "../components/AddButton";
import { getActiveNotes } from "../utils/network-data";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  function changeSearchParams(keyword) {
    setSearchParams({ keyword });
  }

  return (
    <HomePage defaultKeyword={keyword} keywordChange={changeSearchParams} />
  );
}

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      keyword: props.defaultKeyword || "",
    };

    this.onKeywordChangeHandler = this.onKeywordChangeHandler.bind(this);
  }

  async componentDidMount() {
    const { data } = await getActiveNotes();

    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.notes !== this.state.notes) {
      const { data } = await getActiveNotes();
      if (JSON.stringify(data) !== JSON.stringify(this.state.notes)) {
        this.setState(() => {
          return {
            notes: data,
          };
        });
      }
    }
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
      <section className="homepage">
        <h2>{locale === "id" ? "Catatan Aktif" : "Active Notes"}</h2>
        <SearchBar
          keyword={this.state.keyword}
          keywordChange={this.onKeywordChangeHandler}
        />
        <NotesList notes={notes} />
        <Link to="/notes/new">
          <AddButton />
        </Link>
      </section>
    );
  }
}

HomePage.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func,
};

export default HomePageWrapper;
