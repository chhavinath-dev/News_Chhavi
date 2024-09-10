import React, { useRef, useState, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import Category from "../component/navigation/Category";
import { NewsContext } from "../Context/newscontext";
import Countries from "../component/Home/Country";
export default function UpdateNewsModal({modalRef, data}) {
    const { UpdateNews } = useContext(NewsContext);
    const [newsContent, setNewsContent] = useState({
        heading: data.heading,
        Content: data.Content,
        Country: data.Country,
        Category: data.Category
      });
      const errmsg = useRef("");
      const newCategory = ["Select Category", ...Category];
      const OnChangeInp=(e)=>{
            setNewsContent({
              ...newsContent,
              [e.target.name]: e.target.value,
            });
      };
      const OnUpdate = async () => {
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
        UpdateNews(newsContent, data._id);
        modalRef.current.style.display="none"
      };
  return (
    <div ref={modalRef} className='fixed flex-col pb-5 w-[60vw] box-border items-center h-[85vh] border-2 hidden border-black rounded-lg bg-white top-0 bottom-0 left-0 right-0 m-auto overflow-y-auto'>
      <div className="w-full flex justify-end flex-shrink-0 box-border pt-2 pr-3" onClick={()=>{modalRef.current.style.display="none"}}>
      <button  className="text-[#021859]">
          <RxCross2 size={30}/>
      </button>
      </div>
      <label className="w-[77%] mt-4 text-[#021859] flex-shrink-0">
          Heading <span style={{ color: "red" }}>*</span>
        </label>
        <input
          className="w-4/5 mt-1 h-[10vh] rounded-3xl pl-4 box-border flex-shrink-0 text-[#021859] border-2 border-[#021859] text-3xl"
          type="text"
          name="heading"
          value={newsContent.heading}
          onChange={OnChangeInp}
        ></input>
        <label className="w-[77%] mt-4 text-[#021859] flex-shrink-0">
          Content <span style={{ color: "red" }}>*</span>
        </label>
        <textarea
          className="w-4/5 mt-1 rounded-3xl pl-4 pt-1 box-border flex-shrink-0 text-[#021859] border-2 border-[#021859]"
          value={newsContent.Content}
          name="Content"
          rows={10}
          onChange={OnChangeInp}
        ></textarea>
        <div className="flex w-[77%] mt-4 items-center justify-between flex-shrink-0">
          <div className="w-[45%] flex items-center">
            <label className="w-2/5 text-[#021859]">
              Country <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="w-3/5 h-[7.66vh] rounded-3xl pl-4 box-border text-[#021859] border-2 border-[#021859]"
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
          <div className="w-[45%] flex items-center flex-shrink-0 ">
            <label className="w-2/5 text-[#021859]">
              Category <span style={{ color: "red" }}>*</span>
            </label>
            <select
              className="w-3/5 h-[7.66vh] rounded-3xl pl-4 box-border text-[#021859] border-2 border-[#021859]"
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
        <button
          onClick={OnUpdate}
          className="bg-[#010326] text-yellow-50 h-[8%] w-[20%] rounded-3xl mt-5 flex-shrink-0"
        >
          Update
        </button>

        <p className="mt-3 text-red-600 text-xl italic hidden" ref={errmsg}>
          {" "}
        </p>
    </div>
  )
}
