import React from "react";
import ArchiveButton from "../components/ArchiveButton";
import DeleteButton from "../components/DeleteButton";
import { getNote } from "../utils/network-data";
import { showFormattedDate } from "../utils";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import parser from "html-react-parser";

function DetailPageWrapper() {
  const { id } = useParams();
  return <DetailPage id={id} />;
}

class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      note: null,
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const { error, data } = await getNote(id);

    if (!error) {
      this.setState({ note: data });
    } else {
      // Handle error jika diperlukan
      console.error("Error fetching note");
    }
  }

  render() {
    const { note } = this.state;

    if (!note) {
      return <></>;
    }

    const { id, title, createdAt, body, archived } = note;

    return (
      <section className="detail-page">
        <h3 className="detail-page__title">{title}</h3>
        <p className="detail-page__createdAt">{showFormattedDate(createdAt)}</p>
        <div className="detail-page__body">{parser(body)}</div>
        <div className="detail-page__action">
          <ArchiveButton id={id} archived={archived} />
          <DeleteButton id={id} />
        </div>
      </section>
    );
  }
}

DetailPage.propTypes = {
  id: PropTypes.string.isRequired,
};

export default DetailPageWrapper;
