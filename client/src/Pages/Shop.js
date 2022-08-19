import React from "react"
import { ItemCard } from "../Components/Cards"
import Dashboard from "../Components/Dashboard"
import Navbar from "../Components/Navbar"

export default function Shop() {
  return (
    <React.Fragment>
      <Navbar variant="primary-variant" />
      <Dashboard />
      <section id="shop">
        <div className="container">
          <div className="wrapper">
            <h1>Browse Products</h1>
            <DisplayItems />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

function DisplayItems() {
  return (
    <div className="items-list">
      <ItemCard
        itemPhoto="https://img.freepik.com/free-photo/colorful-slip-unisex-streetwear-sneakers-fashion_53876-101518.jpg?w=740&t=st=1660927596~exp=1660928196~hmac=d7b36092502f2f30cb55fb30417a260dc0dfad552038292a0f9fe3a48489787a"
        title="Colorful Slip-on Unisex Streetwear Sneakers Fashion"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, ex. Hic, voluptatibus avudera."
        price={30.35}
      />
      <ItemCard
        itemPhoto="https://img.freepik.com/premium-photo/fashion-male-sport-shoes-blue-background-stylish-man-sneakers-fitness-close-up_77190-1693.jpg?w=740"
        title="White Sneakers for Sport with Blue Outline"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, ex. Hic, voluptatibus avudera."
        price={30.35}
      />
      <ItemCard
        itemPhoto="https://img.freepik.com/free-photo/man-red-polo-shirt-apparel-studio-shoot_53876-102825.jpg?w=740&t=st=1660926644~exp=1660927244~hmac=c443a6f25c7cf52f2e3cb430dfa93afea5f373a7a1d90695bef70bdd5a96dfa0"
        title="Cotton Polo Shirts for Men"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, ex. Hic, voluptatibus avudera."
        price={10.35}
      />
      <ItemCard
        itemPhoto="https://img.freepik.com/free-photo/man-blank-blue-polo-holds-cap-pink-background_185193-70578.jpg?w=740&t=st=1660926710~exp=1660927310~hmac=12a3a8d919ca64be5dcb2155ef2ce275c29370ddf144307729138ee7921500be"
        title="Neat and Clean Unisex Polo Shirt"
        description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi, ex. Hic, voluptatibus avudera."
        price={11.00}
      />
    </div>
  )
}