import { useState, useEffect } from "react";
import { dataRef } from '../firebase';
import "./Order.css";
import { useNavigate } from 'react-router-dom';

const Order = ()=>{

    const navigate = useNavigate();
    const [orderArray, setOrderArray] = useState([]);
    const [currentUserOrders, setCurrentUserOrders] = useState([]);
    const [isvalid, setIsValid]= useState(false);

    useEffect(()=>{

        dataRef.ref().child("orderdatabase").on('value', data=>{
            const getData = Object.values(data.val());
            setOrderArray(getData);
        })

        if(!localStorage.getItem("LoggedinUser")){
            navigate("/");
        }
        
    }, [])

    useEffect(()=>{
        console.log("Array : ", orderArray)
        const data = JSON.parse(localStorage.getItem("LoggedinUser")).username;
        console.log("LOgged In User : ", data)
        const res = orderArray.filter((item)=>{
            return item.userName === data
        })
        if(res.length>0){
            setCurrentUserOrders(res);
            setIsValid(true);
        }

    }, [orderArray])

    return(
        <div className="order-container">
            <div className="order-heading">
                <button type="button" onClick={()=>navigate("/userdashboard")}>GoBack</button>
                <h1>Order History</h1>
            </div>
            <div className="order-list">
                {isvalid ?  (currentUserOrders.map((item, index)=>{
                    return(<div key={index} className="order-row">
                        <p>Booking Done For : <strong>{item.userName}</strong></p>
                        <p>Destination Name : <strong>{item.destinationName}</strong></p>
                        <p>Package Price : <strong>{item.price}</strong></p>
                        <p>Booking Date : <strong>{item.bookedDate}</strong></p>
                    </div>)
            })):(<h1 style={{"color":"white"}}>Sorry!! No Data to display</h1>)}
            </div>
        </div>
    )
}

export default Order;