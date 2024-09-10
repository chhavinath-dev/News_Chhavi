import React, {useRef, useState, useContext} from 'react'
import profile_blank from '../profile_blank.png'
import { NewsContext } from '../Context/newscontext';
import { Link } from 'react-router-dom';


export default function ProfileLogo() {
  const {setIsLogin, profileurl, setProfileurl} = useContext(NewsContext);
  const showinMore= useRef("");

 const naviagteTOprofile=()=>{
  showinMore.current.style.display= (showinMore.current.style.display==="flex")?"none":"flex" ;
 }
 
 
  return (
    <div className='h-full w-1/4 flex items-center justify-around'>
      
     <img src ={profileurl!==""? profileurl : profile_blank} className='aspect-square h-3/4 rounded-full' alt='' onClick={naviagteTOprofile}/> 
     <div ref={showinMore} className={`fixed flex-col hidden justify-start shadow-2xl p-2 top-14 right-0 box-border rounded-md bg-[#021E73] text-yellow-50`}> 
       <button onClick={naviagteTOprofile}>
       <Link to= {'/Profile/User'} state={{id: localStorage.getItem("id")}}>
       My Profile
       </Link>
       </button>
       <hr ></hr>
       <button onClick={naviagteTOprofile}>
       <Link to= {'/User/EditProfile'}>
        Edit Profile
       </Link>
       </button>
       <hr></hr>
       <button onClick={()=>{
         localStorage.removeItem("Token")
         setIsLogin(false)
         localStorage.removeItem("id")
         localStorage.removeItem("profilePhoto")
         setProfileurl("")
       }}>
        Log Out
       </button>
       </div>
    </div>
  )
}
