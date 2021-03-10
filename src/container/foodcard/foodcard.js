import React, { Component } from "react";

import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import cssClasses from "./foodcard.css";
import Auxiliary from "../../hoc/auxiliary";

class Foodcard extends Component {
  state = {
    modalClasses: ["cont_modal"],
    showIngredients: false,
  };

  showIngredientsHandler = () => {
    this.setState({ showIngredients: true });
  };

  showPreparationHandler = () => {
    this.setState({ showIngredients: false });
  };

  openModalHandler = () => {
    let newModalClasses = [...this.state.modalClasses];

    if (newModalClasses.indexOf("cont_modal_active") !== -1) {
      newModalClasses = newModalClasses.filter(
        (e) => e !== "cont_modal_active"
      );
    } else {
      newModalClasses.push("cont_modal_active");
    }
    this.setState({ modalClasses: newModalClasses });
  };

  render() {
    let cssModalClasses = this.state.modalClasses.map(
      (modalClass) => cssClasses[modalClass]
    );

    let contentTag = (
      <div className={cssClasses.cont_text_det_preparation}>
        <div className={cssClasses.cont_info_preparation}>
          <p>{this.props.instructions}</p>
        </div>
      </div>
    );

    if (this.state.showIngredients) {
      const listIngredients = Object.keys(this.props.ingredients).map(
        (ingredient, idx) => {
          return (
              [ingredient, ":", this.props.ingredients[ingredient],<br key={idx}></br>]
          );
        }
      );

      contentTag = (
        <div className={cssClasses.cont_text_det_preparation}>
          <div className={cssClasses.cont_info_preparation}>
            <p>{listIngredients}</p>
          </div>
        </div>
      );
    }

    return (
      <Auxiliary>
        <div className={cssClasses.cont_principal}>
          <div className={cssClasses.cont_central}>
            <div className={cssModalClasses.join(" ")}>
              <div className={cssClasses.cont_photo}>
                <div className={cssClasses.cont_img_back}>
                  <img src={this.props.image} alt={this.props.title} />
                </div>
                <div className={cssClasses.cont_mins}>
                  <div className={cssClasses.sub_mins}>
                    <h3>{this.props.prepMin}</h3>
                    <span>MINS</span>
                  </div>
                  <div className={cssClasses.cont_icon_right}>
                    <span>
                      <BookmarkBorderIcon />
                    </span>
                  </div>
                </div>
                <div className={cssClasses.cont_servings}>
                  <h3>{this.props.servings}</h3>
                  <span>SERVINGS</span>
                </div>
                <div className={cssClasses.cont_detalles}>
                  <h3>{this.props.title}</h3>
                  <p>
                    Country: {this.props.area}
                    <br />
                    Type: {this.props.category}
                    <br />
                    <br />
                    <br />
                    {this.props.tags ? "Tags: " + this.props.tags : null}
                  </p>
                </div>
              </div>
              <div className={cssClasses.cont_text_ingredients}>
                <div className={cssClasses.cont_over_hidden}>
                  <div className={cssClasses.cont_tabs}>
                    <ul>
                      <li onClick={this.showIngredientsHandler}>
                        <span>
                          <h4>INGREDIENTS</h4>
                        </span>
                      </li>
                      <li onClick={this.showPreparationHandler}>
                        <span>
                          <h4>PREPARATION</h4>
                        </span>
                      </li>
                    </ul>
                  </div>
                  {contentTag}
                  <div className={cssClasses.cont_btn_mas_dets}>
                    <span>
                      <KeyboardArrowDownIcon style={{ fontSize: "1.8rem" }} />
                    </span>
                  </div>
                </div>
                <div className={cssClasses.cont_btn_open_dets}>
                  <span onClick={this.openModalHandler}>
                    <KeyboardArrowLeftIcon style={{ fontSize: "1.8rem" }} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Auxiliary>
    );
  }
}

export default Foodcard;
