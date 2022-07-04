import React from 'react'
import { useParams , useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function EditFoodForm() {
    let params = useParams();
    const navigate = useNavigate();
    console.log("EditFoodForm Called, params: "+JSON.stringify(params));
    let fid = params.foodId;
    const [food, setFood] = useState(null);
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [pictureUrl, setPictureUrl] = useState('');
    const [enabled, setEnabled] = useState(false);
    const [price, setPrice] = useState(0.0);
    const [category, setCategory] = useState(null);
    const [availableCategories, setAvailableCategories] = useState([]);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        console.log("fid: "+fid);
        if (typeof(fid) === 'undefined'){
            console.log("Create new Food");
            setId(null);
            setFood(null);
            setName('');
            setDescription('');
            setPictureUrl('');
            setEnabled(false);
            setPrice(0.0);
            getAvailableCategories();
            setCategory(availableCategories[0]);
        } else {
            console.log("Edit existing Food id "+fid);
            getAvailableCategories();
            fillFoodData(fid);
        }
    },[fid]);

    const getAvailableCategories = () => {
        console.log("Fetch Available Categories");
        fetch(process.env.REACT_APP_SERVER_URL+'/getCategories')
        .then(resp => resp.json())
        .then(categoriesdata => {
            console.log("data: "+JSON.stringify(categoriesdata));
            setAvailableCategories(categoriesdata);
        })
    }

    const fillFoodData = (fid) => {
        fetch(process.env.REACT_APP_SERVER_URL+'/getFoodById/'+fid)
        .then(resp => resp.json())
        .then(fooddata => {
            console.log("data: "+JSON.stringify(fooddata));
            setId(fooddata.id);
            setFood(fooddata);
            setName(fooddata.name);
            setDescription(fooddata.description);
            setPictureUrl(fooddata.pictureUrl);
            setEnabled(fooddata.enabled);
            setPrice(fooddata.price);
            setCategory(fooddata.category);
            
        })
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        console.log("handleSubmit Called "+event);
        let newFood = Object.assign({}, food);
        newFood.name = name;
        newFood.description = description;
        newFood.id = id;
        newFood.pictureUrl = pictureUrl;
        newFood.price = price;
        newFood.category = category;
        newFood.enabled = enabled;
        setFood(newFood);
        fetch(process.env.REACT_APP_SERVER_URL+'/admin/setFood',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFood)
        })
        navigate('/adminDashboard/editFood');
    }

    const handleChange = (event)=>{
        let name = event.target.name;
        let value = event.target.value;
        console.log("Eventdata: name:"+name+" value: "+value);
        switch(name){
            case 'name': setName(value);
            break;
            case 'description': setDescription(value);
            break;
            case 'pictureUrl': setPictureUrl(value);
            break;
            case 'foodEnabled': setEnabled(event.target.checked);
            break;
            case 'price': setPrice(value);
            break;
            case 'category': {
                let newCategory = availableCategories.find(cat => cat.id == value);
                setCategory(newCategory);
            }
            break;
        }    
    }


  return (
    <div className='ContentBoxx'>
        <p>{message}</p>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="nameId">Food Name</label>
            <input type="text" name="name" className="form-control inputField" id="nameId" placeholder="Food Name" value={name} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="descriptionId">Description</label>
            <input type="text" className="form-control inputField" id="descriptionId" name="description" value={description} placeholder="Description" onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="pictureId">Picture Url</label>
            <input type="text" name="pictureUrl" className="form-control inputField" id="pictureId" placeholder="Picture Url" value={pictureUrl} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label htmlFor="priceId">Price</label>
            <input type="text" name="price" className="form-control inputField" id="priceId" placeholder="Price" value={price} onChange={handleChange}/>
        </div>
        <div className="form-group">
            <label className="form-check-label" htmlFor="flexCheckChecked">Food Enabled:</label>
            <input className="form-check-input" type="checkbox" name="foodEnabled" value="foodEnabled" id="flexCheckChecked" checked={enabled} onChange={handleChange}/>
        </div>
        <div className="form-group lastOne">
        <label htmlFor="exampleFormControlSelect1">Cuisine</label>
                    <select className="form-control categorySelect" id="exampleFormControlSelect1" name="category" onChange={handleChange} value={category?.id}>
                        {category?.id || <option selected disabled>Choose here</option>}
                        {
                            availableCategories.map((data, index)=>
                                <option key={index} value={data.id}>{data.name}</option>
                            )
                        }
                    </select>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        </form>

    </div>
  )
}
