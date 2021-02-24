import React, { Component, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import {
  StyledBookContainer,
  StyledScrolled,
  StyledPage,
  StyledFrontCover
} from "./styles";

export interface BookProps {
  bookText?: string;
  bookSpread?: number;
  coverImage?: string;
  spreads?: number;
}

export interface BookState {
  currentSpread: number;
  direction: string;
  stateBookText: string;
  isFlipping: boolean;
}

class Book extends Component<BookProps, BookState> {
  constructor(props: BookProps) {
    super(props);
    const { bookSpread = 0 } = props;

    this.state = {
      currentSpread: bookSpread,
      direction: "forward",
      stateBookText: "",
      isFlipping: false
    };
  }
  advancePage = async () => {
    let { currentSpread, isFlipping } = this.state;
    if (isFlipping) return false;
    this.setState({
      direction: "forward",
      isFlipping: true,
      currentSpread: currentSpread += 1
    });

    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });

    this.setState({
      isFlipping: false
    });
  };
  backPage = async () => {
    let { currentSpread, isFlipping } = this.state;
    if (isFlipping) return false;

    if (currentSpread > 0) {
      this.setState({
        direction: "back",
        isFlipping: true,
        currentSpread: currentSpread -= 1
      });
    }

    await new Promise((resolve) => {
      setTimeout(resolve, 800);
    });

    this.setState({
      isFlipping: false
    });
  };
  render() {
    const { currentSpread, direction, stateBookText, isFlipping } = this.state;
    const { coverImage, bookText = stateBookText, spreads } = this.props;

    const howManySpreads = spreads || bookText.length / 1800;
    const spreadNumbers = Math.round(howManySpreads);
    let pages: ReactElement[] = [];

    for (let i = 0; i < spreadNumbers; i += 1) {
      const maxVmin = 54;
      const nextSpread = currentSpread + 1;
      const textCutoff =
        direction === "forward"
          ? 1800 * (nextSpread + 1)
          : 1800 * (nextSpread + 2);
      let truncatedBookText = bookText.substring(0, textCutoff);

      const flipped = nextSpread > i ? "flipped" : "to_flip";
      let flipping = currentSpread === i ? "flipping" : flipped;

      let forwardToFlip = flipping === "to_flip" ? 0 : 1;
      let backwardToFlip = flipping === "to_flip" ? 1 : 2;

      let forwardZIndex = flipping === "flipped" ? 2 : forwardToFlip;
      let backwardZIndex = flipping === "flipped" ? 1 : backwardToFlip;

      let frontPageNumber = i * 2 !== 0 ? i * 2 + 1 : 1;
      frontPageNumber =
        direction === "back" &&
        flipping === "to_flip" &&
        isFlipping &&
        frontPageNumber > 2
          ? frontPageNumber - 2
          : frontPageNumber;

      const backPageNumber = frontPageNumber + 1;
      const frontPageScroll = maxVmin * (frontPageNumber - 1) + 0.1;
      const backPageScroll = frontPageScroll + maxVmin - 0.1;

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
