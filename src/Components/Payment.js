import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import './Payment.css';

const Payment = ()=>{
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    useEffect(()=>{
        if(localStorage.getItem("LoggedinUser")){
            let price = localStorage.getItem("DestinationPrice");
            price = price.slice(2, 6);
            console.log("Price value : ", price)
            setAmount(price*100);
        }
        else{
            navigate("/login");        
        }
    }, [])

    const onToken = (token)=>{
        console.log(token);
        navigate("/invoice");
    }

    return (
        <>
            <div className='stripe-container'>
                <StripeCheckout
                    token={onToken}
                    name= "Enter Card Details"
                currency="USD"
                amount={amount}
                stripeKey="pk_test_51NCIOeSDLqX3gVZY6V6NVFEJmafYDWTTW7GuKSq6C8eSQxYvL4nngmcPI8A6yFkPfjzXPoe7eLk53dcIDi1DSODN00wBebnmFY"
                />
            </div>
        </>
    )
}

export default Payment;