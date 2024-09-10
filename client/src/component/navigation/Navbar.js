import React, { useContext, useState, useRef } from "react";
import { Link, Navigate} from "react-router-dom";
import { NewsContext } from "../../Context/newscontext";
import { CiSquarePlus } from "react-icons/ci";
import ColorWheel from "../../utils/CoolorWheel";
import ProfileLogo from '../../utils/ProfileLogo';
import LoginButton from '../../utils/LoginButton'
import Category from './Category'
export default function Navbar() {
  const { country, setCountry , setNewsTag, isLogin} = useContext(NewsContext);
  const [currentButton, setCurrentButton] = useState(window.location.pathname);
  const signIn= useRef('')
  const navigation1 = [
    country === "Select Country" ? "Country" : country,
    "World",
  ];
 
  let ChangeColor=()=>{
    setNewsTag(window.location.pathname)
    setCurrentButton(window.location.pathname);
  }
  const mapThevalueTag=(arg)=>{
    if(country !== "Select Country"){ 
      return <Link to= {`/News/${arg}`} state={{Country:country, Category:arg}}>
      {arg}
      </Link>
    }
    return arg;

  }
  const showLoginButton=()=>{
    signIn.current.style.display=(signIn.current.style.display==="flex"?"none":"flex")
  }
  const mapThevalue=(arg)=>{
    if(country !== "Select Country"){ 
      return <Link to= {`/News/${arg}`} state={{Country:arg, Category:'none'}}>
      {arg}
      </Link>
    }
    return arg;

  }

  return (
    <div className="h-1/12 w-full bg-[#F1F1F1] text-[#000000]  flex justify-between border-b border-[#021E73]">
      <div className="h-full w-3/4 flex justify-start shadow-2xl items-center">
        <button
          className="mx-2 h-full"
          onClick={() => {
            setCountry("Select Country");
            localStorage.setItem("country", "Select Country");
            setNewsTag("")
            
          }}
        >
         <Link to= {`/`}>
                  News
         </Link>
          {country==="Select Country" && <Navigate to="/"/>}
        </button>
        {navigation1.map((val, index) => {
          return (
            <button
              className={`mx-2 h-full text-base cursor-not-allowed ${(window.location.pathname===`/News/${val}`)? "text-blue-600":"text-[#000000]"}`}
              disabled={country === "Select Country"}
              key={index}
              onClick={ChangeColor} 
            >
            {mapThevalue(val)}
            
            </button>
          );
        })}
        <button
              className={`mx-2 h-full text-base cursor-not-allowed ${(window.location.pathname===`/News/following/ForYou`)? "text-blue-600":"text-[#000000]"}`}
              disabled={country === "Select Country"}
              onClick={ChangeColor} 
            >
            {country !== "Select Country"?<Link to= {`/News/following/ForYou`}>For You</Link>: "For You"}
            </button>
        <button disabled className="w-px h-2/3 bg-[#000000]"></button>
        {Category.map((val, index) => {
          return (
            <button
              className={`mx-2 h-full text-base cursor-not-allowed active:text-blue ${(window.location.pathname===`/News/${val}`)? "text-blue-600":"text-[#000000]"}`}
              disabled={country === "Select Country"}
              key={index}
              onClick={ChangeColor} 
            >
             {mapThevalueTag(val)}
            </button>
          );
        })}
      </div>
      <div className="h-full w-1/4 flex justify-between items-center box-border">
      {isLogin? <button ><Link to="/News/newNews/post" className=" flex items-center text-base" > Post News<CiSquarePlus size={40} />
      </Link>
      </button> : <button className=" flex items-center text-base" onClick={showLoginButton}> Post News<CiSquarePlus size={40} />
      </button>}
       {!isLogin && <div ref={signIn} className="fixed w-[12vw] h-[10vh] hidden bg-[#010326] border-2 border-[#F1F1F1] top-[8.333333vh] right-[14vw] rounded-lg justify-center items-center">
        <button className="rounded-md w-1/2 text-[#F1F1F1] text-sm" onClick={showLoginButton}><Link to="/auth/login">Please log in to continue..</Link></button>
       </div>}
       <ColorWheel/> 
       {isLogin?<ProfileLogo/>:<LoginButton/>}
      </div>
    </div>
  );
}
