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
  flipDuration?: number;
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
    const { flipDuration = 800 } = this.props;
    const newSpread = currentSpread + 1;
    if (isFlipping) return false;

    this.setState({
      direction: "forward",
      isFlipping: true,
      currentSpread: newSpread
    });

    await new Promise((resolve) => {
      setTimeout(resolve, flipDuration);
    });

    this.setState({
      isFlipping: false
    });
  };
  backPage = async () => {
    const { currentSpread, isFlipping } = this.state;
    const { flipDuration = 800 } = this.props;
    const newSpread = currentSpread - 1;
    if (isFlipping) return false;

    if (currentSpread > 0) {
      this.setState({
        direction: "back",
        isFlipping: true,
        currentSpread: newSpread
      });
    }

    await new Promise((resolve) => {
      setTimeout(resolve, flipDuration);
    });

    this.setState({
      isFlipping: false
    });
  };
  render() {
    const { currentSpread, direction, stateBookText, isFlipping } = this.state;
    const {
      coverImage,
      bookText = stateBookText,
      spreads,
      flipDuration = 800
    } = this.props;

    const howManySpreads = spreads || bookText.length / 1800;
    const spreadCount = Math.round(howManySpreads);
    const flipBackToCover = direction === "back" && isFlipping;

    let pages: ReactElement[] = [];
    let adjacentSpreads = 0;

    for (let i = 0; i < spreadCount; i += 1) {
      adjacentSpreads = Math.abs(currentSpread - i);
      if (adjacentSpreads > 2) {
        break;
      }
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

      let backPageNumber = frontPageNumber + 1;

      console.log(backPageNumber);

      const frontPageScroll = maxVmin * (frontPageNumber - 1) + 0.1;
      const backPageScroll = maxVmin * (backPageNumber - 1) - 0.1;

      const pageZIndex =
        direction === "forward" ? forwardZIndex : backwardZIndex;

      const pageNode = (
        <StyledPage
          key={"spread" + i}
          className={flipping}
          data-spread={i}
          zIndex={pageZIndex}
          flipDuration={flipDuration}
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
      pages = [...pages, pageNode];
    }

    return (
      <StyledBookContainer currentSpread={currentSpread}>
        <StyledFrontCover
          currentSpread={currentSpread}
          flipBackToCover={flipBackToCover}
          flipDuration={flipDuration}
        >
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
