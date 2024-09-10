import React from 'react'
import { useLocation, Link } from 'react-router-dom';
import newsImageAlt from '../../newsImageAlt.jpg'
import profile_blank from '../../profile_blank.png'
export default function DetailedPage() {
  let ind= Math.floor(Math.random() * 3);
  console.log(ind)
  const styleArr=["float-start","float-right","float-left"]
  const location= useLocation()
  const data= location.state
  console.log(data)
    console.log("detailedPage Data", data)
  return (
    <div className='h-11/12 w-full flex flex-col items-center overflow-y-auto box-border py-4'>
    <div className='w-[70%] flex-shrink-0 flex flex-col bg-[#F1F1F1] py-3 px-5 rounded-lg'>
      <div className='w-full h-[9vh] flex box-border my-1'>
       <div className='w-[10%] h-full'>
         <img className='h-full aspect-square rounded-full' src={data.UserProfileImg!==""?data.UserProfileImg:profile_blank} alt=''></img>
       </div>
       <div className='w-[85%] h-full flex items-center text-3xl'>
        <h1>{data.userName}</h1>
       </div>
      </div>
      <div className='w-full h-px bg-black mb-3 '></div>
      <div className='mb-3 '>
        <h1 className='text-4xl font-bold'>{data.heading}</h1>
      </div>
      <div className='w-full'>
        <img src={data.news_Image.length?data.news_Image[0]: newsImageAlt} className={`${styleArr[ind]} m-2 w-[480px] h-auto `} alt=''></img>
        <p>{data.Content}</p>
      </div>

      <div>

      </div>
    </div>
      
    </div>
  )
}
