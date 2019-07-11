import React from "react";

import { hasAuthToken } from "../util/api";

export default class Initializing extends React.Component {
  componentDidMount() {
    hasAuthToken().then(hasToken => {
      if (hasToken) {
        this.props.navigation.navigate("Information");
      } else {
        this.props.navigation.navigate("Auth");
      }
    });
  }

  render() {
    return null;
  }
}
