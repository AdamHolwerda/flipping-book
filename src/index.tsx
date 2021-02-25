import React, { useState, useRef } from "react";
import { render } from "react-dom";
import Book from "./Book";
import "./styles.css";
import text from "./story.md";
import { StyledBookStage } from "./Book/styles";

function App() {
  const [duration, setDuration] = useState("");
  const durationRef = useRef(800);
  const handleDurationChange = () => {
    setDuration(durationRef.current.value);
  };

  const story = text;

  return (
    <StyledBookStage>
      <input
        type="text"
        ref={durationRef}
        value={duration}
        onChange={handleDurationChange}
        placeholder="duration (ms)"
      />
      <Book
        bookSpread={0}
        spreads={20}
        bookText={text}
        flipDuration={duration || 800}
      />
    </StyledBookStage>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
