import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function EditFood() {
  const [foods, setFoods] = useState([]);

  const loadFood = () => {
    fetch(process.env.REACT_APP_SERVER_URL+'/getFoods')
     .then(resp => resp.json())
     .then(fooddata => {
         console.log("data: "+JSON.stringify(fooddata));
         setFoods(fooddata);
     })
  }

  const deleteObject = (foodId) => {
    console.log("Delete Object id"+foodId);
    fetch(process.env.REACT_APP_SERVER_URL+'/admin/deleteFood/'+foodId, {
      method: 'DELETE'
    })
    .then(fooddata => {
        console.log("data: "+JSON.stringify(fooddata));
        loadFood();
    })
  }

  useEffect(() => {
    loadFood();
    },[])

  return (
    <div className='ContentBoxx'>
        {
                    foods.map((food, index)=>(                    
                        <div className="checkOutItem" key={index}>
                            <div className="editFoodButton">
                            <NavLink className="nav-link active" to={`${food.id}`}>
                                <button type="button" className="btn btn-primary">
                                    <div>Edit</div>
                                </button>
                            </NavLink>
                                <button type="button" className="btn btn-primary" onClick={() => deleteObject(food.id)}>
                                    <div>Delete</div>
                                </button>
                            </div>
                            <div className="checkOutFoodPicture"><img src={food.pictureUrl}></img></div>
                            <div className="checkOutFoodInfo">
                                <h2>{food.name}</h2>
                                <h4>{food.description}</h4>
                            </div>
                            <div className="checkOutFoodPrice">
                                <h2>{food.price}€</h2>
                            </div>
                        </div>
                    )
                    )
        }   
    </div>
  )
}
