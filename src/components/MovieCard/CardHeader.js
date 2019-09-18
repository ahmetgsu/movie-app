import React from "react";
import _ from "lodash";
import ReviewModal from "./ReviewModal";
import dateConversion from "./dateConversion";
import { Grid, Card, Icon, Menu, Popup } from "semantic-ui-react";

function CardHeader(props) {
  //console.log(props);
  const {
    selectedMovieData,
    selectedMovieReviews,
    iconClicked,
    handleIconClick,
    handleOpen,
    handleClose,
    open,
    handleMouseOver,
    handleMouseOut,
    isHovered,
    activeIndexRate,
    handleClickTimes,
    handleClickStar,
    starIndex
  } = props;
  const movieYear = new Date(selectedMovieData.release_date);
  return (
    <Card.Content>
      <Grid>
        <Grid.Row>
          <Grid.Column width={2} verticalAlign="middle" textAlign="center">
            <Popup
              content={
                iconClicked === false
                  ? "+ Add movie to watchlist"
                  : "Movie successfully added to watchlist"
              }
              hoverable
              inverted
              flowing
              position="bottom left"
              style={{
                opacity: 0.9,
                border: "5px #33112c",
                padding: "0.8em",
                fontWeight: "bold"
              }}
              trigger={
                <Icon
                  name={iconClicked === false ? "plus square" : "check square"}
                  size="huge"
                  color={iconClicked === false ? "grey" : "green"}
                  link
                  onClick={() => handleIconClick(selectedMovieData.id)}
                />
              }
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Card.Header>
              <h2>
                {selectedMovieData.title} ({movieYear.getFullYear()})
              </h2>
            </Card.Header>
            <br />
            <Card.Meta>
              {`${selectedMovieData.runtime} min`} |{" "}
              {dateConversion(selectedMovieData.release_date)} |{" "}
              {selectedMovieData.genres.map((item, index) =>
                index === selectedMovieData.genres.length - 1
                  ? item.name
                  : `${item.name},  `
              )}
            </Card.Meta>
          </Grid.Column>
          <Grid.Column width={6}>
            <Menu secondary size="large" position="right">
              <Menu.Item style={{ marginLeft: "0px" }}>
                <ReviewModal
                  selectedMovieData={selectedMovieData}
                  selectedMovieReviews={selectedMovieReviews}
                  handleOpen={handleOpen}
                  handleClose={handleClose}
                  open={open}
                />
              </Menu.Item>
              <Menu.Item>
                <Icon name="star" size="large" color="yellow" />
                <h2 style={{ marginTop: "15px" }}>
                  {selectedMovieData.vote_average}
                </h2>
                <h4 style={{ marginTop: "2px", marginLeft: "5px" }}> /10</h4>
              </Menu.Item>
              <Popup
                flowing
                content={_.times(11, i =>
                  i === 0 ? (
                    <Icon
                      onMouseOver={() => handleMouseOver(i)}
                      onMouseOut={handleMouseOut}
                      onClick={() => handleClickTimes(selectedMovieData.id)}
                      name={
                        isHovered && activeIndexRate === i
                          ? "times circle outline"
                          : "times circle"
                      }
                      color={isHovered && activeIndexRate === i ? "red" : null} //if 2 conditions right, it's red, otherwise null
                      key={i}
                      size="large"
                      style={{ marginRight: "10px" }}
                    />
                  ) : (
                    <Icon
                      onMouseOver={() => handleMouseOver(i)}
                      onMouseOut={handleMouseOut}
                      onClick={() => handleClickStar(selectedMovieData.id, i)}
                      name={
                        isHovered && i <= activeIndexRate
                          ? "star"
                          : "star outline"
                      }
                      color={
                        isHovered && i <= activeIndexRate ? "yellow" : null
                      }
                      key={i}
                      size="large"
                      style={{ marginleft: "6px", marginRight: "6px" }}
                    />
                  )
                )}
                position="left center"
                hoverable
                inverted
                trigger={
                  <Menu.Item style={{ margin: "0px" }}>
                    <Icon
                      name={starIndex === null ? "star outline" : "star"}
                      color={starIndex === null ? null : "yellow"}
                      size="large"
                    />
                    {starIndex === null ? (
                      <p style={{ fontSize: "19px" }}>Rate movie</p>
                    ) : (
                      <>
                        <h2 style={{ margin: "0px", fontWeight: "bold" }}>
                          {starIndex}
                        </h2>
                        <h4
                          style={{
                            fontSize: "13px",
                            marginTop: "2px",
                            marginLeft: "5px"
                          }}
                        >
                          Your Rate
                        </h4>
                      </>
                    )}
                  </Menu.Item>
                }
              />
            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Card.Content>
  );
}

export default CardHeader;
