import { useEffect, useState } from "react";
import "./Invoice.css";
import { useNavigate } from 'react-router-dom';
import { dataRef } from '../firebase';

const Invoice = ()=>{
    const navigate = useNavigate();
    const [invoiceObj, setInvoiceObj] = useState({
        userName:"",
        destinationName:"",
        price:"",
        bookedDate:""
    })

    useEffect(()=>{
        if(localStorage.getItem("BuyDestination") && localStorage.getItem("LoggedinUser")){
            const obj1 = JSON.parse(localStorage.getItem("BuyDestination"));
            const obj2 = JSON.parse(localStorage.getItem("LoggedinUser"));

            setInvoiceObj({...invoiceObj, destinationName:obj1.name, price:obj1.price, bookedDate:obj1.date, userName:obj2.username});
        
        }
        else{
            navigate("/");
        }
    }, [])

    const addOrderandGoBack = ()=>{
        dataRef.ref().child("orderdatabase").push(invoiceObj);
        localStorage.setItem("invoiceObj", JSON.stringify(invoiceObj));
        localStorage.removeItem("BuyDestination")
        navigate("/userdashboard");
    }

    return (
        <div className="invoice-container">
            <div className="left-section">
                <div className="img-section">
                    <img src="/Images/holiday-trip.jpg" alt="holiday_Image"/>
                </div>
            </div>
            <div className="right-section">
                <div className="top-section">
                    <h1>Booking Successful ✔</h1>
                    <h3>Packup your bags to begin your adventerous trip.</h3>
                </div>
                <div className="lower-section">
                    <div className="invoice-heading">
                        <h3>YOUR INVOICE</h3>
                    </div>
                    <div className="invoice-detail">
                        <p>Booking Done For : <strong>{invoiceObj.userName}</strong></p>
                        <p>Destination Name : <strong>{invoiceObj.destinationName}</strong></p>
                        <p>Package Price : <strong>{invoiceObj.price}</strong></p>
                        <p>Booking Date : <strong>{invoiceObj.bookedDate}</strong></p>
                    </div>
                    <button type="button" className="invoice-goback" onClick={addOrderandGoBack}>GoBack</button>
                </div>
            </div>
        </div>
    )
}

export default Invoice;