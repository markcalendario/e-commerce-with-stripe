import React from "react";

export default function AdminDashboard() {

  function handleSignOut() {
    const config = {
      method: "POST",
      credentials: 'include'
    }
    fetch(process.env.REACT_APP_API_URL + "/accounts/sign-out", config)
      .then(result => { return result.json() })
      .then(() => {
        window.location.reload()
      })
  }

  return (
    <section id="dashboard">
      <div className="container">
        <div className="wrapper">
          <div className="d-info">
            <h1>Administrator</h1>
            <p>You are logged in as Admin</p>
          </div>
          <div className="d-controls">
            <div onClick={() => window.location.href = "/shop"} className="d-box d-box-blue"><i className="fa-solid fa-plus-circle"></i> Add Product</div>
            <div onClick={() => window.location.href = "/orders"} className="d-box d-box-green"><i className="fa-solid fa-boxes-stacked"></i> Orders</div>
            <div onClick={handleSignOut} className="d-box d-box-red"><i className="fa-solid fa-right-from-bracket"></i> Signout</div>
          </div>
        </div>
      </div>
    </section >
  )
}