import { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AOS from 'aos';
import "aos/dist/aos.css";

const Home = (props)=>{
    const navigate = useNavigate();
    const [dataArry, setDataArray] = useState([]);
    const [searchData, setSearchData] = useState({
        destinationName:"",
        date_of_travel:"",
        range:""
    })

    const [dateError, setDateError] = useState("");
    const loginBtnClicked = ()=>{
        navigate("/login")
    }
    

    const getDestinations = async()=>{
        const data = await axios.get("https://travelo-data.onrender.com/destinations").catch((err)=>{
            alert(err.message);
        })
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
        setSearchData({...searchData, [name]:val});

    }

    const submitForm =(e)=>{
        let arr = ["Andaman & Nicobar", "Punjab", "Rajasthan", "Kerala",
                        "Maharashtra", "Uttarakhand", "Himachal Pradesh", "Gujarat"];
            
            let destination_data = arr.find((item)=>{
                return item === searchData.destinationName
            }) 

            if(!destination_data){
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
                localStorage.setItem("SearchedDestinationObj", JSON.stringify(searchData));
                navigate('/destination');
            }

    } 

    return (
        <div className="home-container">
            <nav className="nav-bar">
                <div className="logo-section">
                    <img src="/Images/Traveloicon.jpg" alt="logo"/>
                    <h1>Travelo</h1>
                </div>
                <div className='login-section'>
                    <button type='button' className='login-button' onClick={loginBtnClicked}>Sign-In</button>
                </div>
            </nav>
            <section className='search-destination'>
                <h1>Search Your Holiday....</h1>
                <div className='search-section'>
                    <div className='input-fields'>
                        <div className='destination-div'>
                            <div className='destination-input-sec'>
                                <input type='text' placeholder='Enter Destination' id="destinationName" name="destinationName"value={searchData.destinationName} onChange={handleInpChange} autoComplete='off'/><span className='location-icon'><i className="fa fa-map-marker" style={{'font-size':'20px'}}></i></span>
                            </div>
                            <div className='drop-down'>
                                {dataArry.filter((item)=>{
                                    const searchTerm = searchData.destinationName.toLowerCase();
                                    const destName = item.name.toLowerCase();
                                    const destCapName = item.capital.toLowerCase();

                                    return searchTerm && (destName.startsWith(searchTerm) || destCapName.startsWith(searchTerm)) && destName !== searchTerm
                                }).map((item)=>{
                                    return (
                                        <div key={item.id} onClick={()=>setSearchData({...searchData, destinationName:item.name, range:item.price})}>
                                            {item.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <input type='date' placeholder='DD/MM/YYYY' id="date_of_travel" name="date_of_travel" value={searchData.date_of_travel} onChange={handleInpChange}/>
                        <input type='text' placeholder='Package range' id="range" name="range"
                        value={searchData.range} onChange={handleInpChange}/>
                    </div>
                    <button type='button'className='search-btn' onClick={submitForm}>Search Destination</button>
                </div>
                <video autoPlay loop muted>
                    <source src="/Images/wave.mp4" type="video/mp4"/>
                </video>
                
            </section>
            <section className='destinations-container'>
                <h1 data-aos="fade-up">Most Visited Destinations</h1>
                <div className='destinations-array'>
                {dataArry.map((item)=>{
                    return(
                        <div key={item.id} className='card' data-aos="fade-up">
                            <div className='card-body'>
                                <div className='card-image'>
                                    <img src={item.img} alt='image'/>
                                </div>
                                <div className='card-data'>
                                    <h2>{item.name}</h2>
                                    <h3 id="capital"><span><i className="fa fa-map-marker"></i></span>{item.capital}</h3>
                                    <h3>{item.price}</h3>
                                    <button type='button' onClick={()=>btnClicked(item)}>Details</button>
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
export default Home;