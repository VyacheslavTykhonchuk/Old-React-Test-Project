import React, { Component } from "react";
import "./comment.css";

class Item extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleDelete() {
    this.props.onClick(this.props.id);
  }
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
