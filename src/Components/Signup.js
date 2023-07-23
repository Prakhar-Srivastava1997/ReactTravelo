import { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { dataRef } from '../firebase';


const Signup = ()=>{
    const navigate = useNavigate();
    const [usersArray, setUsersArray] = useState([]);
    const [inputObj, setInputObj ] = useState({
        username:'',
        email:'',
        contact:'',
        password:''
    })

    const [inputErrObj, setinputErrObj] = useState({
        usernameErr:"",
        emailErr:"",
        contactErr:"",
        passwordErr:""
    })

    const [isNotValid, setIsNotValid] = useState(true);

    const addUser = async(userobj)=>{

        //pushing data into firebase database (travelouserdatabase) 
        dataRef.ref().child("travelouserdatabase").push(userobj);
    }

    const handleChange = (event)=>{
       let name = event.target.name;
       let val = event.target.value;

       if(name === "username"){
            let fieldval = document.getElementById('username').value;

            const uname = usersArray.find((item)=>{
                return item.username === fieldval
            })

            if(uname){
                setinputErrObj({...inputErrObj, usernameErr:"Username already taken"})
            }
            else if(fieldval.length < 3){
                setinputErrObj({...inputErrObj, usernameErr:"Minimum length is 3"})
            }else if(fieldval.length > 20){
                setinputErrObj({...inputErrObj, usernameErr:"Maximum length is 20"})
            }else if(fieldval.length == 0){
                setinputErrObj({...inputErrObj, usernameErr:"Mandatory Field"})
            }else{
                setinputErrObj({...inputErrObj, usernameErr:""});
                setIsNotValid(false);
            }
       }else if(name === "email"){
        let fieldval = document.getElementById('email').value;
        let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            if(fieldval.length < 5){
                setinputErrObj({...inputErrObj, emailErr:"Minimum length is 5"})
            }else if(fieldval.length > 20){
                setinputErrObj({...inputErrObj, emailErr:"Maximum length is 20"})
            }else if(fieldval.length == 0){
                setinputErrObj({...inputErrObj, emailErr:"Mandatory Field"})
            }else if(!validRegex.test(fieldval)){
                setinputErrObj({...inputErrObj, emailErr:"Enter valid email id"})
            }else{
                setinputErrObj({...inputErrObj, emailErr:""});
                setIsNotValid(false);
    
        }
    }else if(name === "contact"){
        let fieldval = document.getElementById('contact').value;
            if(fieldval.length < 10){
                setinputErrObj({...inputErrObj, contactErr:"Minimum length is 10"})
            }else if(fieldval.length > 10){
                setinputErrObj({...inputErrObj, contactErr:"Maximum length is 10"})
            }else if(fieldval.length == 0){
                setinputErrObj({...inputErrObj, contactErr:"Mandatory Field"})
            }else if(!/^[1-9]{1}[0-9]{9}$/.test(fieldval)){
                setinputErrObj({...inputErrObj, contactErr:"Enter valid contact number"})
            }else{
                setinputErrObj({...inputErrObj, contactErr:""});
                setIsNotValid(false);
    
            }
        
   }else if(name === "password"){
    let fieldval = document.getElementById('password').value;
    if(fieldval.length < 5){
        setinputErrObj({...inputErrObj, passwordErr:"Minimum length is 5"})
    }else if(fieldval.length > 15){
        setinputErrObj({...inputErrObj, passwordErr:"Maximum length is 15"})
    }else if(fieldval.length == 0){
        setinputErrObj({...inputErrObj, passwordErr:"Mandatory Field"})
    }else{
        setinputErrObj({...inputErrObj, passwordErr:""});
        setIsNotValid(false);
    }

}
setInputObj({...inputObj, [name]:val})
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(inputErrObj.usernameErr.length ===0 && inputErrObj.emailErr.length ===0 && inputErrObj.contactErr.length ===0 && inputErrObj.passwordErr.length ===0){
            addUser(inputObj);
            localStorage.setItem("LoggedinUser", JSON.stringify(inputObj));
            setIsNotValid(false);
            setInputObj({
                username:"",
                email:"",
                contact:"",
                password:""
            })
            alert("User registered successfully...");
            
            navigate("/userdashboard");
        }else{
            setIsNotValid(true)
        }
    }

    const getAllUsers = async()=>{

        dataRef.ref().child("travelouserdatabase").on('value', data=>{
            const getData = Object.values(data.val());
            setUsersArray(getData);
        })
    }
    useEffect(()=>{
        getAllUsers();
    }, [])

    console.log("Users Array : ", usersArray)
    return (
        <div className="login-container">
            <div className="login-form">
                <div className='signup-back-btn'>
                    <button type='button' onClick={()=>navigate("/")}>GoBack</button>
                </div><br/>
                <div className="login-text">
                    <h1>Registration Form</h1>
                    <p>Kindly provide your crendentials to create your account in Travelo.</p>
                </div>
                <div className="form-body">
                    <form onSubmit={handleSubmit}>
                        <label for="username">UserName : </label>
                        <input type="text" placeholder="Enter UserName" required name='username' id='username' onChange={handleChange} value={inputObj.username} autoComplete='off'/>
                        <span className='err-msg'>{inputErrObj.usernameErr}</span>
                        <label for="email">Email Id : </label>
                        <input type="email" placeholder="Enter Email" required name='email' id='email' onChange={handleChange} value={inputObj.email} autoComplete='off'/>
                        <span className='err-msg'>{inputErrObj.emailErr}</span>
                        <label for="contact">Contact # : </label>
                        <input type="text" placeholder="Enter Contact Number" required name='contact' id='contact' onChange={handleChange} value={inputObj.contact} autoComplete='off'/>
                        <span className='err-msg'>{inputErrObj.contactErr}</span>
                        <label for = "password">Password : </label>
                        <input type="password" placeholder="Enter Password" required name='password' id='password' onChange={handleChange} value={inputObj.password} autoComplete='off'/>
                        <span className='err-msg'>{inputErrObj.passwordErr}</span>
                        <button type="submit" className='signup-btn' disabled={isNotValid}>Sign-Up Now</button>
                    </form>
                </div>
                
            </div>
            <video autoPlay loop muted id="hillstation">
                <source src="/Images/HillStation.mp4" type="video/mp4"></source>
            </video>
        </div>
    )
}

export default Signup;