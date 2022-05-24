import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {
    const history = useNavigate()
    useEffect(() => {
        logout()
    })
    const logout = () => {
        localStorage.removeItem('role')
        localStorage.removeItem('token')
        localStorage.removeItem('isAuth')
        localStorage.removeItem('username')
        localStorage.removeItem('id_outlet')
        history('/login')
    }
  return (
    <div></div>
  )
}

export default Logout