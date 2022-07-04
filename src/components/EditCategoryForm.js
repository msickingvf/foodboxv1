import React from 'react'
import { useParams , useNavigate, useLocation} from 'react-router-dom';
import { useState, useEffect } from 'react'

export default function EditCategoryForm() {
    let params = useParams();
    const navigate = useNavigate();
    let cid = params.categoryId;
    const [category, setCategory] = useState(null);
    const [id, setId] = useState();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        console.log("cid: "+cid);
        if (typeof(cid) === 'undefined'){
            console.log("Create new Category");
            setId(null);
            setCategory(null);
            setName('');
            setDescription('');
        } else {
            console.log("Edit existing category id "+cid);
            fillCategoryData(cid);
        }
    },[cid]);

    const fillCategoryData = (cid) => {
        fetch(process.env.REACT_APP_SERVER_URL+'/getCategoryById/'+cid)
        .then(resp => resp.json())
        .then(fooddata => {
            console.log("data: "+JSON.stringify(fooddata));
            setId(fooddata.id);
            setCategory(fooddata);
            setName(fooddata.name);
            setDescription(fooddata.description);
        })
    }

    const handleSubmit =(event)=>{
        event.preventDefault();
        console.log("handleSubmit Called "+event);
        let newCategory = Object.assign({}, category);
        newCategory.name = name;
        newCategory.description = description;
        newCategory.id = id;
        setCategory(newCategory);
        fetch(process.env.REACT_APP_SERVER_URL+'/admin/setCategory',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCategory)
        })
        navigate('/adminDashboard/editCategory');
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
        }    
    }

  return (
    <div className='ContentBoxx'>
    <form onSubmit={handleSubmit}>
    <div className="form-group">
        <label htmlFor="nameId">Category Name</label>
        <input type="text" name="name" className="form-control inputField" id="nameId" placeholder="Category Name" value={name} onChange={handleChange}/>
    </div>
    <div className="form-group lastOne">
        <label htmlFor="descriptionId">Description</label>
        <input type="text" className="form-control inputField" id="descriptionId" name="description" value={description} placeholder="Description" onChange={handleChange}/>
    </div>
    <button type="submit" className="btn btn-primary">Save</button>
    </form>

</div>
  )
}
