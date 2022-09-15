import React from 'react'

export function PurchaseTab(props) {
  return (
    <div className="purchase">
      <h4 className="title">{props.title}</h4>
      <p className="desc">{props.description}</p>
      <h5 className="price">PHP {props.price}</h5>
    </div>
  )
}

export function PurchaseTabAdmin(props) {
  return (
    <div className="purchase">
      <h4 className="title">{props.title}</h4>
      <p className="desc">{props.description}</p>
      <h5 className="price">PHP {props.price}</h5>
      <p className='buyer'>{props.buyer}</p>
    </div>
  )
}