import React from "react";
import {
  Icon,
  Image,
  Button,
  Modal,
  Header,
  Container
} from "semantic-ui-react";

function ReviewModal(props) {
  //console.log(props);
  const { handleOpen, handleClose, open } = props;
  return (
    <Modal
      trigger={
        <p onClick={handleOpen} style={{ cursor: "pointer", fontSize: "19px" }}>
          Reviews
        </p>
      }
      open={open}
      onClose={handleClose}
    >
      <Modal.Header>{props.selectedMovieData.title} Reviews</Modal.Header>
      <Modal.Content image scrolling>
        <Image
          size="large"
          src={`https://image.tmdb.org/t/p/w342${props.selectedMovieData.poster_path}`}
          wrapped
        />
        <Modal.Description>
          {props.selectedMovieReviews.results.map((item, index) => (
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
        <Button color="red" onClick={handleClose}>
          Close <Icon name="close" />
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

export default ReviewModal;
