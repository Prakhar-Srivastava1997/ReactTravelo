import { useEffect, useState } from "react";
import axios from 'axios';
import './Destination.css';
import { useNavigate } from "react-router-dom";

var final_resultobj;
const Destination = ()=>{

    const [destArray, setDestArray] = useState([]);
    const [ name, setName] = useState("");
    const [about, setAbout ]= useState("");
    const [price, setPrice] = useState("");
    const [climate, setClimate] = useState("");
    const [food, setFood] = useState("");
    const [img, setImg] = useState("");
    const navigate = useNavigate();
    

    const getAllPackage = async()=>{

        const data = await axios.get("https://travelo-data.onrender.com/destinations").catch((err)=>{
            alert(err.message);
        })
        setDestArray(data.data);  
    }

    useEffect(()=>{
        getAllPackage();
        
    }, [])

    useEffect(()=>{
        objdata();
    }, [destArray])

    useEffect(()=>{
        displayData();
    }, [final_resultobj])

    const objdata = ()=>{
        let res = JSON.parse(localStorage.getItem("SearchedDestinationObj"))

        final_resultobj = destArray.filter((item)=>{
            return item.name === res.destinationName
        })     
        
       
    }

    const displayData = ()=>{
        final_resultobj.map((item)=>{
            setName(item.name);
            setPrice(item.price);
            setClimate(item.climate);
            setFood(item.food);
            setImg(item.img);
            setAbout(item.about);
        })
    }

    const makePayment = ()=>{
        localStorage.setItem("DestinationPrice", JSON.stringify(price));
        localStorage.setItem("BuyDestination", JSON.stringify({name, price, date:new Date().toLocaleString()}));
        navigate("/payment");
    }

    return(
        <>
            <div className="destiondetails-container">
                <div className="left-section">
                    <img src={img} alt="image"/>
                    <div className="name-about">
                        <div className="name-section">
                            <h2>Destination : </h2>
                            <h3>{name}</h3>
                            <hr></hr>
                        </div>
                        <div className="about-section">
                            <h2>About : </h2>
                            <p>{about}</p>
                            <hr></hr>
                        </div>
                    </div>
                </div>
                <div className="right-section">
                    
                    <div className="climate-section">
                        <h2>Climate : </h2>
                        <p>{climate}</p>
                        <hr></hr>
                    </div>
                    <div className="food-section">
                        <h2>Food : </h2>
                        <p>{food}</p>
                        <hr></hr>
                    </div>
                    
                </div>
                <div className="btn-container">
                <button type="button" onClick={makePayment} className="buypkg-btn">Buy Package@ {price}</button>
                {localStorage.getItem("LoggedinUser") ? (<button type="button" className="back-button" onClick={()=>navigate("/userdashboard")}>GoBack</button>):(<button type="button" className="back-button" onClick={()=>navigate("/")}>GoBack</button>)}
                </div>
            </div>
        </>
    )
}

export default Destination;