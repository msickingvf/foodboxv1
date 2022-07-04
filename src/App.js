import logo from './logo.svg';
import {Routes , Route, UNSAFE_RouteContext} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home';
import OrderFood from './components/OrderFood';
import Main from './components/Main';
import Checkout from './components/Checkout';
import OrderConfirm from './components/OrderConfirm';
import AdminLogin from './components/AdminLogin';
import AdminDashBoard from './components/AdminDashBoard';
import EditFood from './components/EditFood';
import AddCategory from './components/AddCategory';
import DoEditCategory from './components/DoEditCategory';
import EditFoodForm from './components/EditFoodForm';
import EditCategoryForm from './components/EditCategoryForm';
import Register from './components/Register';
function App() {
  return (
    <div className="App">
      <Header/>   
      <Routes>
        <Route path='/' element={<Main/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/adminLogin' element={<AdminLogin/>}></Route>
        <Route path='/orderFood' element={<OrderFood/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/adminDashboard' element={<AdminDashBoard/>}>
            <Route path='editFood' element={<EditFood/>}></Route>
            <Route path='editFood/:foodId' element={<EditFoodForm/>}></Route>
            <Route path='addFood'  element={<EditFoodForm/>}></Route>
            <Route path='editCategory' element={<DoEditCategory/>}></Route>
            <Route path='editCategory/:categoryId' element={<EditCategoryForm/>}></Route>
            <Route path='addCategory' element={<EditCategoryForm/>}></Route>  
        </Route>
        <Route path='/orderConfirm' element={<OrderConfirm/>}></Route>
      </Routes>

    </div>
  );
}

export default App;
