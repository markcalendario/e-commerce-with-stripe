import React, { useCallback, useEffect, useState } from "react"
import Dashboard from "../Components/Dashboard"
import Navbar from "../Components/Navbar"

export default function Purchases() {
  return (
    <React.Fragment>
      <Navbar variant="primary-variant" />
      <Dashboard />
      <section id="purchases">
        <div className="container">
          <div className="wrapper">
            <h1>Your Purchases</h1>
            <PurchasesList />
          </div>
        </div>
      </section>
    </React.Fragment>
  )
}

function PurchasesList() {
  const [purchases, setPurchases] = useState(null)

  const fetchPurchases = useCallback(async () => {
    fetch(process.env.REACT_APP_API_URL + "/payments/my-purchases", {
      method: 'GET',
      credentials: 'include'
    }).then(result => result.json())
      .then(result => {
        setPurchases(result.data)
      })
  }, [])

  useEffect(() => { fetchPurchases() }, [fetchPurchases])

  function displayPurchases() {
    if (purchases === null) {
      return "Loading..."
    } else if (purchases.length === 0) {
      return "Nothing to display"
    } else {
      return purchases.map(value => (
        <div className="purchase">
          <h4 className="title">{value.title}</h4>
          <p className="desc">{value.description}</p>
          <h5 className="price">PHP {value.price}</h5>
        </div>
      ))
    }
  }

  return (
    <div className="purchase-list">
      {displayPurchases()}
    </div>
  )
}