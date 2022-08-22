import React, { useCallback, useEffect, useState } from "react";

export default function Dashboard() {

  const [userData, setUserData] = useState({ fullName: '...', userName: '...' })

  const fetchUserInfo = useCallback(async () => {
    const config = {
      method: "POST",
      credentials: 'include'
    }
    fetch(process.env.REACT_APP_API_URL + "/accounts/my-info", config)
      .then(result => { return result.json() })
      .then(result => {
        if (result.success) setUserData(result.userData)
      })
  }, [])

  useEffect(() => { fetchUserInfo() }, [fetchUserInfo])

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
            <h1>{userData.fullName}</h1>
            <p>{userData.userName}</p>
          </div>
          <div className="d-controls">
            <div onClick={() => window.location.href = "/shop"} className="d-box shop">Shop</div>
            <div onClick={() => window.location.href = "/purchases"} className="d-box purchases">Purchases</div>
            <div onClick={() => window.location.href = "/shop/cart"} className="d-box cart">Cart</div>
            <div onClick={handleSignOut} className="d-box out">Sign Out</div>
          </div>
        </div>
      </div>
    </section>
  )
}