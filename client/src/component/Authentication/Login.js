import React, { useState, useContext , useRef} from "react";
import img from "../../home_background_2.jpg";
import { NewsContext } from "../../Context/newscontext";
import {loginAPI} from "../../Api"
import {Link, Navigate} from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
export default function Login() {
  const { country , isLogin,setIsLogin, setProfileurl} = useContext(NewsContext);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const errmsg= useRef("")
  const OnChangeInp = (e) => {
    console.log(e.target.value);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const SubmitCredential=async()=>{
     console.log(credentials.email.substring(credentials.email.length-10))
     if(credentials.email.length<11 || credentials.email.substring(credentials.email.length-10)!=="@gmail.com" ){
      errmsg.current.style.display="flex"
      errmsg.current.innerText= "Please Provide a Valid Email";
      setTimeout(()=>{
        errmsg.current.style.display="none"
        errmsg.current.innerText= ""
      }, 3000)
      return
     }
     try{
      const data= await fetch(loginAPI, {
        method:'POST',
        headers: {
          "Content-Type": "application/json",
        },
       body : JSON.stringify(credentials)

      });
      const json_data= await data.json();
      
      if(data.status===200){
        localStorage.setItem("id",json_data.data._id,)
        localStorage.setItem("profilePhoto", json_data.data.profilePhoto)
        setProfileurl(json_data.data.profilePhoto)
        localStorage.setItem("Token", json_data.Token)
        setIsLogin(true)

        return;
      }
      console.log(json_data.errors)
      errmsg.current.style.display="flex"
      errmsg.current.innerText= json_data.errors
      setTimeout(()=>{
        errmsg.current.style.display="none"
        errmsg.current.innerText= ""
      }, 3000)
      
     }catch(err){
      errmsg.current.style.display="flex"
      errmsg.current.innerText= "Unable to reach server"
      setTimeout(()=>{
        errmsg.current.style.display="none"
        errmsg.current.innerText= ""
      }, 3000)
     }
     console.log(credentials)
  }
  return (
    <div
      className="h-11/12 w-full bg-cover flex justify-center items-center overflow-y-auto"
    
    >
      <div className="w-1/5 h-max rounded-xl border-2 bg-[#F1F1F1] border-[#021E73] flex flex-col items-center pb-3 text-base">
      <div className="w-full border-b border-[#021E73] text-lg py-2 px-2 mb-2 font-bold">Login to News</div>
       <label className="w-3/4 ">Email</label>
        <input
          className="w-4/5 mt-1 rounded-3xl pl-4 border border-black"
          type="email"
          value={credentials.email}
          name="email"
          onChange={OnChangeInp}
        ></input>
        <label className="w-3/4 mt-3">Password</label>
        <input
          className="w-4/5 mt-1 rounded-3xl pl-4 border border-black"
          type="password"
          value={credentials.password}
          name="password"
          onChange={OnChangeInp}
        ></input>
        {isLogin && <Navigate to={`/News/${country}`} state={{Country:country, Category:'none'}}/>}
        <button onClick={SubmitCredential} className='bg-[#010326] text-yellow-50 w-[35%] rounded-md mt-4'>Login</button>
        <p className="mt-3 text-red-600 text-sm italic hidden" ref={errmsg}>  </p>
        <button className="w-full mt-3 text-base"><Link className="justify-center flex items-center" to='/auth/signup'> Don't have account? Sign Up <FaArrowRightLong className="ml-1"/> </Link></button>
      </div>
    </div>
  );
}
