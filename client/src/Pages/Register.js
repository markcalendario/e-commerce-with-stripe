import React from "react";
import Button from "../Components/Buttons";
import Navbar from "../Components/Navbar";

export default function Register() {

  function challengeConfirmPassword() {
    if (document.getElementById('password').value !== document.getElementById('confirm-password').value) {
      return alert("Password does not match!");
    }
  }

  function handleSignUpClick() {
    challengeConfirmPassword()

    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userName: document.getElementById('username').value,
        password: document.getElementById('password').value,
        fullName: document.getElementById('fullname').value,
      })
    }

    fetch(process.env.REACT_APP_API_URL + "/accounts/register", config)
      .then(result => {
        return result.json()
      }).then(result => {
        alert(result.message);
        if (result.success) window.location.href = "/login"
      })
  }

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
                <input type="text" name="username" id="username" placeholder="Username" />
                <input type="text" name="fullname" id="fullname" placeholder="Full Name" />
                <input type="password" name="password" id="password" placeholder="Password" />
                <input type="password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" />
              </div>
              <div className="l-form-control">
                <Button onClick={handleSignUpClick} type="solid-btn-primary">Sign Up</Button>
                <a href="/login">You have an account? Login here.</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}