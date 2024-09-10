import React, {useEffect, useState} from 'react'
import { ConnectionInfoAPI } from '../../Api'
import profile_blank from '../../profile_blank.png'
import { Link } from 'react-router-dom';
export default function UserCard({userid}) {
    let [userData, setUserData]=useState({
        name:"",
        profilePhoto:""
    });
    const UserInfo =async()=>{
      try{
         const data=await fetch(`${ConnectionInfoAPI}/${userid}`,
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
    useState(()=>{
      UserInfo()
    },[])
  return (
    <div className='w-full rounded-3xl h-[15vh] items-center flex bg-[#021859] my-2 box-border px-5'>
      <div className='h-2/3 w-1/5'>
        <img 
        src={
            userData.profilePhoto !== ""
                ? userData.profilePhoto
                : profile_blank
            }
            className="h-full aspect-square rounded-full"
            alt=""

        ></img>
      </div>
      <Link to= {'/Profile/User'} state={{id: userid}}>
      <button className='w-4/5 h-full flex items-center'>
        <h1 className='text-5xl text-yellow-50 h-1/2'>{userData.name}</h1>
      </button>
      </Link>
    </div>
  )
}
