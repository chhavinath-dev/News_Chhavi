import React, { useContext, useRef } from "react";
import newsImageAlt from "../../newsImageAlt.jpg";
import { Link } from "react-router-dom";
import { BiSolidUpvote } from "react-icons/bi";
import { NewsContext } from "../../Context/newscontext";
import { MdReportProblem } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { FaSadCry, FaTrash } from "react-icons/fa";
import UpdateNewsModal from "../UpdateNewsModal";
export default function YourNews({ index, len, data }) {
  const { LikeThePost, DisLikeThePost, DeleteThePost } =
    useContext(NewsContext);
  const modalRef = useRef("");
  const Like = async (postId) => {
    if (!localStorage.getItem("id")) {
      alert("Please Login First");
      return;
    }
    LikeThePost(localStorage.getItem("id"), postId);
  };
  const DeleteNews = (postId, fireBaseImgRef) => {
    DeleteThePost(localStorage.getItem("id"), postId, fireBaseImgRef);
  };
  const DisLike = async (postId) => {
    if (!localStorage.getItem("id")) {
      alert("Please Login First");
      return;
    }
    DisLikeThePost(localStorage.getItem("id"), postId);
  };
  return (
    <div
      className={`w-2/3 h-[30%] flex-shrink-0 bg-[#021859] border-white border-l border-r flex flex-col items-center ${
        index === len - 1 && "rounded-b-xl"
      }`}
    >
      {index !== 0 && <div className="h-[1%] w-4/5 bg-white"></div>}
      <div className="w-full h-[99%] box-border p-2 flex text-white">
        <img
          className="w-1/3 h-full"
          src={data.news_Image.length ? data.news_Image[0] : newsImageAlt}
        />
        <div className="w-2/3 h-full box-border px-2">
         
          <div className='w-full h-4/5 box-border'>
                        <h1 className='text-2xl font-bold'>{data.heading}</h1>  
                        <p className='text-base'>{data.Content.substring(0,200)}... <Link className='ml-4 text-[#FFD700]' to="/News/detailedPage" state={data}>Read More </Link></p>
           </div>
      
          <div className="w-[85%] h-1/5 flex justify-between box-border pl-3">
            {data.likes.includes(localStorage.getItem("id")) ? (
              <button
                className="flex items-center"
                onClick={() => DisLike(data._id)}
              >
                {" "}
                <BiSolidUpvote color="green" className="mr-1" />
                {data.likes.length}{" "}
              </button>
            ) : (
              <button
                onClick={() => Like(data._id)}
                className="flex items-center"
              >
                {" "}
                <BiUpvote className="mr-1" />
                {data.likes.length}
              </button>
            )}
            {data.user.toString() === localStorage.getItem("id") && (
              <button
                className="flex text-center items-center"
                onClick={() => DeleteNews(data._id, data.news_Image)}
              >
                <FaTrash />{" "}
              </button>
            )}
            {data.user.toString() === localStorage.getItem("id") && (
              <button
                className="flex text-center items-center"
                onClick={() => {
                  modalRef.current.style.display = "flex";
                }}
              >
                <FaEdit />{" "}
              </button>
            )}
            <button className="flex text-center items-center">
              {" "}
              <MdReportProblem color="yellow" />{" "}
            </button>
          </div>
          <UpdateNewsModal modalRef={modalRef} data={data} />
        </div>
      </div>
    </div>
  );
}
