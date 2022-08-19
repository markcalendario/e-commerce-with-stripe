import React from "react";
import Button from "../Components/Buttons";
import Navbar from "../Components/Navbar";

export default function Register() {
  return (
    <React.Fragment>
      <Navbar variant="white-variant" />
      <section id="register">
        <div className="container">
          <div className="wrapper">
            <div className="login-box">
              <h1 className="l-box-title">Shopitty.</h1>
              <h3>Register</h3>
              <div className="l-form-fields">
                <input type="text" name="email" id="email" placeholder="Email" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
              </div>
              <div className="l-form-control">
                <Button type="solid-btn-primary">Sign Up</Button>
                <a href="/login">You have an account? Login here.</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}