import React ,{useRef, useState} from 'react'
import {UpdateProfileAPI } from '../../Api';
export default function EditProfilePassword({Password_Modal}) {
    const errmsg= useRef("")
    const [passwords, setPasswords]=useState({
        Old_Password:"",
        New_Password:"",
        confirm_New_Password:""
    })
    const OnChangePass =(e)=>{
        setPasswords({
            ...passwords,
            [e.target.name]: e.target.value,
        })
    }
    const SubmitNewPassword=async()=>{
        if (passwords.Old_Password === "") {
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "Please Provide Old Password";
            setTimeout(() => {
              errmsg.current.style.display = "none";
              errmsg.current.innerText = "";
            }, 3000);
            return;
          }
          if(passwords.New_Password===""){
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "New Password Can not be empty";
            setTimeout(() => {
              errmsg.current.style.display = "none";
              errmsg.current.innerText = "";
            }, 3000);
            return;
          }
          if (passwords.New_Password !== passwords.confirm_New_Password) {
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "Confirm Password must be same as New Password";
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
             body : JSON.stringify(passwords)
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
  return (
    <div className='w-3/4 box-border h-[90vh] hidden flex-col overflow-y-auto p-4 items-center text-[#010326]' ref={Password_Modal}>
    <label className="w-3/4 mt-4">Old Password</label>
        <input
          className="w-4/5 mt-1 h-[6vh] rounded-3xl pl-4 box-border border-2 border-[#010326]"
          type="password"
          value={passwords.Old_Password}
          name="Old_Password"
          onChange={OnChangePass}
        ></input>

        <label className="w-3/4 mt-4">News Password</label>
        <input
          className="w-4/5 h-[6vh] mt-1 rounded-3xl pl-4 box-border border-2 border-[#010326]"
          type="password"
          value={passwords.New_Password}
          name="New_Password"
          onChange={OnChangePass}
        ></input>
        <label className="w-3/4 mt-4 ">Confirm New Password</label>
        <input
          className="w-4/5 h-[6vh] mt-1 rounded-3xl pl-4 box-border border-2 border-[#010326]"
          type="password"
          value={passwords.confirm_New_Password}
          name="confirm_New_Password"
          onChange={OnChangePass}
        ></input>
        <button
          onClick={SubmitNewPassword}
          className="bg-yellow-400 text-[#010326] h-[8%] w-[35%] rounded-3xl mt-5"
        >
          Change Password
        </button>
       
        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
    </div>
  )
}
