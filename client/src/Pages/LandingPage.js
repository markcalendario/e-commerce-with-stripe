import React from "react";
import Navbar from "../Components/Navbar";
import HeroImage from "../Assets/Images/hero.svg"
import Button from "../Components/Buttons";

export default function LandingPage() {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
    </React.Fragment>
  )
}

function Hero() {
  return (
    <div id="hero">
      <div className="container">
        <div className="wrapper">
          <div className="hero-text col-5">
            <h1>Lorem, ipsum dolor sit amet consectetur adipisicing</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, nesciunt.</p>
            <Button type="solid-btn-primary">Start shopping</Button>
          </div>
          <div className="hero-image col-5">
            <img src={HeroImage} alt="hero" />
          </div>
        </div>
      </div>
    </div>
  )
}