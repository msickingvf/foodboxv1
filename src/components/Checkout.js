import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import './Style.css';
import { useState, useEffect } from 'react'
export default function Checkout() {
    const location = useLocation();
    console.log("wieso: "+location.state.shoppingCart);
    const [cart, setCart] = useState(location.state.shoppingCart);
    const [cartTotalPrice, setCartTotalPrice] = useState(0);
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardMMYY, setCreditCardMMYY] = useState('');
    const [creditCardSecCode, setCreditCardSecCode] = useState('');
    const [email, setEmail] = useState(sessionStorage.getItem('username'));
    const navigate = useNavigate();
    const [orderSummary, setOrderSummary] = useState();
    const removeFromCart = (foodId) => {
        //rmvFromCartFunction(foodId);
        console.log("remove Item with id "+foodId);
        console.log("old cart: "+JSON.stringify(cart));
        //let newCart = cart.filter(food => food.id != foodId);
        //console.log("new cart: "+JSON.stringify(newCart));
        //cart = newCart;
        let tmpCart = [...cart];
        for (var i = tmpCart.length - 1; i >= 0; --i) {
            if (tmpCart[i].id == foodId) {
                tmpCart.splice(i,1);
                break;
            }
        }
        setCart(tmpCart);
        //calcCartTotal();
    }

    useEffect(() => {
        console.log("cart: "+JSON.stringify(location.state));  
        calcCartTotal();
    },[cart]);

    const calcCartTotal = () => {
        let newTotal = 0;
        cart.map((food, index)=>{
            newTotal = newTotal+food.price;
        }
        );
        console.log("new total: "+newTotal);
        setCartTotalPrice(newTotal);
    }

    const handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        switch(name){
            case 'name': setName(value);
            break;
            case 'street': setStreet(value);
            break;
            case 'city': setCity(value);
            break;
            case 'creditCardNumber': setCreditCardNumber(value);
            break;
            case 'creditCardMMYY': setCreditCardMMYY(value);
            break;
            case 'email' : setEmail(value);
            break;
            case 'creditCardSecCode': setCreditCardSecCode(value);
            break;
        }    
    }

    const handleSubmit = (event) =>{
        //alert('A name was submitted: ' + this.state.value);
        console.log("submit called");
        event.preventDefault();
        fetch(process.env.REACT_APP_SERVER_URL+'/orderFood',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              'foodItems' : cart,
               'email': email,
               'name' : name,
               'street': street,
               'city': city,
               'creditCardNumber': creditCardNumber, 
               'creditCardMMYY': creditCardMMYY,
               'creditCardSecCode' : creditCardSecCode,
               'totalPrice' : cartTotalPrice
            })
        })
        .then(response => response.json())
        .then(data=>{
            console.log('Success:', data);
            setOrderSummary(data);
              navigate('/orderConfirm', {state: {'orderSummary':data}});
            }
        );
      }

  return (
    <div className='ContentBoxx'>
        <h2>Checkout Shopping Cart</h2>
        {
                    cart.map((food, index)=>(                    
                        <div className="checkOutItem" key={index}>
                            <div className="checkOutFoodPicture"><img src={food.pictureUrl}></img></div>
                            <div className="checkOutFoodInfo">
                                <h2>{food.name}</h2>
                                <h4>{food.description}</h4>
                            </div>
                            <div className="checkOutFoodPrice">
                                <h2>{food.price}€</h2>
                                <button className="btn btn-primary" onClick={(event) => removeFromCart(food.id)}>remove</button>
                            </div>
                        </div>
                    )
                    )
        }
        <div className="totalPrice">
            <hr/>
            <h2> Total price: {cartTotalPrice}€</h2>
        </div>
        <div className="userDataAndPayment">
            <form onSubmit={handleSubmit}>
            <button type="submit" className="btn btn-primary" id="orderButton">Order</button>
            <div className="form-group">
                    <label htmlFor="emailid">Email</label>
                    <input type="text" name="email" className="form-control inputField" id="emailid"  placeholder="Enter Email" value={email} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="nameid">Full Name</label>
                    <input type="text" name="name" className="form-control inputField" id="nameid"  placeholder="Enter name" value={name} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="streetid">Street</label>
                    <input type="text" name="street" className="form-control inputField" id="streetid"  placeholder="Enter street" value={street} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="cityid">City</label>
                    <input type="text" name="city" className="form-control inputField" id="cityid"  placeholder="Enter city" value={city} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="creditCardNumberId">Credit Card Number</label>
                    <input type="text" name="creditCardNumber" className="form-control inputField" id="creditCardNumberid"  placeholder="Enter creditCardNumber" value={creditCardNumber} onChange={handleChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="creditCardMMYYid">Card Valid until (MMYY)</label>
                    <input type="text" name="creditCardMMYY" className="form-control inputField" id="creditCardMMYYid"  placeholder="Enter Date" value={creditCardMMYY} onChange={handleChange}/>
                </div>
                <div className="form-group lastOne" >
                    <label htmlFor="creditCardSecCodeid">Card Sec Code</label>
                    <input type="text" name="creditCardSecCode" className="form-control inputField" id="creditCardSecCodeid"  placeholder="Enter Code" value={creditCardSecCode} onChange={handleChange}/>
                </div>
                
            </form>

        </div>
    </div>
  )
}
