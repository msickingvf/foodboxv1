import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
export default function AdminDashBoard() {
  return (
    <div className='ContentBoxx'>
        <div className="adminNav">
            <button className="btn btn-primary"><NavLink className="nav-link active" to={{pathname: 'editFood'}}>Edit Food</NavLink></button>
            <button className="btn btn-primary"><NavLink className="nav-link active" to={{pathname: 'addFood'}}>Add Food</NavLink></button>
            <button className="btn btn-primary"><NavLink className="nav-link active" to={{pathname: 'editCategory'}}>Edit Categories</NavLink></button>
            <button className="btn btn-primary"><NavLink className="nav-link active" to={{pathname: 'addCategory'}}>Add Categories</NavLink></button>
        </div>
        <div className="adminEditBox">
        <Outlet/>
        </div>
    </div>
  )
}
