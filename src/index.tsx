import * as React from "react";
import { render } from "react-dom";
import Book from "./Book";
import "./styles.css";

function App() {
  return (
    <div className="book-stage">
      <Book bookSpread={0} spreads = {20} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
