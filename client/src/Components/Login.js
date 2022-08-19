import React from "react";
import Button from "./Buttons";

export default function Login() {
  return (
    <React.Fragment>
      <section id="login">
        <div className="container">
          <div className="wrapper">
            <div className="login-box">
              <h1 className="l-box-title">Shopitty.</h1>
              <h3>Login</h3>
              <div className="l-form-fields">
                <input type="text" name="email" id="email" placeholder="Email" />
                <input type="password" name="password" id="password" placeholder="Password" />
              </div>
              <div className="l-form-control">
                <Button type="solid-btn-primary">Sign In</Button>
                <a href="/register">New user? Register here.</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}