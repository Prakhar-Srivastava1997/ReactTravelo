import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Userdashboard from './Components/Userdashboard';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Details from './Components/Details';
import Destination from './Components/Destination';
import Payment from './Components/Payment';
import Invoice from './Components/Invoice';
import Order from './Components/Order';

function App() {

  const [showDetailPage, setShowDetailPage] = useState(false);

  const detailPageHandler = ()=>{
    setShowDetailPage(true);
  }

  const hideDetailPageHandler = ()=>{
    setShowDetailPage(false);
  }

  return (
    <>
      {showDetailPage && <Details hidepage = {hideDetailPageHandler}/>}
      <Routes>
        <Route path="/" element={<Home showpage = {detailPageHandler}/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/userdashboard' element={<Userdashboard showpage = {detailPageHandler}/>}/>
        <Route path='/destination' element={<Destination/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route path="/orders" element={<Order/>}/>
      </Routes>
    </>
  
  );
}

export default App;
