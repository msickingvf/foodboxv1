import React from 'react'
import { useLocation } from 'react-router-dom';
export default function OrderConfirm() {
    const { state } = useLocation();
    const { orderSummary } = state;
    console.log("summary: "+JSON.stringify(orderSummary));
  return (
    <div className='ContentBoxx'>
        <h2>Food Ordered</h2>
        <h4>Thanks for ordering, we will deliver as soon as possible.</h4>
        {
                    orderSummary.foodItems.map((food, index)=>(                    
                        <div className="checkOutItem" key={index}>
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
        <div className="totalPrice">
            <hr/>
            <h2> Total price: {orderSummary.totalPrice}€</h2>
            <h2> Name: {orderSummary.name}</h2>
            <h2> Street: {orderSummary.street}</h2>
            <h2> City: {orderSummary.city}</h2>
            <h2> Email: {orderSummary.email}</h2>
            <h2> CreditCardInfo: {orderSummary.creditCardNumber}, {orderSummary.creditCardMMYY}, {orderSummary.creditCardSecCode}</h2>
        </div>
    </div>
  )
}
