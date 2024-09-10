import React, {useRef, } from 'react'

import EditProfilePhoto from './EditProfilePhoto';
import EditProfilePersonal from './EditProfilePersonal';
import EditProfilePassword from './EditProfilePassword';
import DeleteProfile from './DeleteProfile';
export default function EditProfile() {
  const profilePhoto_Modal= useRef("");
  const personalInfo_Modal= useRef("");
  const Password_Modal= useRef("");    
  const DeleteProfile_Modal= useRef("") 
  return (
    <div className="h-11/12 w-full bg-cover flex justify-center overflow-y-auto box-border py-5 text-base">
    <div className='w-2/3 h-[90vh] bg-white box-border flex rounded-xl'>
    <div className='flex flex-col w-1/4'>
    <button className='w-full h-[12%] border-r border-b border-[#010326]' onClick={()=>{
      personalInfo_Modal.current.style.display="none"
      Password_Modal.current.style.display="none"
      profilePhoto_Modal.current.style.display="flex"
      DeleteProfile_Modal.current.style.display="none"
    }}>Profile Photo</button>
    <button className='w-full h-[12%] border-r border-b border-[#010326]'  onClick={()=>{
      profilePhoto_Modal.current.style.display="none"
      Password_Modal.current.style.display="none"
      personalInfo_Modal.current.style.display="flex"
      DeleteProfile_Modal.current.style.display="none"
    }}
    >Personal Info</button>
    <button className='w-full h-[12%] border-r border-b border-[#010326]'  onClick={()=>{
      personalInfo_Modal.current.style.display="none"
      profilePhoto_Modal.current.style.display="none"
      Password_Modal.current.style.display="flex"
      DeleteProfile_Modal.current.style.display="none"
    }}>Password</button>
    <button className='w-full h-[12%] border-r border-b border-[#010326]'  onClick={()=>{
      personalInfo_Modal.current.style.display="none"
      profilePhoto_Modal.current.style.display="none"
      Password_Modal.current.style.display="none"
      DeleteProfile_Modal.current.style.display="flex"
    }}>Delete Account</button>
    <button className='w-full h-[48%] border-r border-[#010326] ' disabled></button>
    </div>
    <EditProfilePhoto profilePhoto_Modal={profilePhoto_Modal}/>
    <EditProfilePersonal personalInfo_Modal={personalInfo_Modal}/>
    <EditProfilePassword Password_Modal={Password_Modal}/>
    <DeleteProfile DeleteProfile_Modal={DeleteProfile_Modal} />
    </div>
    
    </div>
  )
}
