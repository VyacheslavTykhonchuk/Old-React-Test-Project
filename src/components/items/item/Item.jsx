import React, { Component } from "react";
import "./item.css";

class Item extends Component {
  constructor(props) {
    super(props);

    if (localStorage[this.props.id]) {
      this.state = JSON.parse(localStorage.getItem(this.props.id));
    } else {
      this.state = {
        itemComments: []
      };
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.activated = this.activated.bind(this);
  }

  handleDelete() {
    this.props.handleDeleteItem(this.props.id);
  }
  activated() {
    this.props.makeItemActive(this.props.id, this.props.index);
    this.props.receiveComments(this.state.itemComments);
  }
  componentWillMount() {
    this.props.makeItemActive(this.props.id, this.props.index);
    this.props.receiveComments(this.state.itemComments);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.thisComments) {
      this.setState({
        itemComments: nextProps.thisComments
      });
    }
  }
  componentDidUpdate() {
    localStorage.setItem(this.props.id, JSON.stringify(this.state));
  }
  componentWillUnmount() {
    this.props.receiveComments([]);
    localStorage.removeItem(this.props.id);
    this.props.makeItemActive(false, false);
  }
  render() {
    return (
      <div
        className={this.props.isActive ? "item item_active" : "item "}
        onClick={this.activated}
      >
        <div className="item__text">
          <div className="item__name">{this.props.text}</div>
          <div className="item__counter">{this.state.itemComments.length}</div>
        </div>
        <button className="item__btn" onClick={this.handleDelete}>
          Delete
        </button>
      </div>
    );
  }
}

export default Item;
