var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import React, { Component } from "react";
import ReactMarkdown from "react-markdown";
import "./book.css";
import styled from "styled-components";
var StyledScrolled = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n.book-insides {\n  margin-top: ", ";\n}\n"], ["\n.book-insides {\n  margin-top: ", ";\n}\n"])), function (props) { return "-" + props.scroll + "vmin"; });
var Book = /** @class */ (function (_super) {
    __extends(Book, _super);
    function Book(props) {
        var _this = _super.call(this, props) || this;
        _this.handleAdvancePage = function () {
            var currentSpread = _this.state.currentSpread;
            _this.setState({
                currentSpread: currentSpread += 1,
                direction: "forward"
            });
        };
        _this.handleBackPage = function () {
            var currentSpread = _this.state.currentSpread;
            if (currentSpread > 0) {
                _this.setState({
                    currentSpread: currentSpread -= 1,
                    direction: "back"
                });
            }
        };
        var _a = props.bookSpread, bookSpread = _a === void 0 ? 0 : _a;
        _this.state = {
            currentSpread: bookSpread,
            direction: "forward",
            stateBookText: ""
        };
        return _this;
    }
    Book.prototype.render = function () {
        var _a = this.state, currentSpread = _a.currentSpread, direction = _a.direction, stateBookText = _a.stateBookText;
        var _b = this.props, coverImage = _b.coverImage, _c = _b.bookText, bookText = _c === void 0 ? stateBookText : _c, spreads = _b.spreads;
        var backCover = (React.createElement("div", { className: "back-cover" },
            React.createElement("div", { className: "back-cover-inside" }),
            React.createElement("div", { className: "back-cover-outside" })));
        var coverVisibleStyles = currentSpread > 0 ? { transform: "rotateY(-180deg)", zIndex: 1 } : {};
        var bookVisibleStyles = currentSpread > 0 ? { left: "45vmin" } : {};
        var howManySpreads = spreads || bookText.length / 1800;
        var spreadNumbers = Math.round(howManySpreads);
        var pages = [];
        for (var i = 0; i < spreadNumbers; i += 1) {
            var maxVmin = 54;
            var nextSpread = currentSpread + 1;
            var frontPageNumber = i * 2 !== 0 ? i * 2 + 1 : 1;
            var backPageNumber = frontPageNumber + 1;
            var frontPageScroll = maxVmin * 2 * i + 0.1;
            var backPageScroll = frontPageScroll + maxVmin - 0.1;
            var flipped = nextSpread > i ? "flipped" : "to_flip";
            var flipping = currentSpread === i ? "flipping" : flipped;
            var forwardToFlip = flipping === "to_flip" ? 0 : 1;
            var backwardToFlip = flipping === "to_flip" ? 1 : 2;
            var forwardZIndex = flipping === "flipped" ? 2 : forwardToFlip;
            var backwardZIndex = flipping === "flipped" ? 1 : backwardToFlip;
            var pageZIndex = direction === "forward" ? forwardZIndex : backwardZIndex;
            var adjacentSpreads = Math.abs(currentSpread - i);
            var pageNode = (React.createElement("div", { key: "spread" + i, className: "page-container " + flipping, "data-spread": i, style: { zIndex: pageZIndex } },
                React.createElement("div", { className: "front page", "data-page": frontPageNumber, onClick: this.handleAdvancePage },
                    React.createElement(StyledScrolled, { scroll: frontPageScroll },
                        React.createElement(ReactMarkdown, { className: "book-insides", source: bookText }))),
                React.createElement("div", { className: "back page", "data-page": backPageNumber, onClick: this.handleBackPage },
                    React.createElement(StyledScrolled, { scroll: backPageScroll },
                        React.createElement(ReactMarkdown, { className: "book-insides", source: bookText })))));
            if (adjacentSpreads < 3) {
                // helps with performance!
                pages = pages.concat([pageNode]);
            }
        }
        return (React.createElement("div", { className: "book-container", "data-spread": currentSpread, style: __assign({}, bookVisibleStyles) },
            React.createElement("div", { className: "front-cover", style: __assign({}, coverVisibleStyles) },
                React.createElement("div", { className: "bottom-corner" }),
                React.createElement("div", { className: "front-cover-outside", style: { backgroundImage: "url(" + coverImage + ")" } }),
                React.createElement("div", { className: "front-cover-inside", onClick: this.handleBackPage })),
            pages,
            backCover));
    };
    return Book;
}(Component));
export default Book;
var templateObject_1;
