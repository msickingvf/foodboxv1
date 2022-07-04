import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import FoodItem from './FoodItem';
import './Style.css';
export default function OrderFood() {
    const [cuisines,setCuisines] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [foods, setFoods] = useState([]);
    const [foodsDisplay, setFoodsDisplay] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [cart, setCart] = useState([]);
    
    //get couisines from server
    useEffect(() => {
        fetch(process.env.REACT_APP_SERVER_URL+'/getCategories')
         .then(resp => resp.json())
         .then(data => {
             console.log("data: "+JSON.stringify(data));
             setCuisines(data);
             loadAndFilterFood();
         })
        },[selectedCuisine])

    const cuisineChosen = (cuisineId) => {
        let cuisine = '';
        if (cuisineId != ''){
            console.log("chosen cuisineId: "+cuisineId);
            cuisine = cuisines.find(cuisine => cuisine.id == cuisineId);
            console.log("chosen cuisine: "+cuisine.name);
        } 
        
        setSelectedCuisine(cuisine);
    }

    const addToCart = (foodId) => {
        console.log("adding id to cart "+foodId);
        let currentCart = [...cart];
        let foodToAdd = foods.find(food=> food.id == foodId);
        currentCart.push(foodToAdd);
        setCart(currentCart); 
        console.log("cartFoods "+JSON.stringify(currentCart));
    }


    const handleChange = (e) => {
        console.log(e);
        let suggestions = [];
        let searchvalue = e.target.value;
        console.log("searchvalue: "+searchvalue);
        if (!searchvalue || searchvalue==''){
            setFoodsDisplay(foods);
        } else {
            searchvalue = searchvalue.charAt(0).toUpperCase() 
                + searchvalue.substring(1);
                for(let food of foods)
                {
                    if(food.name.includes(searchvalue))
                        suggestions.push(food);
                    else if (food.description.includes(searchvalue))
                        suggestions.push(food);
                }
                setFoodsDisplay(suggestions);
            }
        
    }

    const changeOrder = (toNewOrder) => {
        let currentFoods = [...foodsDisplay];
        console.log("new ordering: "+toNewOrder);
        console.log("Items: "+JSON.stringify(currentFoods));
        let newOrder = toNewOrder;
        setOrderBy(newOrder);
        if (newOrder === 'price'){
            currentFoods.sort((a,b) => {
                return a.price-b.price;
            });
        } else {
            currentFoods.sort((a, b) => {
                let fa = a.name.toLowerCase(),
                    fb = b.name.toLowerCase();
            
                if (fa < fb) {
                    return -1;
                }
                if (fa > fb) {
                    return 1;
                }
                return 0;
            });
        }
        setFoodsDisplay(currentFoods);
    }

    const loadAndFilterFood = () => {
        let filteredFoods = [];
        fetch(process.env.REACT_APP_SERVER_URL+'/getFoods')
         .then(resp => resp.json())
         .then(fooddata => {
             console.log("data: "+JSON.stringify(fooddata));
             //setAllFoods(fooddata);
             if (selectedCuisine != ''){
                console.log("selected cuisine id: "+selectedCuisine.id);
                filteredFoods = fooddata.filter(foodItem => foodItem.category.id == selectedCuisine.id)
             } else {
                 filteredFoods = fooddata;
             }
             console.log("filtered Data: "+JSON.stringify(filteredFoods));
             setFoods(filteredFoods);
             setFoodsDisplay(filteredFoods);
             
         })
    }


  return (
    <div className='ContentBoxx'>
        {
        sessionStorage.getItem('welcomeMessage') ===  null &&
            <h3>Login first to order.</h3>
        }
        {
            sessionStorage.getItem('welcomeMessage') !=  null &&
            <div>
                <div className="filterAndSorting">
                    <label htmlFor="exampleFormControlSelect1">Cuisine and Food Filter</label>
                    <select className="form-control categorySelect" id="exampleFormControlSelect1" onChange={e => cuisineChosen(e.target.value)}>
                        <option value=''>--</option>
                        {
                            cuisines.map((data, index)=>
                                <option key={index} value={data.id}>{data.name}</option>
                            )
                        }
                    </select>
                    <input type="text" className="foodSearch form-control" placeholder="Search in Cuisine" onChange={(e) => handleChange(e)}/>
                    <p className="orderByText">Order by</p> 
                    <div className="btn-group btn-group-toggle orderByButton" data-toggle="buttons">
                        <label className="btn btn-secondary active">
                            <input type="radio" name="options" id="name" value="name" checked={orderBy === "name"} onChange={(e) => changeOrder(e.target.value)}/>Name asc
                        </label>
                        <label className="btn btn-secondary">
                            <input type="radio" name="options" value="price" id="price" checked={orderBy === "price"} onChange={(e) => changeOrder(e.target.value)}/>Price asc
                        </label>
                    </div>
                </div>
                <div className="shoppingCartDiv">
                    <Link className="nav-link active" to={{pathname: '/checkout'}} state={{shoppingCart:cart}}>
                    <button type="button" className="btn btn-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"></path>
                        </svg>
                        <div>({cart.length} Items)</div>
                    </button>
                    </Link>
                </div>
                {
                    foodsDisplay.map((food, index)=>(                      
                        <FoodItem foodItem={food} key={index} addToCart={addToCart}/>  
                    )
                    )
                }
          </div>
        }
    </div>
  )
}
