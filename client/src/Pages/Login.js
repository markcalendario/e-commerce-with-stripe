import React from "react";
import Button from "../Components/Buttons";
import Navbar from "../Components/Navbar";

export default function Login() {

  function handleSignInClick() {
    const config = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value,
      })
    }
    fetch(process.env.REACT_APP_API_URL + "/accounts/login", config)
      .then(result => {
        return result.json()
      }).then(result => {
        if (!result.success)
          alert(result.message)
        else
          window.location.href = "/shop"
      })
  }

  return (
    <React.Fragment>
      <Navbar variant="white-variant" />
      <section id="login">
        <div className="container">
          <div className="wrapper">
            <div className="login-box">
              <h1 className="l-box-title">Shopitty.</h1>
              <h3>Login</h3>
              <div className="l-form-fields">
                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="password" name="password" id="password" placeholder="Password" />
              </div>
              <div className="l-form-control">
                <Button onClick={handleSignInClick} type="solid-btn-primary">Sign In</Button>
                <a href="/register">New user? Register here.</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}