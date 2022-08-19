import React from "react"
import Button from "./Buttons"


export function ItemCard(props) {
  return (
    <div className="item-card">
      <div className="item-image">
        <img src={props.itemPhoto} alt="Item" />
      </div>
      <div className="item-content">
        <h3 className="item-title">{props.title}</h3>
        <p className="item-description">{props.description}</p>
        <h2 className="item-price">${props.price}</h2>
        <Button type="solid-btn-primary">Add To Cart</Button>
      </div>
    </div>
  )
}