import React, {useRef, useContext} from 'react'
import { NewsContext } from '../../Context/newscontext';
import { DeleteProfileAPI } from '../../Api'
import { Link } from 'react-router-dom';
import { ref, deleteObject } from "firebase/storage";
import { storage } from '../Authentication/FireBase';
export default function DeleteProfile({DeleteProfile_Modal}) {
  const {setIsLogin, setProfileurl, country, profileurl} = useContext(NewsContext);
    const errmsg= useRef("")
    const toTheHome= useRef("")
    const deleteaccount=async()=>{
      try{
        if(profileurl!==""){
          const storageRef = ref(storage, localStorage.getItem("id"));
          await deleteObject(storageRef);
        }
        const Data= await fetch(`${DeleteProfileAPI}/${localStorage.getItem("id")}`,{
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                "Token": localStorage.getItem("Token"),
              },
        })
        const json_data = await Data.json();
        if(Data.status===200){
          localStorage.removeItem("Token")
         setIsLogin(false)
         localStorage.removeItem("id")
         localStorage.removeItem("profilePhoto")
         setProfileurl("")
         alert("Profile Deleted")
         toTheHome.current.click()
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
       
    }
  return (
    
    <div className='w-3/4 box-border h-[90vh] hidden overflow-y-auto p-4 justify-start text-[#010326]' ref={DeleteProfile_Modal}>
   
        <button
          onClick={deleteaccount}
          className="bg-[#FF4C4C] text-[#F1F1F1] h-[8%] w-[20%] rounded-3xl mt-5"
        >
          Delete
        </button>
        <Link ref={toTheHome} to={`/News/${country}`} state={{Country:country, Category:'none'}}></Link>
        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
    </div>
  )
}
