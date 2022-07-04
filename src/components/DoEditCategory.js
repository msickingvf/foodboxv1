import React from 'react'
import { useState, useEffect } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom';

export default function DoEditCategory() {
  const [categories, setCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const loadCategories = () => {
    fetch(process.env.REACT_APP_SERVER_URL+'/getCategories')
     .then(resp => resp.json())
     .then(fooddata => {
         console.log("data: "+JSON.stringify(fooddata));
         setCategories(fooddata);
     })
  }

  const deleteObject = (categoryId) => {
    console.log("Delete Object id"+categoryId);
    fetch(process.env.REACT_APP_SERVER_URL+'/admin/deleteCategory/'+categoryId, {
      method: 'DELETE'
    })
    .then((response) => {
      if(!response.ok){
        setErrorMessage("Error Deleting Category, maybe still food items assigned");
      }
    })
    .then(fooddata => {
        console.log("data: "+JSON.stringify(fooddata));
        loadCategories();
    })
  }

  useEffect(() => {
    loadCategories();
    },[])

  return (
    <div className='ContentBoxx'>
    <span className='error'>{errorMessage}</span>
    {
                categories.map((category, index)=>(                    
                    <div className="checkOutItem" key={index}>
                        <div className="editCategoryButton">
                        <NavLink className="nav-link active" to={`${category.id}`}>
                            <button type="button" className="btn btn-primary">
                                <div>Edit</div>
                            </button>
                        </NavLink>
                        <button type="button" className="btn btn-primary" onClick={() => deleteObject(category.id)}>
                                    <div>Delete</div>
                                </button>
                        </div>
                        <div className="checkOutFoodInfo">
                            <h2>{category.name}</h2>
                            <h4>{category.description}</h4>
                        </div>
                    </div>
                )
                )
    }   
</div>
  )
}
