import React, { Component } from "react";
import "./dairy-items.css";

import Item from "../item/Item";

class DairyItems extends Component {
  constructor(props) {
    super(props);

    //check if component have saved data
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

  // handle input from user
  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  // save item
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

  // delete child (by id) from state arr
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

  // make child active (by id)
  // it must be done in parent component to be sure that
  // only 1 component can be active at the moment
  makeItemActive(id, index) {
    this.setState({
      activeItemId: id,
      activeItemIndex: index
    });
    this.props.commentsNum(index);
  }

  // receive data and lift state
  receiveComments(commentsArr) {
    this.props.makeActive(commentsArr);
    this.setState({
      currItemComments: commentsArr
    });
  }
  // on state update or props received - save
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
          {/* render items from state arr */}
          {this.state.items.map((item, index) => (
            <Item
              key={item.id} // uniq key
              id={item.id} // uniq id
              index={index} // index for comments heading
              text={item.text} // item name
              handleDeleteItem={this.deleteItem} // passing callback function to lift state from child for deleteng
              thisComments={
                this.state.activeItemId === item.id
                  ? this.props.itemComments
                  : false
              } // save comments to their item
              makeItemActive={this.makeItemActive} // passing callback function to lift state from child for activating
              receiveComments={this.receiveComments} // passing callback function to lift state from child to receive its comments
              isActive={this.state.activeItemId === item.id} // pass item status to render it active
            />
          ))}
          {/* end render items from state arr */}
        </div>
      </section>
    );
  }
}

export default DairyItems;
