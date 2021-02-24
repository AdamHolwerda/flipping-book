import React, { Component, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import { BookProps, BookState } from "./types";
import {
  StyledBookContainer,
  StyledScrolled,
  StyledPage,
  StyledFrontCover
} from "./styles";

class Book extends Component<BookProps, BookState> {
  constructor(props: BookProps) {
    super(props);
    const { bookSpread = 0 } = props;

    this.state = {
      currentSpread: bookSpread,
      direction: "forward",
      stateBookText: ""
    };
  }
  advancePage = () => {
    let { currentSpread } = this.state;

    this.setState({
      currentSpread: currentSpread += 1,
      direction: "forward"
    });
  };
  backPage = () => {
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

    const howManySpreads = spreads || bookText.length / 1800;
    const spreadNumbers = Math.round(howManySpreads);
    let pages: ReactElement[] = [];

    for (let i = 0; i < spreadNumbers; i += 1) {
      const maxVmin = 54;
      const nextSpread = currentSpread + 1;
      const textCutoff = 1800 * nextSpread;
      let truncatedBookText = bookText.substring(0, textCutoff);
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

      const adjacentSpreads = Math.abs(currentSpread - i);

      const pageNode = (
        <StyledPage
          key={"spread" + i}
          className={"page-container " + flipping}
          data-spread={i}
          zIndex={pageZIndex}
        >
          <div
            className="front page"
            data-page={frontPageNumber}
            onClick={this.advancePage}
          >
            <StyledScrolled scroll={frontPageScroll}>
              <ReactMarkdown
                className="book-insides"
                source={truncatedBookText}
              />
            </StyledScrolled>
          </div>
          <div
            className="back page"
            data-page={backPageNumber}
            onClick={this.backPage}
          >
            <StyledScrolled scroll={backPageScroll}>
              <ReactMarkdown
                className="book-insides"
                source={truncatedBookText}
              />
            </StyledScrolled>
          </div>
        </StyledPage>
      );

      // helps with performance!
      if (adjacentSpreads < 3) pages = [...pages, pageNode];
    }

    return (
      <StyledBookContainer currentSpread={currentSpread}>
        <StyledFrontCover currentSpread={currentSpread}>
          <div className="bottom-corner" />
          <div
            className="front-cover-outside"
            style={{ backgroundImage: `url(${coverImage})` }}
          />
          <div className="front-cover-inside" onClick={this.backPage} />
        </StyledFrontCover>
        {pages}
        <div className="back-cover">
          <div className="back-cover-inside" />
          <div className="back-cover-outside" />
        </div>
      </StyledBookContainer>
    );
  }
}

export default Book;
