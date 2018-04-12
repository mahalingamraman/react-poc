import React, { Component } from "react";
import "./App.css";
import Header from "../components/header";
import Footer from "../components/footer";

import InputContent from "../components/inputcontent";
import Result from "../components/result";

class App extends Component {
  constructor() {
    super();
    this.state = { no1: 0, no2: 0, result: 0 };
    this.onValueChangeOne = this.onValueChangeOne.bind(this);
    this.onValueChangeTwo = this.onValueChangeTwo.bind(this);
    this.add = this.add.bind(this);
  }
  add() {
    this.setState({ result: this.state.no1 + this.state.no2 });
  }

  onValueChangeOne = value => {
    console.log(value);
    this.setState({ no1: value });
  };
  onValueChangeTwo = value => {
    this.setState({ no2: value });
  };
  render() {
    return (
      <div className="App">
        <Header />
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <InputContent
          displayName="Number 1:"
          onValueChange={this.onValueChangeOne}
        />
        <InputContent
          displayName="Number 2:"
          onValueChange={this.onValueChangeTwo}
        />
        <input type="button" value="Add" onClick={this.add} />
        <Result data={this.state.result} />
        <Footer />
      </div>
    );
  }
}

export default App;
