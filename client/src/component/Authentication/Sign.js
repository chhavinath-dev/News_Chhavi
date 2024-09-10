import React, { useState, useContext, useRef } from "react";
import img from "../../home_background_2.jpg";
import { NewsContext } from "../../Context/newscontext";
import { registerAPI } from "../../Api";
import { Link, Navigate } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

export default function Sign() {
  const { country, isLogin, setIsLogin } = useContext(NewsContext);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    profilePhoto:"",
    Gender: "",
    DOB: "",
  });
  const errmsg = useRef("");
  const OnChangeInp = (e) => {
  
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
   
  };
 
  const SubmitCredential = async () => {
    
    if (credentials.name === "") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Provide a User Name";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (
      credentials.email.length<11 ||
      credentials.email.substring(credentials.email.length - 10) !==
      "@gmail.com"
    ) {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Provide a Valid Email";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (credentials.password === "") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Password can not be empty";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (credentials.password !== credentials.confirm_password) {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Confirm Password must be same as Password";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (credentials.Gender === "") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Confirm your Gender";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (credentials.DOB === "") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Provide your Date of Birth";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    try {
      const data = await fetch(registerAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
       body : JSON.stringify(credentials)
      });
      const json_data = await data.json();
      console.log(json_data)
      if(data.status===200){
        localStorage.setItem("id",json_data.data._id,)
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
      
    } catch (err) {
      errmsg.current.style.display="flex"
      errmsg.current.innerText= "Unable to reach server"
      setTimeout(()=>{
        errmsg.current.style.display="none"
        errmsg.current.innerText= ""
      }, 3000)
    }
    
  };
  return (
    <div
      className="h-11/12 w-full bg-cover flex flex-col items-center overflow-y-auto box-border py-5 "
    >
      <div className="w-1/5 h-max rounded-xl border-2 bg-[#F1F1F1] border-[#021E73] flex flex-col items-center pb-3 text-base">
      <div className="w-full border-b border-[#021E73] text-lg py-2 px-2 mb-2 font-bold">Sign Up to News</div>
        <label className="w-3/4 "> Name</label>
        <input
          className="w-4/5 mt-1 rounded-3xl pl-4 border border-black"
          type="text"
          value={credentials.name}
          name="name"
          onChange={OnChangeInp}
        ></input>
        <label className="w-3/4 mt-3">Email</label>
        <input
          className="w-4/5 mt-1 rounded-3xl pl-4 border border-black"
          type="text"
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

        <label className="w-3/4 mt-3 ">Confirm Password</label>
        <input
          className="w-4/5 mt-1 rounded-3xl pl-4 border border-black"
          type="password"
          value={credentials.confirm_password}
          name="confirm_password"
          onChange={OnChangeInp}
        ></input>
        <label className="w-3/4 mt-3 ">Gender</label>
        <div className="w-4/5 mt-1 rounded-3xl pl-4 box-border flex justify-around items-center flex-col lg:flex-row">
          
          <input
            name="Gender"
            type="radio"
            value="Male"
            checked={credentials.Gender === "Male"}
            onChange={OnChangeInp}
          ></input>
          <label className="">Male</label>
          <input
            name="Gender"
            type="radio"
            value="Female"
            checked={credentials.Gender === "Female"}
            onChange={OnChangeInp}
          ></input>
          <label className="">Female</label>
          
          <input
            name="Gender"
            type="radio"
            value="Other"
            checked={credentials.Gender === "Other"}
            onChange={OnChangeInp}
          ></input>
          <label className="">Other</label>
        </div>
        <label className="w-3/4 mt-3">Date of Birth</label>
        <input
          className="w-4/5 mt-1 rounded-3xl px-4 border border-black"
          type="date"
          value={credentials.DOB}
          name="DOB"
          onChange={OnChangeInp}
        ></input>
        {isLogin && <Navigate to={`/auth/signup/uploadphoto`} />}
        <button
          onClick={SubmitCredential}
          className='bg-[#010326] text-yellow-50  w-[35%] rounded-md mt-4'>Sign Up</button>
       
        <p className="mt-3 text-red-600 text-sm italic hidden" ref={errmsg}>
          {" "}
        </p>
        <button className="w-full mt-3 mb-3">
          <Link
            className=" justify-center flex items-center"
            to="/auth/login"
          >
            {" "}
            Account already exists? log in{" "}
            <FaArrowRightLong className="ml-1" />{" "}
          </Link>
        </button>
      </div>
    </div>
  );
}
