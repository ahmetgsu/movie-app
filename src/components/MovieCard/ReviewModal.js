import React, { useContext } from "react";
import Context from "../../contexts/movieCardContext";
import { useSelector } from "react-redux";
import { Image, Button, Modal, Header, Container } from "semantic-ui-react";

const ReviewModal = () => {
  const movieData = useSelector(state => state.movies.selectedMovieData);
  const reviews = useSelector(state => state.movies.selectedMovieReviews);
  const context = useContext(Context);
  const { handleOpen, handleClose, modalOpen } = context;

  return (
    <Modal
      trigger={
        <p onClick={handleOpen} style={{ cursor: "pointer", fontSize: "19px" }}>
          Reviews
        </p>
      }
      open={modalOpen}
      onClose={handleClose}
    >
      <Modal.Header>{movieData.title} Reviews</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size="large"
          src={`https://image.tmdb.org/t/p/w342${movieData.poster_path}`}
          wrapped
        />
        <Modal.Description>
          {reviews.results.map((item, index) => (
            <React.Fragment key={index}>
              <Header as="h3">Author: {item.author}</Header>
              <Container textAlign="justified" style={{ fontSize: "18px" }}>
                {item.content.length > 500
                  ? `${item.content.slice(0, 500)}...`
                  : item.content}
              </Container>
              <br />
              {item.content.length > 500 ? (
                <Container>
                  To read the whole content please visit:{" "}
                  <strong>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.url}
                    </a>
                  </strong>
                </Container>
              ) : null}
            </React.Fragment>
          ))}
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={handleClose}
          content="Close"
          icon="shutdown"
        />
      </Modal.Actions>
    </Modal>
  );
};

export default ReviewModal;
