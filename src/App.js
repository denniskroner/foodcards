import React, { Component } from "react";

import axios from "axios";

class App extends Component {
  componentDidMount() {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        console.log(response);
      });
  }

  render() {
    return <div> Test </div>;
  }
}

export default App;
