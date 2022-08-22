import React from "react"
import Button from "../Components/Buttons"

export default function PaymentCancelled() {
  return (
    <section id="payment-result">
      <div className="container">
        <div className="cancelled wrapper">
          <React.Fragment>
            <img src={require('../Assets/Images/cancelled-purchase.svg').default} alt="Purchase" />
            <h1>Payment Cancelled!</h1>
            <p>You have completely cancelled your purchase.</p>
            <Button onClick={() => { window.location.href = "/shop" }} type="solid-btn-primary">Go Back</Button>
          </React.Fragment>
        </div>
      </div>
    </section>
  )
}