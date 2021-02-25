import styled from "styled-components";

interface StyledPageProps {
  zIndex: number;
  flipDuration: number;
}

interface StyledScrolledProps {
  scroll: number;
}

export const StyledScrolled = styled.div<StyledScrolledProps>`
  .book-insides {
    margin-top: ${({ scroll }) => `-${scroll}vmin`};
  }
`;

export const StyledPage = styled.div<StyledPageProps>`
  z-index: ${({ zIndex }) => zIndex};

  position: absolute;
  width: inherit;
  height: inherit;
  top: 0;
  transition: ${({ flipDuration }) =>
    flipDuration && `transform ${flipDuration}ms`};
  transform-origin: left;
  cursor: pointer;
  overflow: hidden;
  transform: rotateY(-1deg);

  &.flipped {
    transform: rotateY(-179deg);
  }

  &.flipping {
    transform: rotateY(-2deg);
  }

  &.flipped .front {
    z-index: 1;
    opacity: 0.35;
    animation: ${({ flipDuration }) =>
      flipDuration && `hide ${flipDuration / 2}ms`};
  }

  &.flipped .back {
    z-index: 2;
    opacity: 0.96;
    animation: ${({ flipDuration }) =>
      flipDuration && `show ${flipDuration / 2}ms`};
  }

  &.flipping .front {
    animation: ${({ flipDuration }) =>
      flipDuration && `show ${flipDuration / 2}ms`};
  }

  &.flipping .back {
    animation: ${({ flipDuration }) =>
      flipDuration && `hide ${flipDuration / 2}ms`};
  }

  @keyframes hide {
    0% {
      opacity: 0.96;
    }
    65% {
      opacity: 0.96;
    }
    100% {
      opacity: 0.05;
    }
  }

  @keyframes show {
    0% {
      opacity: 0.05;
    }
    45% {
      opacity: 0.05;
    }
    100% {
      opacity: 0.96;
    }
  }
`;

export const StyledBookStage = styled.div`
  * {
    box-sizing: border-box;
    user-select: none;
  }

  .book-stage {
    position: absolute;
    width: 100vw;
    height: 100vh;
    transform-style: preserve-3d;
  }
`;

interface CurrentSpreadProps {
  currentSpread: number;
  flipBackToCover: boolean;
  flipDuration?: number;
}

export const StyledFrontCover = styled.div<CurrentSpreadProps>`
  z-index: ${({ currentSpread, flipBackToCover }) =>
    flipBackToCover ? 1 : currentSpread > 0 ? 1 : 100};
  position: absolute;
  width: inherit;
  height: inherit;
  transition: ${({ flipDuration }) =>
    flipDuration && `transform ${flipDuration}ms`};
  transform-origin: left;
  transition-delay: 200ms;
  transform-style: preserve-3d;
  transform: ${({ currentSpread }) =>
    currentSpread > 0 ? "rotateY(-180deg)" : "rotateY(-3deg)"};

  .front-cover-inside {
    position: absolute;
    transform: rotateY(180deg);
    background: white;
    width: inherit;
    height: inherit;
  }

  .front-cover-outside {
    position: absolute;
    background: #dddddd;
    width: inherit;
    height: inherit;
    background-size: cover;
  }
`;

export const StyledBookContainer = styled.div<CurrentSpreadProps>`
  width: 45vmin;
  height: 66vmin;
  margin: auto;
  position: absolute;
  left: ${({ currentSpread }) => (currentSpread > 0 ? "45vmin" : 0)};
  right: 0;
  top: 0;
  bottom: 0;
  transition: all 1s;
  perspective: 150vmin;
  transform: rotateZ(3deg);

  &:hover {
    left: 45vmin;
    transform: rotateZ(0deg);

    ${StyledFrontCover} {
      transform: rotateY(-180deg);
    }
  }

  .book-insides h1 {
    font-size: 3vmin;
    line-height: 4.5vmin;
  }

  .book-insides p {
    margin: 0;
    line-height: 2.5vmin;
    text-indent: 3vmin;
    font-size: 1.5vmin;
  }

  .back-cover {
    position: absolute;
    z-index: 1;
  }

  .back-cover-inside {
    position: absolute;
    background: green;
    width: inherit;
    height: inherit;
  }

  .back-cover-outside {
    position: absolute;
    background: blue;
    transform: rotateY(180deg);
    width: inherit;
    height: inherit;
  }

  .page {
    bottom: 0;
    padding: 6vmin;
    position: absolute;
    width: inherit;
    height: inherit;
  }

  .back {
    z-index: 1;
    transform: rotateY(180deg);
    background: white;
    opacity: 0.35;
  }

  .front {
    z-index: 2;
    transform: rotateY(0deg);
    background: white;
    background: linear-gradient(to right, #fafafa, white);
    opacity: 0.96;
  }

  .page.back::before {
    box-sizing: border-box;
    content: "";
    z-index: 1;
    width: 45vmin;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotateY(0deg);
    background: white;
    height: 5.8vmin;
  }

  .page.front::before {
    box-sizing: border-box;
    content: "";
    z-index: 1;
    width: 45vmin;
    position: absolute;
    top: 0;
    left: 0;
    height: 5.8vmin;
    background: white;
    transform: rotateY(0deg);
    background: linear-gradient(to right, #fafafa, white);
  }

  .page.front::after {
    z-index: 1;
    box-sizing: border-box;
    content: attr(data-page);
    width: 45vmin;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 6vmin;
    font-size: 1.5vmin;
    padding-top: 1vmin;
    text-align: right;
    background: white;
    padding-right: 5.8vmin;
    transform: rotateY(0deg);
    background: linear-gradient(to right, #fafafa, white);
  }

  .page.back::after {
    z-index: 1;
    box-sizing: border-box;
    content: attr(data-page);
    width: 45vmin;
    position: absolute;
    bottom: 0;
    left: 0;
    background: white;
    font-size: 1.5vmin;
    height: 5.8vmin;
    text-align: left;
    padding-left: 6vmin;
    padding-top: 1vmin;
  }
`;
