import React from "react";
import { showFormattedDate } from "../utils";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import parser from "html-react-parser";

function NoteItem({ id, title, createdAt, body }) {
  return (
    <article className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{showFormattedDate(createdAt)}</p>
      <p className="note-item__body">{parser(body)}</p>
    </article>
  );
}

NoteItem.propType = {
  id: PropTypes.string,
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.number.isRequired,
  body: PropTypes.string.isRequired,
};

export default NoteItem;
