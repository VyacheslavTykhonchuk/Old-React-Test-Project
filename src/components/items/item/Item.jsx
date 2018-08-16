import React, { Component } from "react";
import "./item.css";

class Item extends Component {
  constructor(props) {
    super(props);
    // check if item have saved data
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
    this.props.handleDeleteItem(this.props.id); // use callback from parent to pass data to it and delete clicked item
  }
  activated() {
    this.props.makeItemActive(this.props.id, this.props.index); // use callback from parent to pass data to it and make clicked item active
    this.props.receiveComments(this.state.itemComments); // use callback from parent to pass comments to it
  }
  componentWillMount() {
    this.props.makeItemActive(this.props.id, this.props.index); // use callback from parent to pass data to it and make clicked item active
    this.props.receiveComments(this.state.itemComments); // use callback from parent to pass comments to it
  }
  // on props received update component
  componentWillReceiveProps(nextProps) {
    if (nextProps.thisComments) {
      this.setState({
        itemComments: nextProps.thisComments
      });
    }
  }
  // on upd save component data
  componentDidUpdate() {
    localStorage.setItem(this.props.id, JSON.stringify(this.state));
  }
  // clear after unmount
  componentWillUnmount() {
    this.props.receiveComments([]);
    localStorage.removeItem(this.props.id);
    this.props.makeItemActive(false, false);
  }
  render() {
    return (
      <div
        className={this.props.isActive ? "item item_active" : "item "} // make item active
        onClick={this.activated} // lift state
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
