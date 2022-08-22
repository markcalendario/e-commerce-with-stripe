import React, { useState, useEffect, useCallback } from "react"
import { ItemCardCheckOut } from "../Components/Cards"
import Dashboard from "../Components/Dashboard"
import Navbar from "../Components/Navbar"

export default function Cart() {
  return (
    <React.Fragment>
      <Navbar variant="primary-variant" />
      <Dashboard />
      <section id="shop">
        <div className="container">
          <div className="wrapper">
            <h1>Your Cart</h1>
            <CartItems />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

function CartItems() {
  const [products, setProducts] = useState(null)

  const fetchCartProducts = useCallback(async () => {
    fetch(process.env.REACT_APP_API_URL + "/cart/",
      {
        method: 'GET', credentials: 'include'
      }).then(result => {
        return result.json()
      }).then(result => {
        setProducts(result.cartData)
      })
  }, [])

  useEffect(() => { fetchCartProducts() }, [fetchCartProducts])

  function displayAllCartProducts() {
    return products.map(value => (
      <ItemCardCheckOut
        key={value.product._id}
        productId={value.product._id}
        itemPhoto={process.env.REACT_APP_API_URL + "/products/view/" + value.product.imageId}
        title={value.product.title}
        description={value.product.description}
        price={value.product.price}
      />
    ))
  }

  return (
    <div className="items-list">
      {
        products === null ?
          "Loading..."
          : products.length === 0 ?
            "Your cart is empty."
            : displayAllCartProducts()
      }
    </div>
  )
}