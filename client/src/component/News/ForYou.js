import React, { useState ,useEffect,useContext} from 'react'
import { NewsContext } from "../../Context/newscontext"
import NewsItemhorizontally from './NewsItemhorizontally';
export default function ForYou() {
  const { newsArr, fetchfollowingNews}= useContext(NewsContext);
    
   useEffect(()=>{
     fetchfollowingNews(localStorage.getItem("id"))
   },[])
  return (
 <div className="h-11/12 w-full bg-cover flex flex-col items-center overflow-y-auto box-border py-5 ">
   {
    newsArr.map((data,index)=>{
        return <NewsItemhorizontally key={index} index={index} len={newsArr.length} data={data} />
    })
   }
  
 </div>
  )
}
