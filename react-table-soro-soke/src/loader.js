import React, { Component } from "react";

class Loader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <span class="loading-wrap">
        <span class="loading-text" style={{ "font-size": "22.096px" }}>
          Loading, please wait
        </span>
        <span class="animation-wrap">
          <span class="animation-dot"></span>
        </span>
      </span>
    );
  }
}

export default Loader;
