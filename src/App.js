import React, { Component } from "react";
import "./App.css";

//  import componenents
import DairyItems from "./components/items/items-container/DairyItems";
import DairyComments from "./components/comments/comments-container/DairyComments";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: null,
      commentsNum: null
    };

    this.saveComments = this.saveComments.bind(this);
    this.makeActive = this.makeActive.bind(this);
    this.commentsNum = this.commentsNum.bind(this);
  }

  // receive data child and save to the state
  saveComments(commentsObj) {
    this.setState({
      comments: commentsObj
    });
  }

  makeActive(commentsArr) {
    this.setState({
      comments: commentsArr
    });
  }
  commentsNum(num) {
    this.setState({ commentsNum: num });
  }

  render() {
    return (
      <div className="dairy-app">
        <aside className="dairy-app__aside">
          <h1>DAIRY APP</h1>
          <h3>Comment with no sense</h3>
        </aside>
        <main className="dairy-app__main">
          <DairyItems
            itemComments={this.state.comments} // pass data
            makeActive={this.makeActive} // receive data
            commentsNum={this.commentsNum} // receive data
          />
          <DairyComments
            handleSaveComments={this.saveComments} // receive data
            renderComments={this.state.comments} // pass data
            num={this.state.commentsNum} // pass data
          />
        </main>
      </div>
    );
  }
}

export default App;
