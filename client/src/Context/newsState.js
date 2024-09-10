import { NewsContext } from "./newscontext";
import {GetProfile, FetchAllNews, PostNewsAPI, ForYouAPI, LikePostAPI, DisLikePostAPI, deleteNewsAPI, UpdateNewsAPI} from '../Api'
import React, { useState } from 'react'
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../component/Authentication/FireBase";

export default function NewsState({children}) {
   const [totalNews, setTotalNews]=useState(0)
    const [country,setCountry]=useState(localStorage.getItem("country")? localStorage.getItem("country"):"Select Country" );
    const [newsTag, setNewsTag]= useState("")
    const [isLogin, setIsLogin]= useState(localStorage.getItem("Token")? true: false)
    const [newsArr, setNewsArr]= useState([])
    const [profileurl, setProfileurl]= useState(localStorage.getItem("profilePhoto")||"")
    const [profileInfo, setProfileInfo]=useState({
      following:[],
      followers:[],
      profilePhoto:"",
      name:"",
      userid:""
    })

    const getProfile= async (id)=>{
       console.log("making requo")
       try {
           const Profile= await fetch(GetProfile+"/"+id, {
            method: 'GET',
            headers: {
                  "Content-Type": "application/json",
                  "Token": localStorage.getItem("Token"),
                },
             
           })
           const profileData= await Profile.json()
           setProfileInfo({
            following: [...profileData.following],
            followers: [...profileData.followers],
            profilePhoto:profileData.profilePhoto,
            name: profileData.name,
            userid: profileData.userid
           })
           setNewsArr(profileData.news)
           console.log("my nws",profileData.news)
       }catch(err){
           console.log(err)
       }  
    }
    const FetchNews= async(Country, Category, pageNumber)=>{
      
       const url=FetchAllNews+"/"+Country+"/"+Category+"/"+pageNumber
      try {
        const Profile= await fetch(url, {
         method: 'GET',
         headers: {
               "Content-Type": "application/json",
               "Token": localStorage.getItem("Token"),
             },
          
        })
        const NewsData= await Profile.json()
        console.log("NewsData",NewsData)
        setTotalNews(NewsData.totalNews)
       if(pageNumber!==0) setNewsArr(newsArr.concat(NewsData.news))
        else setNewsArr(NewsData.news)
       
    }catch(err){
        console.log(err)
    }  
    }
    const fetchfollowingNews=async(id)=>{
      if(!id) {
        setNewsArr([])
        return;
      }
      
      try {
        const followingNews= await fetch(`${ForYouAPI}/${id}`, {
         method: 'GET',
         headers: {
               "Content-Type": "application/json",
               "Token": localStorage.getItem("Token"),
             },
        })
        const NewsData= await followingNews.json()
        console.log("NewsData",NewsData)
        setNewsArr(NewsData)
        
       
    }catch(err){
        console.log(err)
    }  

    }
    const LikeThePost= async(userid, postId)=>{
      try{
        const data= await fetch(LikePostAPI,{
          method:"PUT",
          headers: {
                    "Content-Type": "application/json",
                    "Token": localStorage.getItem("Token"),
                  },
           body:JSON.stringify({userid, postId})       
        })
        const LikedPost= await data.json()
      
        const newNews=[...newsArr]
        for(let i=0; i<newNews.length; i++){
           if(newNews[i]._id===postId){
            newNews[i].likes=[...LikedPost.likes]
           }
        }
        setNewsArr(newNews)
       }catch(err){
         console.log(err)
       }
    }
    const DeleteThePost= async(userid, postid, fireBaseImgRef)=>{
      try{
        if(fireBaseImgRef.length){
          const storageRef = ref(storage, fireBaseImgRef[1]);
          await deleteObject(storageRef);
        }
        const data= await fetch(`${deleteNewsAPI}/${userid}`,{
          method:"DELETE",
          headers: {
                    "Content-Type": "application/json",
                    "Token": localStorage.getItem("Token"),
                  },
           body:JSON.stringify({postid})       
        })
        let newNews= newsArr.filter((news) => {
          return news._id !== postid;
        });
        setNewsArr(newNews)
       }catch(err){
         console.log(err)
       }
    }
    const DisLikeThePost= async(userid, postId)=>{
      try{
        const data= await fetch(DisLikePostAPI,{
          method:"PUT",
          headers: {
                    "Content-Type": "application/json",
                    "Token": localStorage.getItem("Token"),
                  },
           body:JSON.stringify({userid, postId})       
        })
        const DislikedPost= await data.json()
        const newNews=[...newsArr]
        for(let i=0; i<newNews.length; i++){
           if(newNews[i]._id===postId){
            newNews[i].likes=[...DislikedPost.likes]
           }
        }
        setNewsArr(newNews)
       }catch(err){
         console.log(err)
       }
    }
    const UpdateNews= async(newsData, postid)=>{
      const userid=localStorage.getItem("id")
      
      try {
        const data= await fetch(`${UpdateNewsAPI}/${userid}`, {
        method: 'PUT',
        headers: {
              "Content-Type": "application/json",
              "Token": localStorage.getItem("Token"),
            },
          body:JSON.stringify({newsData, postid})
        })
        
        const UpdatedNews= await data.json()
        const newNews=[...newsArr]
        for(let i=0; i<newNews.length; i++){
           if(newNews[i]._id===postid){
            newNews[i]=UpdatedNews
           }
        }
        setNewsArr(newNews)
        if(data.status===200){
          alert('News Updated Successfully')
        }
        
      
    }catch(err){
        console.log("err",err.message)
    }
    }
    const PostNews=async(newsData)=>{
     const userid=localStorage.getItem("id")
          try {
            const newNews= await fetch(`${PostNewsAPI}/${userid}`, {
            method: 'POST',
            headers: {
                  "Content-Type": "application/json",
                  "Token": localStorage.getItem("Token"),
                },
              body:JSON.stringify(newsData)
            })
            
            if(newNews.status===200){
              alert('News Posted Successfully')
            }
          
        }catch(err){
            console.log(err)
        }  

    }

  return (
    <div>
       <NewsContext.Provider
      value={{
      country,
      setCountry,
      newsTag,
      setNewsTag,
      totalNews,
      isLogin,
      setIsLogin,
      profileurl,
      setProfileurl,
      newsArr,
      setNewsArr,
      getProfile,
      profileInfo,
      setProfileInfo,
      FetchNews,
      PostNews,
      fetchfollowingNews,
      LikeThePost,
      DisLikeThePost,
      DeleteThePost,
      UpdateNews
      }}
    >
      {children}
    </NewsContext.Provider>
    </div>
  )
}
