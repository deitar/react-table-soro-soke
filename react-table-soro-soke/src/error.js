import React, { Component } from "react";

class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <span className="text-danger">Error Loading Data</span>;
  }
}

export default Error;
