import React from "react";

export default function Navbar(props) {
  return (
    <nav id="main-nav" className={props.variant}>
      <div className="container">
        <div className="wrapper">
          <div className="brand">
            <h1>Shopitty.</h1>
          </div>
          <div className="links">
            <a target="_blank" rel="noreferrer" href="https://github.com/markcalendario">View on GitHub</a>
          </div>
        </div>
      </div>
    </nav>
  )
}