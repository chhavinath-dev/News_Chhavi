import React,{useContext, useRef} from 'react'
import profile_blank from '../../profile_blank.png'
import newsImageAlt from '../../newsImageAlt.jpg'
import { NewsContext } from "../../Context/newscontext"
import { Link } from 'react-router-dom'
import { BiSolidUpvote } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiUpvote } from "react-icons/bi";
import { FaSadCry, FaTrash } from "react-icons/fa";
import UpdateNewsModal from '../UpdateNewsModal'


export default function NewsItem({data}) {
  const {LikeThePost, DisLikeThePost, DeleteThePost}= useContext(NewsContext);
  const modalRef=useRef("")
  const Like=async (postId)=>{
     if(!localStorage.getItem("id")){
      alert("Please Login First");
      return;
     }
     LikeThePost(localStorage.getItem("id"), postId)
 
  }
  const DeleteNews=(postId,fireBaseImgRef)=>{
    DeleteThePost(localStorage.getItem("id"), postId, fireBaseImgRef)
  }
  const DisLike=async (postId)=>{
    if(!localStorage.getItem("id")){
     alert("Please Login First");
     return;
    }
    DisLikeThePost(localStorage.getItem("id"), postId)

 }
  return (
    <div className='h-full w-card_width bg-[#010326] border border-[#021E73] rounded-lg shadow-2xl text-white box-border '>
    <div className="w-full h-margin_in_Card box-border flex items-center px-2">
     <img className='aspect-square w-1/12 rounded-full' src={data.UserProfileImg!==""?data.UserProfileImg:profile_blank} />
     <button className='h-full w-11/12 text-start ml-3'>
     <Link to= {'/Profile/User'} state={{id: data.user.toString()}}>{data.userName}</Link>
   </button>

    </div> 
    <img className='w-full h-Image_in_Card'  src={data.news_Image.length?data.news_Image[0]: newsImageAlt} /> 
  
        <div className="w-full h-Contentent_in_Card box-border p-2">
          <h1 className='text-2xl font-bold'>{data.heading}</h1>  
          <p className='text-base'>{data.Content.substring(0,160)}...   <Link className='ml-4 text-[#FFD700]'  to="/News/detailedPage" state={data}>Read More </Link></p>
        </div>
    
    <div className='w-full h-px bg-white'></div>
    <div className='w-full h-margin_in_Card flex justify-between box-border px-4'>
     {data.likes.includes(localStorage.getItem("id"))? <button className='flex items-center' onClick={()=>DisLike(data._id)}> <BiSolidUpvote color='green' className='mr-1'/>{data.likes.length} </button>:<button onClick={()=>Like(data._id)} className='flex items-center'> <BiUpvote className='mr-1'/>{data.likes.length}</button>}
      { data.user.toString()===localStorage.getItem("id") && <button className='flex text-center items-center' onClick={()=>DeleteNews(data._id,data.news_Image)}><FaTrash/> </button>}
      {data.user.toString()===localStorage.getItem("id") && <button className='flex text-center items-center' onClick={()=>{modalRef.current.style.display= "flex" ;}}><FaEdit/> </button>}
      <button> <MdReportProblem color='yellow'/> </button>
    </div>
    <UpdateNewsModal modalRef={modalRef} data={data}/>
    </div>
  )
}
