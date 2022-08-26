import React, { useCallback, useEffect, useState } from "react";
import AdminDashboard from "../Components/AdminDashboard";
import { ItemCardAdminPosted } from "../Components/Cards";
import Navbar from "../Components/Navbar";

export default function Admin() {
  return (
    <React.Fragment>
      <Navbar variant="primary-variant" />
      <AdminDashboard />
      <section id="admin">
        <div className="container">
          <div className="wrapper">
            <h1>Products Posted</h1>
            <ProductsList />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

function ProductsList() {

  const [products, setProducts] = useState(null)

  const fetchProducts = useCallback(async () => {
    fetch(process.env.REACT_APP_API_URL + '/products', { method: 'GET' })
      .then(result => result.json())
      .then(result => {
        setProducts(result.products)
      })
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="products">
      {
        products === null
          ? "Loading products..."
          : products.length === 0
            ? "No products to show."
            : products.map(value => (
              <ItemCardAdminPosted
                key={value._id}
                productId={value._id}
                title={value.title}
                description={value.description}
                price={value.price}
                itemPhoto={process.env.REACT_APP_API_URL + "/products/view/" + value.imageId}
              />
            ))
      }
    </div>
  )
}