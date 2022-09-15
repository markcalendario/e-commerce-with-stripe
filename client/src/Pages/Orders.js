import React, { useCallback, useEffect, useState } from "react"
import AdminDashboard from "../Components/AdminDashboard"
import Navbar from "../Components/Navbar"
import { PurchaseTabAdmin } from "../Components/PurchaseTab"

export default function Orders() {
  return (
    <React.Fragment>
      <Navbar variant='primary-variant' />
      <AdminDashboard />
      <section id="orders">
        <div className="container">
          <div className="wrapper">
            <h1>Recent Orders</h1>
            <OrderList />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

function OrderList() {

  const [orders, setOrders] = useState(null)

  const fetchOrders = useCallback(() => {
    fetch(process.env.REACT_APP_API_URL + "/admin/orders", { method: 'GET', credentials: 'include' })
      .then(result => result.json())
      .then(result => { console.log(result); setOrders(result.orders) })

  }, [])

  useEffect(() => { fetchOrders() }, [])

  function displayOrders() {
    if (orders === null) return "Loading orders..."
    else if (orders.length === 0) return "No orders to show."
    else return orders.map(result => (
      <PurchaseTabAdmin
        key={result.uid}
        title={result.productData.title}
        description={result.productData.description}
        price={result.productData.price}
        buyer={result.fullName}
      />
    ))
  }

  return (
    <div className="orders-list">
      {displayOrders()}
    </div>
  )
}