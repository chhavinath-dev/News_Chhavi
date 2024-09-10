import React, { useRef, useState, useContext } from "react";
import Countries from "../component/Home/Country";
import { NewsContext } from "../Context/newscontext";
import { Link, Navigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./Authentication/FireBase";
import Category from "../component/navigation/Category";

export default function AddNews() {
  const [newsContent, setNewsContent] = useState({
    heading: "",
    Content: "",
    Country: "Select Country",
    Category: "Select Category",
    news_Image: [],
  });
  const [newsImg, setNewsImg] = useState();
  const { PostNews } = useContext(NewsContext);
  const errmsg = useRef("");
  const newCategory = ["Select Category", ...Category];
  const OnChangeInpFile = (e) => {
    setNewsImg(e.target.files?.item(0));
  };
  const uploadImg = async()=>{
    if (!newsImg) {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Upload a image first";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
      try {
        const d = new Date();
        const newDateref= d.toString()
        const storageRef = ref(storage, newDateref);
        const metadata = {
          contentType: newsImg.type,
        };
        const snapshot = await uploadBytes(storageRef, newsImg, metadata);
        const downloadURL = await getDownloadURL(snapshot.ref);
        console.log(downloadURL);
      
        setNewsContent({
          ...newsContent,
          news_Image: [...newsContent.news_Image, downloadURL,newDateref],
        });
        alert("Image uploaded")
      } catch (err) {
        errmsg.current.style.display = "flex";
        errmsg.current.innerText = "Internal Server Error";
        setTimeout(() => {
          errmsg.current.style.display = "none";
          errmsg.current.innerText = "";
        }, 3000);
        return;
      }
    
  }
  const OnChangeInp = (e) => {
    setNewsContent({
      ...newsContent,
      [e.target.name]: e.target.value,
    });
  };
  const OnPost = async () => {
    if (newsContent.heading === "") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Provide a Heading";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (newsContent.Content === "") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Provide Content of the News";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (newsContent.Country === "Select Country") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Select a Country";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    if (newsContent.Category === "Select Category") {
      errmsg.current.style.display = "flex";
      errmsg.current.innerText = "Please Select a Category";
      setTimeout(() => {
        errmsg.current.style.display = "none";
        errmsg.current.innerText = "";
      }, 3000);
      return;
    }
    console.log(newsImg)
    
    console.log(newsContent);
    PostNews(newsContent);
    setNewsContent({
      heading: "",
      Content: "",
      Country: "Select Country",
      Category: "Select Category",
      news_Image: [],
    });
  };
  return (
    <div className="h-11/12 w-full bg-cover flex flex-col items-center overflow-y-auto box-border py-4 text-yellow-50">
      <h1 className="underline text-3xl">Publish Your Story</h1>
      <div className="w-4/5 flex-shrink-0 box-border p-5 mt-3 bg-[#010326] flex flex-col items-center rounded-xl">
        <label className="w-[77%] mt-4 text-yellow-50 flex-shrink-0">
          Heading <span style={{ color: "red" }}>*</span>
        </label>
        <input
          className="w-4/5 mt-1 h-[10vh] rounded-3xl pl-4 box-border flex-shrink-0 text-black text-3xl"
          type="text"
          name="heading"
          value={newsContent.heading}
          onChange={OnChangeInp}
        ></input>
        <label className="w-[77%] mt-4 text-yellow-50 flex-shrink-0">
          Content <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          className="w-4/5 mt-1 rounded-3xl pl-4 pt-1 box-border flex-shrink-0 text-black"
          value={newsContent.Content}
          name="Content"
          rows={10}
          onChange={OnChangeInp}
        ></textarea>
        <div className="flex w-[77%] mt-4 items-center justify-between flex-shrink-0">
          <div className="w-2/5 flex items-center">
            <label className="w-2/5 text-yellow-50">
              Country <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="w-3/5 h-[7.66vh] rounded-3xl pl-4 box-border text-black"
              name="Country"
              value={newsContent.Country}
              onChange={OnChangeInp}
            >
              {Countries.map((ctry) => (
                <option className="w-full" key={ctry} value={ctry}>
                  {ctry}
                </option>
              ))}
            </select>
          </div>
          <div className="w-2/5 flex items-center flex-shrink-0">
            <label className="w-2/5 text-yellow-50">
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="w-3/5 h-[7.66vh] rounded-3xl pl-4 box-border text-black"
              value={newsContent.Category}
              name="Category"
              onChange={OnChangeInp}
            >
              {newCategory.map((ctry) => (
                <option className="w-full" key={ctry} value={ctry}>
                  {ctry}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex w-[77%]  justify-start items-center mt-4 flex-shrink-0">
        <label className="text-yellow-50">Upload news photo:</label>
        <input
          className="mx-2 w-[40%] rounded-3xl box-border text-yellow-50"
          type="file"
          accept="image/*"
          name="newsImg"
          onChange={OnChangeInpFile}
        ></input>
        <button className="w-1/5 text-yellow-50 border-2 border-yellow-50 rounded-2xl" onClick={uploadImg}>Upload</button>
        </div>
        <button
          onClick={OnPost}
          className="bg-yellow-100 text-[#010326] h-[8%] w-[20%] rounded-3xl mt-5 flex-shrink-0"
        >
          Post
        </button>

        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
      </div>
    </div>
  );
}
