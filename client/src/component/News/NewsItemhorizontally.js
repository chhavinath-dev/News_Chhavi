import React, {useContext} from 'react'
import profile_blank from '../../profile_blank.png' 
import newsImageAlt from '../../newsImageAlt.jpg'
import { Link } from 'react-router-dom'
import { NewsContext } from "../../Context/newscontext"
import { BiSolidUpvote } from "react-icons/bi";
import { MdReportProblem } from "react-icons/md";
import { BiUpvote } from "react-icons/bi";
export default function NewsItemhorizontally({index, len, data}) {
    const {LikeThePost, DisLikeThePost}= useContext(NewsContext);
  const Like=async (postId)=>{
     if(!localStorage.getItem("id")){
      alert("Please Login First");
      return;
     }
     LikeThePost(localStorage.getItem("id"), postId)
 
  }
 
  const DisLike=async (postId)=>{
    if(!localStorage.getItem("id")){
     alert("Please Login First");
     return;
    }
    DisLikeThePost(localStorage.getItem("id"), postId)

 }
  return (
    <div className={`w-2/3 h-2/5 flex-shrink-0 bg-[#010326] border-[#F1F1F1] shadow-2xl border-l border-r flex flex-col items-center ${index===0 && "rounded-t-xl"} ${index===len-1 && "rounded-b-xl"}`}>
        {index!==0 && <div className='h-[1%] w-4/5 bg-[#F1F1F1]'></div>}
        <div className='w-full h-[99%] box-border p-2 flex text-[#F1F1F1]' >
            <img className='w-1/3 h-full' src={data.news_Image.length?data.news_Image[0]: newsImageAlt} alt=''/>
            <div className='w-2/3 h-full box-border pl-4 pt-2'>
                <div className='w-full h-1/5 flex'>
                    <div className='w-[6%] h-full'>
                        <img className='aspect-square w-full rounded-full' src={data.UserProfileImg!==""?data.UserProfileImg:profile_blank} alt=''/>
                    </div>
                    <button className='h-full w-[94%] text-start ml-3'>
                    <Link to= {'/Profile/User'} state={{id: data.user.toString()}}>{data.userName}</Link>
                    </button>
                </div>
                
                <div className='w-full h-3/5 box-border'>
                    <h1 className='text-2xl font-bold'>{data.heading}</h1>  
                    <p className='text-base'>{data.Content.substring(0,160)}...<Link className='ml-4 text-[#FFD700]' to="/News/detailedPage" state={data}>Read More </Link></p>
                </div>
               
                {/* <Link to="/News/detailedPage" state={data}> </Link> */}
                <div className='w-[85%] h-1/5 flex justify-between box-border pl-3'>
                {data.likes.includes(localStorage.getItem("id"))? <button className='flex items-center' onClick={()=>DisLike(data._id)}> <BiSolidUpvote color='green' className='mr-1'/>{data.likes.length} </button>:<button onClick={()=>Like(data._id)} className='flex items-center'> <BiUpvote className='mr-1'/>{data.likes.length}</button>}
                    <button> <MdReportProblem color='red'/> </button>
                </div>
            </div>
        </div>
        
    </div>
  )
}
