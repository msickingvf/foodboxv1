import React from 'react'
import { useParams } from 'react-router-dom';
import './FoodItem.css';

export default function FoodItem(props) {
    const food = props.foodItem;
    const addToCart = props.addToCart;
  return (
    <div className="itemBox">
        <div className="foodPicture">
            <img src={food.pictureUrl}></img>
            
        </div>
       
        <div className="details">
            <h2>{food.name}</h2>
            <h4>{food.description}</h4>
            <h4>Price: {food.price} €</h4>
        </div>

        <div className="toCart">
        <button type="button" className="btn btn-primary" onClick={(event) => addToCart(food.id)}>Add to Cart</button>
        </div>
    </div>
  )
}
