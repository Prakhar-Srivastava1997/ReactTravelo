import { useEffect, useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { dataRef } from '../firebase';

const Login = ()=>{
    const navigate = useNavigate();
    const [inputObj, setInputObj] = useState({
        username:"",
        password:""
    })

    const [inputErrObj, setinputErrObj] = useState({
        usernameErr:"",
        passwordErr:""
    })

    const [isNotValid, setIsNotValid] = useState(true);

    const [userArray, setUserArray] = useState([]);

    const handleChange = (e)=>{
        let name = e.target.name;
        let val = e.target.value;

        if(name === "username"){
            let nameval = document.getElementById('username').value;
            if(nameval.length === 0){
                setinputErrObj({...inputErrObj, usernameErr:"Kindly fill this field"})
            }else{
                setinputErrObj({...inputErrObj, usernameErr:""});
                setIsNotValid(false);
            }
        }else if(name === "password"){
            let passwordval = document.getElementById('password').value;
            if(passwordval.length ===0){
                setinputErrObj({...inputErrObj, passwordErr:"Kindly fill this field"})
            }else{
                setinputErrObj({...inputErrObj, passwordErr:""});
                setIsNotValid(false);
            }
        }

        setInputObj({...inputObj, [name]:val});
    }

    const getUserData = async()=>{

        dataRef.ref().child("travelouserdatabase").on('value', data=>{
            const getData = Object.values(data.val());
            setUserArray(getData);
        })
    }

useEffect(()=>{
    getUserData();
}, [])

const handleSubmit = (e)=>{
    e.preventDefault();

    console.log("User Input : ", inputObj);
    console.log("Backend data : ", userArray);

    const currentUser = userArray.find((item)=>{
        return item.username === inputObj.username && item.password === inputObj.password
    })

    if(currentUser){
        localStorage.setItem("LoggedinUser", JSON.stringify(inputObj));
        alert("Congratulations!! Login successfull");
        navigate("/userdashboard");

    }else{
        alert("Oops!! Invalid credentials");
        setInputObj({
            username:"",
            password:""
        })
    }

}

useEffect(()=>{
    if(localStorage.getItem("LoggedinUser")){
        navigate("/userdashboard")
    }
    else{
        navigate("/login");
    }
}, [])
    return(
        <div className="login-container">
            <div className="login-form">
                <div className="login-text">
                    <h1>Welcome to Travelo!!</h1>
                    <p>Kindly provide your crendentials to start your exciting journey.</p>
                </div>
                <div className="form-body">
                    <form onSubmit={handleSubmit}>
                        <label for="username">UserName : </label>
                        <input type="text" placeholder="Enter UserName" id="username" name="username"
                        value = {inputObj.username} onChange={handleChange} autoComplete='off'/>
                        <span className='err-msg'>{inputErrObj.usernameErr}</span>
                        <label for = "password">Password : </label>
                        <input type="password" placeholder="Enter Password" id="password" name="password"
                        value = {inputObj.password} onChange={handleChange}/>
                        <span className='err-msg'>{inputErrObj.passwordErr}</span>
                        <button type="submit" className='signin-btn' disabled={isNotValid}>Sign-In Now</button>
                        <p>Don't have an account? <Link to="/signup" className='sign-up'>Sign-Up</Link></p>
                    </form>
                </div>
                <div className='back-btn'>
                    <button type='button' onClick={()=>navigate("/")}>GoBack</button>
                </div>
            </div>
            <video autoPlay loop muted id="hillstation">
                <source src="/Images/HillStation.mp4" type="video/mp4"></source>
            </video>
        </div>
    )
}

export default Login;