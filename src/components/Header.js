import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function Header() {

  return (

        <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <h1 className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
            FoodBox
        </h1>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li className="nav-item"><NavLink className="nav-link active" to='/home'>Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link active" to={{pathname: '/orderFood'}} >Order Food</NavLink></li>
        </ul>

        <div className="col-md-3 text-end">
            <button type="button" className="btn btn-outline-primary me-2"><NavLink className="nav-link active" to={{pathname: '/login'}}>UserLogin</NavLink></button>
            <button type="button" className="btn btn-outline-primary me-2"><NavLink className="nav-link active" to='/adminLogin'>AdminLogin</NavLink></button>
        </div>
        </header>
    </div>
  )
}
