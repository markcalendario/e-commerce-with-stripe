import React, { useCallback, useEffect, useState } from "react";

async function isAdminAuthenticated() {
  return await new Promise(resolve => {
    fetch(process.env.REACT_APP_API_URL + "/auth/admin", { method: 'GET', credentials: 'include' })
      .then(result => {
        return result.json()
      }).then(result => {
        console.log(result);
        resolve(result.isAuth)
      })
  })
}

export function AdminProtectedRoute({ component, redirect }) {
  const [isAuth, setIsAuth] = useState(null);

  const auth = useCallback(async () => {
    const isAuth = await isAdminAuthenticated();
    setIsAuth(isAuth)
  }, [])

  useEffect(() => {
    auth()
  }, [auth])

  function getRender() {
    if (isAuth === null) {
      return "Authenticating..."
    } else if (isAuth) {
      return component
    } else {
      window.location.href = redirect
    }
  }

  return (
    <React.Fragment>
      {getRender()}
    </React.Fragment>
  )
}