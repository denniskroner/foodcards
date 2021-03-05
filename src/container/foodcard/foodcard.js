import React, { Component } from "react";

import cssClasses from "./foodcard.css";
import Auxiliary from "../../hoc/auxiliary";

class Foodcard extends Component {
  render() {
    return (
      <Auxiliary>
        <div className={cssClasses.Test}>Foodcard</div>{" "}
        <img src="https://www.themealdb.com/images/media/meals/rpvptu1511641092.jpg" />
      </Auxiliary>
    );
  }
}

export default Foodcard;
