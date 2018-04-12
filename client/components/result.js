import React, { Component } from "react";
class Result extends Component {
  render() {
    let { data } = this.props,
      cssClassName = data < 0 ? "negative" : "positive";
    return <div className={cssClassName}>{data}</div>;
  }
}
export default Result;
