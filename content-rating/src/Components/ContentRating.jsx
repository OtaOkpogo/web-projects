import React, { Component } from "react";
import "./ContentRating.css";

class ContentRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      dislikes: 0,
      totalRatings: 0,
    };
  }

  handleLike = () => {
    this.setState((prevState) => ({
      likes: prevState.likes + 1,
      totalRatings: prevState.totalRatings + 1,
    }));
  };

  handleDislike = () => {
    this.setState((prevState) => ({
      dislikes: prevState.dislikes + 1,
      totalRatings: prevState.totalRatings + 1,
    }));
  };

  render() {
    return (
      <>
        <h1>Text Content Rating</h1>

        <div className="content-rating">
          <p className="content-text">
            A good software engineer writes clean, readable code, continuously
            learns new technologies, communicates clearly with teammates, and
            solves problems with patience and curiosity.
          </p>

          <div className="rating-buttons">
            <button className="like-button" onClick={this.handleLike}>
              Like ({this.state.likes})
            </button>

            <button className="dislike-button" onClick={this.handleDislike}>
              Dislike ({this.state.dislikes})
            </button>
          </div>

          <p>Total Ratings: {this.state.totalRatings}</p>
        </div>
      </>
    );
  }
}

export default ContentRating;
