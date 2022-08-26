import React from "react";
import Button from "../Components/Buttons";
import Navbar from "../Components/Navbar";

export default function AdminLogin() {

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
    fetch(process.env.REACT_APP_API_URL + "/accounts/admin-login", config)
      .then(result => {
        return result.json()
      }).then(result => {
        if (!result.success)
          alert(result.message)
        else
          window.location.href = "/admin"
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
              <p>Administrator Login</p>
              <div className="l-form-fields">
                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="password" name="password" id="password" placeholder="Password" />
              </div>
              <div className="l-form-control">
                <Button onClick={handleSignInClick} type="solid-btn-primary">Sign In</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}