import React, { Component } from "react";

import axios from "axios";
import Foodcard from "./container/foodcard/foodcard";
import Auxiliary from "./hoc/auxiliary";
import Button from "./container/button/button";

class App extends Component {
  state = {
    foodcardIdx: 0,
    meals: [],
    foodcards: [],
  };

  componentDidMount() {
    this.httpRequestHandler();
  }

  componentDidUpdate() {
    const numMeals = this.state.meals.length;
    const currFoodIdx = this.state.foodcardIdx;

    if (numMeals === currFoodIdx) {
      this.httpRequestHandler();
    }
  }

  httpRequestHandler = () => {
    axios
      .get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        // create copy of meals array
        let meals = [...this.state.meals];

        // create copy of foodcards array
        let foodcards = [...this.state.foodcards];

        // append new meal to the copy of meals array
        const meal = {
          ...response.data.meals[0],
          prepMin: parseInt(Math.random() * (70 - 20) + 20),
          servings: parseInt(Math.random() * (5 - 2) + 2),
        };
        meals.push(meal);

        // append new foodcard to the copy of meals array
        const newFoodcard = this.createFoodcardHandler(meal);
        foodcards.push(newFoodcard);

        // update state of meals and foodcards arrays
        this.setState({ meals: meals, foodcards: foodcards });
      });
  };

  createFoodcardHandler = (meal) => {
    const ingredients = {};
    let i = 1;

    let ingredient = meal["strIngredient" + i];
    let measures = meal["strMeasure" + i];
    while (ingredient !== "") {
      ingredients[ingredient] = measures;

      i++;
      ingredient = meal["strIngredient" + i];
      measures = meal["strMeasure" + i];
    }

    return (
      <Foodcard
        key={meal.idMeal}
        title={meal.strMeal}
        area={meal.strArea}
        category={meal.strCategory}
        image={meal.strMealThumb}
        instructions={meal.strInstructions}
        tags={meal.strTags}
        ingredients={ingredients}
        prepMin = {meal.prepMin}
        servings = {meal.servings}
      />
    );
  };

  prevFoodcardHandler = () => {
    let idx = this.state.foodcardIdx;
    let newIdx = Math.max(idx - 1, 0);
    this.setState({ foodcardIdx: newIdx });
  };

  nextFoodcardHandler = () => {
    let idx = this.state.foodcardIdx;
    let newIdx = idx + 1;
    this.setState({ foodcardIdx: newIdx });
  };

  render() {
    let foodcard = null;
    const len = this.state.foodcards.length;
    const cardIdx = this.state.foodcardIdx;
    if (len !== 0) {
      if (len === cardIdx) {
        foodcard = this.state.foodcards[len - 1];
      } else {
        foodcard = this.state.foodcards[cardIdx];
      }
    }

    return (
      <Auxiliary>
        <Button
          position="Left"
          onclick={this.prevFoodcardHandler}
          disabled={this.state.foodcardIdx === 0}
        >
          Prev
        </Button>

        <Button
          position="Right"
          onclick={this.nextFoodcardHandler}
          disabled={false}
        >
          Next
        </Button>

        {foodcard}
      </Auxiliary>
    );
  }
}

export default App;
