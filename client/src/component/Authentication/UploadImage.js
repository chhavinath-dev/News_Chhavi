import React, { useState, useContext, useRef } from "react";
import img from "../../home_background_2.jpg";
import { NewsContext } from "../../Context/newscontext";
import { UpdateProfileAPI } from "../../Api";
import { Link, Navigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {storage} from "./FireBase";

export default function UploadImage() {
  const { setProfileurl, country } = useContext(NewsContext);
  const [uploaded, setUploded] = useState(false);
  const [profileImg, setProfileImg] = useState();

  const errmsg = useRef("");
  const toTheHome = useRef("");
  const OnChangeInp = (e) => {
    setProfileImg(e.target.files?.item(0));
  };

  const SubmitCredential = async () => {
   
    if (!profileImg) {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please upload a photo";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
   
    try {
  
      const storageRef = ref(storage, localStorage.getItem("id"));
      
      const metadata = {
        contentType: profileImg.type,
      };
      const snapshot = await uploadBytes(storageRef, profileImg, metadata);
      const downloadURL = await getDownloadURL(snapshot.ref);
      console.log(downloadURL);
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
        localStorage.setItem("profilePhoto", downloadURL);
        setProfileurl(downloadURL);
       toTheHome.current.click()
        return;
      }
      
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = json_data.errors;
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
    } catch (err) {
            errmsg.current.style.display="flex"
            errmsg.current.innerText= "Unable to reach server"
            setTimeout(()=>{
              errmsg.current.style.display="none"
              errmsg.current.innerText= ""
            }, 3000)
    }
  };
  return (
    <div
      className="h-11/12 w-full bg-cover flex flex-col items-center overflow-y-auto box-border py-5 "
      style={{ backgroundImage: `url(${img})` }}
    >
      
      <div className="w-1/3  rounded-xl bg-[#021859] border border-[#021E73] flex flex-col items-center flex-shrink-0 p-4">
      <div className="w-full flex justify-end">
      <button  className="text-yellow-50 w-1/5">
        <Link ref={toTheHome} to={`/News/${country}`} state={{Country:country, Category:'none'}}>
          <RxCross2 />
        </Link>
      </button>
      {!localStorage.getItem("id")===undefined && <Navigate to="/auth/signup"/>}
      </div>
       
        <label className="w-3/4 mt-4 text-yellow-50">Profile Photo</label>
        <input
          className="w-4/5 mt-1 h-[7.66vh] rounded-3xl box-border text-yellow-50 p-2"
          type="file"
          accept="image/*"
          name="name"
          onChange={OnChangeInp}
        ></input>
        {uploaded && <Navigate to={`/auth/signup/uploadphoto`} />}
        <button
          onClick={SubmitCredential}
          className="bg-yellow-100 text-[#010326] h-[7vh] w-[35%]  rounded-3xl mt-5"
        >
          Upload
        </button>

        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
      </div>
    </div>
  );
}
