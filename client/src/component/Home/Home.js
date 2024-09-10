import React, { useContext, useEffect, useRef } from "react";
import { NewsContext } from "../../Context/newscontext";
import Countries from "./Country";
import img from "../../home_background_2.jpg"
import { Navigate } from "react-router-dom";

export default function Home() {
  const { country, setCountry , } = useContext(NewsContext);
  const country_val= useRef("");
  function selectCountry(){
    
    if(country_val.current.value==="Select Country"){
      
                alert("please select a country");
                return;
            
    }
    
    setCountry(country_val.current.value);
    localStorage.setItem("country", country_val.current.value)
    
    
  }

  
  return(
  
   <div className="h-11/12 w-full bg-cover flex justify-center items-center overflow-y-auto">
     <div className="flex flex-col h-side_block w-1/4">
     
     <select ref={country_val} className='h-1/2 w-full text-center rounded-none rounded-t-md' >
         {Countries.map((ctry)=> <option className="w-full" key={ctry} value={ctry}>{ctry}</option>
         )}
      </select>
      {country!=="Select Country"&& <Navigate to={`/News/${country}`} />}
      <button onClick={selectCountry} className='h-1/2 w-full bg-black text-white rounded-b-md'>
                 Select     
      </button>
     </div>
     
  </div>
  );
}
