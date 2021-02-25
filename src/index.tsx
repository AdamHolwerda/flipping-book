import * as React from "react";
import { render } from "react-dom";
import Book from "./Book";
import "./styles.css";
import text from "./story.md";
import { StyledBookStage } from "./Book/styles";

function App() {
  return (
    <StyledBookStage>
      <Book bookSpread={0} spreads={20} bookText={text} flipDuration={8000} />
    </StyledBookStage>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
