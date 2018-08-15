import React, { Component } from "react";
import "./dairy-items.css";

import Item from "../item/Item";

class DairyItems extends Component {
  constructor(props) {
    super(props);

    if (localStorage.savedState) {
      this.state = JSON.parse(localStorage.getItem("savedState"));
    } else {
      this.state = {
        items: [],
        text: "",
        activeItemId: null,
        currItemComments: null,
        activeItemIndex: null
      };
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.makeItemActive = this.makeItemActive.bind(this);
    this.receiveComments = this.receiveComments.bind(this);
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      comments: 0
    };
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }

  deleteItem(elementId) {
    let arr = this.state.items.slice(); // копіюю масив так як документація React забороняє прямі операції зі this.state

    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (element.id === elementId) {
        arr.splice(index, 1);
        this.setState({
          items: arr
        });
      }
    }
  }

  makeItemActive(id, index) {
    this.setState({
      activeItemId: id,
      activeItemIndex: index
    });
    this.props.commentsNum(index);
  }

  receiveComments(commentsArr) {
    this.props.makeActive(commentsArr);
    this.setState({
      currItemComments: commentsArr
    });
  }
  componentDidUpdate() {
    localStorage.setItem("savedState", JSON.stringify(this.state)); // localStorage не може зберігати об'єкт
  }

  render() {
    return (
      <section className="section dairy-items">
        <h3 className="section__title">Items</h3>
        <form onSubmit={this.handleSubmit} className="dairy-items__form">
          <input
            className="dairy-items__input"
            id="newItem"
            onChange={this.handleChange}
            value={this.state.text}
            placeholder="Type name here..."
          />
          <button className="dairy-items__submit">Add new</button>
        </form>
        <div className="items-list">
          {this.state.items.map((item, index) => (
            <Item
              key={item.id}
              id={item.id}
              index={index}
              text={item.text}
              handleDeleteItem={this.deleteItem}
              thisComments={
                this.state.activeItemId === item.id
                  ? this.props.itemComments
                  : false
              }
              makeItemActive={this.makeItemActive}
              receiveComments={this.receiveComments}
              isActive={this.state.activeItemId === item.id}
            />
          ))}
        </div>
      </section>
    );
  }
}

export default DairyItems;
