import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CiSearch } from "react-icons/ci";
export default function Searchbar({query, setQuery}) {
  const changeQueryVal= (e)=>{
    setQuery(e.target.value)
  }
  
  return (
    <div className='w-full h-[7vh] flex-shrink-0 flex justify-center my-2'>
      <input className='w-2/5 rounded-s-3xl px-3 outline-none' onChange={changeQueryVal} value={query} type="search"></input>
      <buton className="bg-black text-white rounded-e-3xl p-3 flex items-center"><Link to={`/News/Search/Query?Search=${query}&&name="jsiajsia"`}><CiSearch size={23} /> </Link></buton>
    </div>
  )
}
