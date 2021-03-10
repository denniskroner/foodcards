import React from "react";

import cssClasses from "./button.module.scss";

function Button(props) {
  function animateButton(e) {
    e.preventDefault();
    //reset animation
    e.target.classList.remove(cssClasses.animate);

    e.target.classList.add(cssClasses.animate);
    setTimeout(function () {
      e.target.classList.remove(cssClasses.animate);
    }, 700);
  }

  return (
    <button
      className={[cssClasses["bubbly-button"], cssClasses[props.position]].join(' ')}
      onClick= {(e) => {
        animateButton(e);
        props.onclick();
      }}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
