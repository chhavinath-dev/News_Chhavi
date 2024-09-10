import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { NewsContext } from "../../Context/newscontext";
import {followAPI, unFollowAPI} from '../../Api'
import profile_blank from "../../profile_blank.png";

import YourNews from "./YourNews";
export default function ProfilePage() {
  const { newsArr, getProfile, profileInfo, setProfileInfo } = useContext(NewsContext);
  const location = useLocation();
  const sta = location.state;
  console.log(sta);
  const unfollowtheUser=async(userid)=>{
    if(!localStorage.getItem("id")){
      alert("Please Login First");
      return;
     }
    try{
      const data= await fetch(unFollowAPI,{
        method:"PUT",
        headers: {
                  "Content-Type": "application/json",
                  "Token": localStorage.getItem("Token"),
                },
         body:JSON.stringify({userid, id: localStorage.getItem("id")})       
      })
      const updateUserInfo= await data.json()
    
      setProfileInfo({
        ...profileInfo,
        followers: [...updateUserInfo.followers],
       })
     }catch(err){
        console.log(err)
     }
  }
  const followtheUser=async(userid)=>{
    if(!localStorage.getItem("id")){
      alert("Please Login First");
      return;
     }
     try{
      const data= await fetch(followAPI,{
        method:"PUT",
        headers: {
                  "Content-Type": "application/json",
                  "Token": localStorage.getItem("Token"),
                },
         body:JSON.stringify({userid, id: localStorage.getItem("id")})       
      })
      const updateUserInfo= await data.json()
      setProfileInfo({
          ...profileInfo,
        followers: [...updateUserInfo.followers],
       })
     }catch(err){
        console.log(err)
     }
  }
  useEffect(() => {
    getProfile(sta.id);
  }, [sta.id]);

  return (
    <div className="h-11/12 w-full bg-cover flex flex-col items-center overflow-y-auto box-border py-4">
      <div className="w-2/3 h-1/2 bg-[#010326] border border-[#021E73] flex box-border rounded-t-lg text-white flex-shrink-0">
        <div className="w-1/5 h-full flex items-center mx-6">
          <img
            src={
              profileInfo.profilePhoto !== ""
                ? profileInfo.profilePhoto
                : profile_blank
            }
            className="w-full aspect-square rounded-full"
            alt=""
          />
        </div>
        <div className="h-full w-4/5  flex items-center">
          <div className="w-full h-4/5 justify-around flex flex-col">
            <div className="w-full h-1/5 items-center box-border flex pl-20 flex-shrink-0">
              <span className=" text-5xl">{profileInfo.name}</span>
             {profileInfo.userid!==localStorage.getItem("id") && (profileInfo.followers.includes(localStorage.getItem("id"))? <button className='ml-5 bg-[#00FFFF] text-[#000000] p-2 rounded-md' onClick={()=>unfollowtheUser(profileInfo.userid)}>following</button>: <button className='ml-5 bg-[#F1F1F1] text-[#000000] p-2 rounded-md' onClick={()=>followtheUser(profileInfo.userid)}>follow</button>)}
            </div>
            <div className="w-full flex-shrink-0 flex justify-around">
              <button className="text-center">
                <h1>{newsArr.length}</h1>
                <p>news</p>
              </button>
              <button className="text-center">
                <Link to="/Profile/AllUser" state={{type:"followers", list:profileInfo.followers}}>
                  <h1>{profileInfo.followers.length}</h1>
                  <p>followers</p>
                </Link>
              </button>
              <button className="text-center">
                <Link to="/Profile/AllUser" state={{type:"following", list:profileInfo.following}}>
                  <h1>{profileInfo.following.length}</h1>
                  <p>following</p>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-2/3 bg-white flex-shrink-0"></div>
      {newsArr.map((data, index) => {
        return (
          <YourNews
            key={index}
            index={index}
            data={data}
            len={newsArr.length}
          />
        );
      })}
    </div>
  );
}
