import React, { useCallback, useEffect, useState } from "react"
import { ItemCardAddToCart } from "../Components/Cards"
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
  const [products, setProducts] = useState(null)

  const fetchProducts = useCallback(async () => {
    fetch(process.env.REACT_APP_API_URL + "/products/",
      {
        method: 'GET', credentials: 'include'
      }).then(result => {
        return result.json()
      }).then(result => {
        setProducts(result.products)
      })
  }, [])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  function displayAllProducts() {
    return products.map(value => (
      <ItemCardAddToCart
        key={value._id}
        productId={value._id}
        itemPhoto={process.env.REACT_APP_API_URL + "/products/view/" + value.imageId}
        title={value.title}
        description={value.description}
        price={value.price}
      />
    ))
  }

  return (
    <div className="items-list">
      {
        products === null ?
          "Loading..."
          : products.length === 0 ?
            "No products to display."
            : displayAllProducts()
      }
    </div>
  )
}