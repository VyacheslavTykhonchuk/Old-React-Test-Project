import React, { Component } from "react";
import "./dairy-comments.css";

import Comment from "../comment/Comment";

class DairyComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.renderComments ? this.props.renderComments : [], // check if component is new
      text: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // handle input from user
  handleChange(e) {
    this.setState({ text: e.target.value });
  }
  // save comment
  handleSubmit(e) {
    if (e.keyCode === 13 && e.ctrlKey) {
      if (!this.state.text.length) {
        return;
      }
      const newItem = {
        text: this.state.text,
        id: Date.now()
      };

      this.setState(prevState => ({
        items: prevState.items.concat(newItem),
        text: ""
      }));
    } else {
      return false;
    }
    this.props.handleSaveComments(this.state.items);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleSubmit); // hotkeys listener set
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleSubmit); // hotkeys listener removed
  }
  // initiate component update and re-render on new props received
  componentWillReceiveProps(newProps) {
    this.setState({
      items: newProps.renderComments ? newProps.renderComments : []
    });
  }

  render() {
    return (
      <section className="section dairy-comments">
        <h3 className="section__title">
          Comments {this.props.num === false ? "" : "#" + (this.props.num + 1)}
        </h3>
        <div className="dairy-comments__comments">
          {/* render comments from array */}
          {this.state.items.map(item => (
            <Comment key={item.id} id={item.id} text={item.text} />
          ))}
          {/* end render comments from array */}
        </div>
        <div className="dairy-comments__form-container">
          <div className="dairy-comments__avatar dairy-comments__avatar_gray" />
          <form className="dairy-comments__form">
            <textarea
              rows="4"
              className="dairy-comments__textarea"
              id="newComment"
              onChange={this.handleChange}
              value={this.state.text}
            />
            <span className="hint">control + enter to send</span>
          </form>
        </div>
      </section>
    );
  }
}
export default DairyComments;
