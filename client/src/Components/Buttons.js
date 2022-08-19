import React from "react";

export default function Button(props) {
  return (
    <button
      id={props.id}
      className={props.type ? "primary-button " + props.type : "primary-button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}