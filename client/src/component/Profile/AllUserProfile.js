import React, {useState, useContext, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { NewsContext } from "../../Context/newscontext";
import UserCard from './UserCard';

export default function AllUserProfile() {
    const location= useLocation()
    const data= location.state
    console.log(data)
  return (
    <div className="h-11/12 w-full bg-cover flex flex-col items-center overflow-y-auto box-border py-5 ">
    <div className='w-3/5 flex-shrink-0 flex flex-col'>
    <h1 className='text-4xl'>{data.type}</h1>
    <div className='w-full h-px bg-black'></div>
    {data.list.map((userid)=>{
      return <UserCard key={userid} userid={userid}/>
    })}
    </div>
      
    </div>
  )
}
