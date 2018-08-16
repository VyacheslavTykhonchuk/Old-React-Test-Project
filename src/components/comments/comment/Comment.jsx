import React, { Component } from "react";
import "./comment.css";
// comment view
class Item extends Component {
  render() {
    return (
      <article className="comment dairy-comments__comment ">
        <div className="dairy-comments__avatar comment__avatar" />
        <p className="comment__content">{this.props.text}</p>
      </article>
    );
  }
}
export default Item;
