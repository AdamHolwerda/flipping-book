import { Component } from "react";
import "./book.css";
import { BookProps, BookState } from "./types";
declare class Book extends Component<BookProps, BookState> {
    constructor(props: BookProps);
    handleAdvancePage: () => void;
    handleBackPage: () => void;
    render(): JSX.Element;
}
export default Book;
