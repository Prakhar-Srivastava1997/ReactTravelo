import { useEffect, useState } from 'react';
import './Userdashboard.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css"

const Userdashboard = (props)=>{

    const navigate = useNavigate();
    const [profileName, setProfileName] = useState("");
    const [dataArry, setDataArray] = useState([]);
    const [serachData, setSearchData] = useState({
        destinationName:"",
        date_of_travel:"",
        range:""
    })

    const [dateError, setDateError] = useState("");

    const logoutBtnClicked = ()=>{
        localStorage.removeItem("LoggedinUser");
        localStorage.clear();
        navigate("/login")
    }
    

    const getDestinations = async()=>{
        const data = await axios.get("https://travelo-data.onrender.com/destinations").catch((err)=>{
            alert(err.message);
        })
        console.log(data.data);
        setDataArray(data.data);
    }

    const btnClicked = (obj)=>{
        props.showpage();
        localStorage.setItem("SelectedDestination", JSON.stringify(obj));
    }

    useEffect(()=>{
        getDestinations();
        AOS.init({
            offset:200,
            duration:2000
        })
        if(localStorage.getItem("LoggedinUser")){
            let userdata = JSON.parse(localStorage.getItem("LoggedinUser"))
            setProfileName(userdata.username);
        }
        else{
            navigate("/");
        }
    }, [])

    const handleInpChange = (e)=>{
        const name = e.target.name;
        const val = e.target.value;

        if(name === "date_of_travel"){
            const date = new Date();
            const currDate = new Date(date.getFullYear(),date.getMonth(), date.getDate());
            const mydate = new Date(document.getElementById("date_of_travel").value)
        
            if(mydate < currDate){
                setDateError("Enter valid date");
            }
            else{
                setDateError("");
            }
        }
        
        setSearchData({...serachData, [name]:val});

    }

    const submitForm =(e)=>{
        let arr = ["Andaman & Nicobar", "Punjab", "Rajasthan", "Kerala",
                       "Maharashtra", "Uttarakhand", "Himachal Pradesh", "Gujarat"];
            
            let destination_data = arr.filter((item)=>{
                return item === serachData.destinationName
            }) 

            console.log(destination_data);
            if(!destination_data.length>0){
                alert("Invalid destination...kindly choose any one from Most Visited section");
                setSearchData({
                    destinationName:"",
                    date_of_travel:"",
                    range:""
                })
            }else if(dateError.length>0){
                alert("Please choose a valid date");
                setSearchData({
                    destinationName:"",
                    date_of_travel:"",
                    range:""
                })
            }
            else{
                localStorage.setItem("SearchedDestinationObj", JSON.stringify(serachData));
                navigate('/destination');
            }

    } 

    const buyPackage = (data)=>{
        localStorage.setItem("DestinationPrice", JSON.stringify(data.price));
        const new_data = {...data, date:new Date().toLocaleString()}
        localStorage.setItem("BuyDestination", JSON.stringify(new_data));
        navigate("/payment");
    }

    return (
        <div className="userdashboard-container">
            <nav className="user-nav-bar">
                <div className="user-logo-section">
                    <img src="/Images/Traveloicon.jpg" alt="logo"/>
                    <h1>Travelo</h1>
                </div>
                <div className='user-login-section'>
                    <h1>Hi, {profileName}</h1>
                    <button type='button' className='logout-button' onClick={logoutBtnClicked}>LogOut</button>
                </div>
            </nav>
            <section className='user-search-destination'>
                <button type='button' className='orderbtn' onClick={()=>navigate("/orders")}>My Orders</button>
                <h1>Search Your Holiday....</h1>
                <div className='user-search-section'>
                    <div className='user-input-fields'>
                        <div className='user-destination-div'>
                            <div className='user-destination-input-sec'>
                                <input type='text' placeholder='Enter Destination' id="destinationName" name="destinationName"value={serachData.destinationName} onChange={handleInpChange} autoComplete='off'/><span className='user-location-icon'><i className="fa fa-map-marker" style={{'font-size':'20px'}}></i></span>
                            </div>
                            <div className='user-drop-down'>
                                {dataArry.filter((item)=>{
                                    const searchTerm = serachData.destinationName.toLowerCase();
                                    const destName = item.name.toLowerCase();
                                    const destCapName = item.capital.toLowerCase();

                                    return searchTerm && (destName.startsWith(searchTerm) || destCapName.startsWith(searchTerm)) && destName !== searchTerm
                                }).map((item)=>{
                                    return (
                                        <div key={item.id} onClick={()=>setSearchData({...serachData, destinationName:item.name, range:item.price})}>
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <input type='date' placeholder='Check In Date' id="date_of_travel" name="date_of_travel" value={serachData.date_of_travel} onChange={handleInpChange}/>
                        <input type='text' placeholder='Package range' id="range" name="range"
                        value={serachData.range} onChange={handleInpChange} readOnly/>
                    </div>
                    <button type='button'className='user-search-btn' onClick={submitForm}>Search Destination</button>
                </div>
                <video autoPlay loop muted>
                    <source src="/Images/wave.mp4" type="video/mp4"/>
                </video>
                
            </section>
            <section className='user-destinations-container'>
                <h1 data-aos="fade-up">Most Visited Destinations</h1>
                <div className='user-destinations-array'>
                {dataArry.map((item)=>{
                    return(
                        <div key={item.id} className='user-card' data-aos="fade-up">
                            <div className='user-card-body'>
                                <div className='user-card-image'>
                                    <img src={item.img} alt='image'/>
                                </div>
                                <div className='user-card-data'>
                                    <h2>{item.name}</h2>
                                    <h3 id="user-capital"><span><i className="fa fa-map-marker"></i></span>{item.capital}</h3>
                                    <h3>{item.price}</h3>
                                    <div className='user-btn-grp'>
                                        <button type='button' className='detail-btn' onClick={()=>btnClicked(item)}>Details</button>
                                        <button type='button' className='buy-btn' onClick={()=>buyPackage(item)}>Buy Package</button>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
                </div>
            </section>
            <section className='footer-container'>
                <div className='footer-section'>
                    <div className='footer-s1'>
                        <div className='col-1' data-aos="fade-up">
                            <h2>Travelo</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <div className='links'>
                                <i class="fa fa-facebook-f"></i>
                                <i class="fa fa-twitter"></i>
                                <i class="fa fa-instagram"></i>
                            </div>
                        </div>
                        <div className='col-2' data-aos="fade-up">
                            <h2>Our Partners</h2>
                            <a href='https://www.trivago.in/'>Trivago</a>
                            <a href='https://www.makemytrip.com/'>Make My Trip</a>
                            <a href='https://www.easemytrip.com/'>Ease My Trip</a>
                            <a href='https://www.agoda.com/?cid=1844104'>Agoda</a>
                            <a href='https://www.goibibo.com/'>Go Ibibo</a>
                        </div>
                        <div className='col-3' data-aos="fade-up">
                            <h2>Most Visited</h2>
                            <p>London</p>
                            <p>New York</p>
                            <p>Australia</p>
                            <p>Malaysia</p>
                            <p>Singapore</p>
                        </div>
                    </div>
                    <div className='footer-s2'>
                        <p>MOST TRUSTED TRAVELLING WEBSITE</p>
                        <p>COPYRIGHTS RESERVED @ TRAVELO 2023</p>
                    </div>
                </div>
                <video autoPlay loop muted>
                    <source src="/Images/footer-video.mp4" type='video/mp4'/>
                </video>
            </section>
        </div>
    )
    
}

export default Userdashboard;