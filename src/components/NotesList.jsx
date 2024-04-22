import React from "react";
import NoteItem from "./NoteItem";
import LocaleContext from "../contexts/LocaleContext";
import PropTypes from "prop-types";

function NotesList({ notes }) {
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  if (notes.filter((note) => note.archived === false).length == 0) {
    return (
      <section className="notes-list-empty">
        <p className="notes-list__empty">
          {locale === "id" ? "Tidak ada catatan" : "No Notes"}
        </p>
      </section>
    );
  } else {
    return (
      <section className="notes-list">
        {notes
          .filter((note) => note.archived === false)
          .map((note) => (
            <NoteItem key={note.id} {...note} />
          ))}
      </section>
    );
  }
}

NotesList.propType = {
  notes: PropTypes.array,
};

export default NotesList;
