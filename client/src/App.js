import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import img from "./home_background_2.jpg";
import News from "./component/News/News";
import Login from "./component/Authentication/Login";
import AllUserProfile from "./component/Profile/AllUserProfile";
import Sign from "./component/Authentication/Sign";
import Query from "./component/News/Query";
import Navbar from "./component/navigation/Navbar";
import Footer from "./component/navigation/Footer";
import Home from "./component/Home/Home";
import DetailedPage from "./component/News/DetailedPage";
import ProfilePage from "./component/Profile/ProfilePage";
import { NewsContext } from "./Context/newscontext";
import EditProfile from "./component/Profile/EditProfile";
import UploadImage from "./component/Authentication/UploadImage";
import React, { useEffect, useContext, useRef } from "react";
import ForYou from "./component/News/ForYou";
import NewsState from "./Context/newsState";
import AddNews from "./component/AddNews";
export default function App() {
  const { country } = useContext(NewsContext);
  const custamizedCursor= useRef("")
  const CustomeCursor=(e)=>{
    console.log(getComputedStyle(document.body).background)
     const mouseY = e.clientY;
     const mouseX = e.clientX;
     custamizedCursor.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
     custamizedCursor.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  }
 
  useEffect(() => {
    window.addEventListener("mousemove", CustomeCursor);
    

    return () => {
      window.removeEventListener("mousemove", CustomeCursor);
    };
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
          <Footer />
        </>
      ),
    },
    {
      path: `/News/:country`,
      element: (
        <>
          <Navbar />
          <News />
          <Footer />
        </>
      ),
    },
    {
      path: `/News/detailedPage`,
      element: (
        <>
          <Navbar />
          <DetailedPage />
          <Footer />
        </>
      ),
    },
    {
      path: `/News/newNews/post`,
      element: (
        <>
          <Navbar />
          <AddNews />
          <Footer />
        </>
      ),
    },
    {
      path: `/News/following/ForYou`,
      element: (
        <>
          <Navbar />
          <ForYou />
          <Footer />
        </>
      ),
    },
    {
      path: "/News/Search/Query",
      element: (
        <>
          <Navbar />
          <Query />
          <Footer />
        </>
      ),
    },
    {
      path: "/Profile/User",
      element: (
        <>
          <Navbar />
          <ProfilePage />
          <Footer />
        </>
      ),
    },
    {
      path: "/Profile/AllUser",
      element: (
        <>
          <Navbar />
          <AllUserProfile />
          <Footer />
        </>
      ),
    },
    {
      path: "/User/EditProfile",
      element: (
        <>
          <Navbar />
          <EditProfile />
          <Footer />
        </>
      ),
    },
    {
      path: "/auth/login",
      element: (
        <>
          <Navbar />
          <Login />
          <Footer />
        </>
      ),
    },
    {
      path: "/auth/signup/uploadphoto",
      element: (
        <>
          <Navbar />
          <UploadImage />
          <Footer />
        </>
      ),
    },
    {
      path: "/auth/signup",
      element: (
        <>
          <Navbar />
          <Sign />
          <Footer />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <Navbar />
          <div>No page Zone</div>
          <Footer />
        </>
      ),
    },
  ]);
  
  return (
    <NewsState>
      <div ref={custamizedCursor} className="border-2 fixed border-black rounded-full w-6 h-6 shadow-2xl"></div>
      <div
        className="h-screen w-screen"
        style={{ backgroundImage: `url(${img})` }}
      >
        <RouterProvider router={router} />
      </div>
    </NewsState>
  );
}
