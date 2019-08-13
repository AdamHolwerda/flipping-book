import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import "./book.css";
import { BookProps, BookState } from "./types";
import styled from "styled-components";

class Book extends Component<BookProps, BookState> {
  constructor(props:BookProps) {
    super(props);

    const { bookSpread = 0 } = props;

    this.state = {
      currentSpread: bookSpread,
      direction: "forward",
      stateBookText: ""
    };
  }
  handleAdvancePage = () => {
    let { currentSpread } = this.state;

    this.setState({
      currentSpread: currentSpread += 1,
      direction: "forward"
    });
  };
  handleBackPage = () => {
    let { currentSpread } = this.state;

    if (currentSpread > 0) {
      this.setState({
        currentSpread: currentSpread -= 1,
        direction: "back"
      });
    }
  };
  render() {
    const { currentSpread, direction, stateBookText } = this.state;
    const { coverImage, bookText = stateBookText, spreads } = this.props;

    const backCover = (
      <div className="back-cover">
        <div className="back-cover-inside" />
        <div className="back-cover-outside" />
      </div>
    );

    const coverVisibleStyles =
      currentSpread > 0 ? { transform: "rotateY(-180deg)", zIndex: 1 } : {};
    const bookVisibleStyles = currentSpread > 0 ? { left: "45vmin" } : {};

    const howManySpreads = spreads || bookText.length / 1800;
    const spreadNumbers = Math.round(howManySpreads);
    const pages = [];

    for (let i = 0; i < spreadNumbers; i += 1) {
      const maxVmin = 54;
      const nextSpread = currentSpread + 1;

      const frontPageNumber = i * 2 !== 0 ? i * 2 + 1 : 1;
      const backPageNumber = frontPageNumber + 1;
      const frontPageScroll = maxVmin * 2 * i + 0.1;
      const backPageScroll = frontPageScroll + maxVmin - 0.1;

      const flipped = nextSpread > i ? "flipped" : "to_flip";
      const flipping = currentSpread === i ? "flipping" : flipped;

      let forwardToFlip = flipping === "to_flip" ? 0 : 1;
      let backwardToFlip = flipping === "to_flip" ? 1 : 2;

      let forwardZIndex = flipping === "flipped" ? 2 : forwardToFlip;
      let backwardZIndex = flipping === "flipped" ? 1 : backwardToFlip;

      const pageZIndex =
        direction === "forward" ? forwardZIndex : backwardZIndex;

      const StyledScrolledFront = styled.div`
        .book-insides {
          margin-top: -${frontPageScroll}vmin;
        }
      `;

      const StyledScrolledBack = styled.div`
        .book-insides {
          margin-top: -${backPageScroll}vmin;
        }
      `;

      const adjacentSpreads = Math.abs(currentSpread - i);

      if (adjacentSpreads < 3) {
        // helps with performance!
        pages.push(
          <div
            key={"spread" + i}
            className={"page-container " + flipping}
            data-spread={i}
            style={{ zIndex: pageZIndex }}
          >
            <div
              className="front page"
              data-page={frontPageNumber}
              onClick={this.handleAdvancePage}
            >
              <StyledScrolledFront>
                <ReactMarkdown className="book-insides" source={bookText} />
              </StyledScrolledFront>
            </div>
            <div
              className="back page"
              data-page={backPageNumber}
              onClick={this.handleBackPage}
            >
              <StyledScrolledBack>
                <ReactMarkdown className="book-insides" source={bookText} />
              </StyledScrolledBack>
            </div>
          </div>
        );
      }
    }

    return (
      <div
        className="book-container"
        data-spread={currentSpread}
        style={{ ...bookVisibleStyles }}
      >
        <div className="front-cover" style={{ ...coverVisibleStyles }}>
          <div className="bottom-corner" />
          <div
            className="front-cover-outside"
            style={{ backgroundImage: "url(" + coverImage + ")" }}
          />
          <div className="front-cover-inside" onClick={this.handleBackPage} />
        </div>
        {pages}
        {backCover}
      </div>
    );
  }
}

export default Book;
