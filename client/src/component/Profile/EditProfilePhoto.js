import React, {useRef, useState, useContext} from 'react'
import { NewsContext } from "../../Context/newscontext";
import { storage } from '../Authentication/FireBase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {UpdateProfileAPI } from '../../Api';
export default function EditProfilePhoto({profilePhoto_Modal}) {
    const { setProfileurl} = useContext(NewsContext);
    const errmsg= useRef("")
    const [profileImg, setProfileImg] = useState();
    const OnChangeFile = (e) => {
        setProfileImg(e.target.files?.item(0));
      };
    const onUpdatePhoto =async()=>{
        if (!profileImg) {
            errmsg.current.style.display = "flex";
            errmsg.current.innerText = "Please upload a photo";
            setTimeout(() => {
              errmsg.current.style.display = "none";
              errmsg.current.innerText = "";
            }, 3000);
            return;
          }
          try{
                    const storageRef = ref(storage, localStorage.getItem("id"));
                    
                    const metadata = {
                        contentType: profileImg.type,
                    };
                    const snapshot = await uploadBytes(storageRef, profileImg, metadata);
                    const downloadURL = await getDownloadURL(snapshot.ref);
                    const data = await fetch(`${UpdateProfileAPI}/${localStorage.getItem("id")}`, {
                        method: "PUT",
                        headers: {
                          "Content-Type": "application/json",
                          "Token": localStorage.getItem("Token"),
                        },
                        body: JSON.stringify({
                          profilePhoto: downloadURL,
                        }),
                      });
                      const json_data = await data.json();
                
                      if (data.status === 200) {
                        alert('Profile Photo updated')
                        localStorage.setItem("profilePhoto", downloadURL);
                        setProfileurl(downloadURL);
                        return;
                      }
                      
                      errmsg.current.style.display = "flex";
                      errmsg.current.innerText = json_data.errors;
                      setTimeout(() => {
                        errmsg.current.style.display = "none";
                        errmsg.current.innerText = "";
                      }, 3000);
                    
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
    <div className='w-3/4 box-border h-[90vh] flex flex-col overflow-y-auto p-4 text-[#010326]' ref={profilePhoto_Modal}>
      <label className="w-3/4 mt-4 ">Profile Photo</label>
        <input
          className="w-4/5 mt-1 h-[7.66vh] rounded-3xl box-border p-2"
          type="file"
          accept="image/*"
          name="name"
          onChange={OnChangeFile}
        ></input>
        
        <button
          onClick={onUpdatePhoto}
          className="bg-yellow-400 text-[#010326] h-[7vh] w-[35%]  rounded-3xl mt-5"
        >
          Upload
        </button>

        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
    </div>
  )
}
