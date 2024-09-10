import React, { useEffect, useState , useRef} from 'react'
import { UserInfoAPI } from '../../Api';
import {UpdateProfileAPI } from '../../Api';
export default function EditProfilePersonal({personalInfo_Modal}) {
    const errmsg= useRef("")
    let [userData, setUserData]=useState({
        name:"",
        DOB:"",
        email:"",
        Gender:""
    });
    const UserInfo =async()=>{
      try{
         const data=await fetch(`${UserInfoAPI}/${localStorage.getItem("id")}`,
            {
                method: 'GET',
                headers: {
               "Content-Type": "application/json",
               "Token": localStorage.getItem("Token"),
             },
            }
         )
         const UserData =await data.json()
         setUserData(UserData)
         console.log(UserData)
      }catch(err){
        console.log(err)
      }

    }
    const OnChangeInp=(e)=>{
        setUserData({
            ...userData,
            [e.target.name]: e.target.value,
        })

    }
    const SubmitCredential=async()=>{
        if (userData.name === "") {
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "Please Provide a User Name";
            setTimeout(() => {
              errmsg.current.style.display = "none";
              errmsg.current.innerText = "";
            }, 3000);
            return;
          }
          if (userData.email.length<11 ||
            userData.email.substring(userData.email.length - 10) !==
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
          if (userData.Gender === "") {
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "Please Confirm your Gender";
            setTimeout(() => {
              errmsg.current.style.display = "none";
              errmsg.current.innerText = "";
            }, 3000);
            return;
          }
          if (userData.DOB === "") {
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "Please Provide your Date of Birth";
            setTimeout(() => {
              errmsg.current.style.display = "none";
              errmsg.current.innerText = "";
            }, 3000);
            return;
          }
          try {
            const data = await fetch(`${UpdateProfileAPI}/${localStorage.getItem("id")}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Token": localStorage.getItem("Token"),
              },
             body : JSON.stringify(userData)
            });
            const json_data = await data.json();
           
            if(data.status===200){
              alert("Profile Info Updated")
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
    }
    useEffect(()=>{
      UserInfo()
    },[])
  return (
    <div className='w-3/4 box-border h-[90vh] hidden flex-col overflow-y-auto p-4 items-center text-[#010326]' ref={personalInfo_Modal}>
    <label className="w-3/4 mt-4"> Name</label>
        <input
          className="w-4/5 mt-1 h-[6vh] rounded-3xl pl-4 box-border border-2 border-[#010326]"
          type="text"
          value={userData.name}
          name="name"
          onChange={OnChangeInp}
        ></input>
        <label className="w-3/4 mt-4">Email</label>
        <input
          className="w-4/5 mt-1 h-[6vh] rounded-3xl pl-4 box-border border-2 border-[#010326]"
          type="text"
          value={userData.email}
          name="email"
          onChange={OnChangeInp}
        ></input>
        
        <label className="w-3/4 mt-4 ">Gender</label>
        <div className="w-4/5 h-[6vh] mt-1 rounded-3xl pl-4 box-border flex justify-around items-center">
          
          <input
            name="Gender"
            type="radio"
            value="Male"
            checked={userData.Gender === "Male"}
            onChange={OnChangeInp}
          ></input>
          <label className="">Male</label>
          <input
            name="Gender"
            type="radio"
            value="Female"
            checked={userData.Gender === "Female"}
            onChange={OnChangeInp}
          ></input>
          <label className="">Female</label>
          
          <input
            name="Gender"
            type="radio"
            value="Other"
            checked={userData.Gender === "Other"}
            onChange={OnChangeInp}
          ></input>
          <label className="">Other</label>
        </div>
        <label className="w-3/4 mt-4 ">Date of Birth</label>
        <input
          className="w-4/5 h-[6vh] mt-1 rounded-3xl px-4 box-border border-2 border-[#010326]"
          type="date"
          value={userData.DOB.split('T')[0]}
          name="DOB"
          onChange={OnChangeInp}
        ></input>
        
        <button
          onClick={SubmitCredential}
          className="bg-yellow-400 text-[#010326] h-[8%] w-[35%] rounded-3xl mt-5"
        >
          Update
        </button>
       
        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
    </div>
  )
}
