import React from "react";

export default function Dashboard() {
  return (
    <section id="dashboard">
      <div className="container">
        <div className="wrapper">
          <div className="d-info">
            <h1>Mark Kenneth Calendario</h1>
            <p>markcalendario@gmail.com</p>
          </div>
          <div className="d-controls">
            <div className="d-box col-3 purchases">Purchases</div>
            <div className="d-box col-3 cart">Cart</div>
            <div className="d-box col-3 out">Sign Out</div>
          </div>
        </div>
      </div>
    </section>
  )
}