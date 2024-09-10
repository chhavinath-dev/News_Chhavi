import { useContext, useEffect, useState } from "react"
import React from 'react'
import loading from '../../loading.gif'
import { useLocation, Link } from 'react-router-dom';
import { NewsContext } from "../../Context/newscontext"
import Searchbar from "../../utils/Searchbar"
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from "./NewsItem"
export default function News() {
  const { newsArr, FetchNews, totalNews}= useContext(NewsContext);
  const location= useLocation()
  
  const data= location.state
  const fetchMoreData=()=>{
     setPageNumber(pageNumber+1);
     FetchNews(data?data.Country: localStorage.getItem("country"),data? data.Category:"none", pageNumber+1)
     console.log(pageNumber)
     console.log("total news",totalNews)
     console.log("newsArr length",newsArr.length)
  }
  const [pageNumber, setPageNumber]= useState(0)
  const[query, setQuery]= useState("");
  useEffect(()=>{
    setPageNumber(0);
    FetchNews(data?data.Country: localStorage.getItem("country"),data? data.Category:"none", 0)
  },[location.pathname])
  return (
    <div id="scrollableDiv" className="h-11/12 w-full bg-cover overflow-y-auto box-border py-1">
    <Searchbar query={query} setQuery={setQuery} />
    <InfiniteScroll
          className="w-full flex flex-col items-center overflow-y-hidden"
          dataLength={newsArr.length}
          next={fetchMoreData}
          hasMore={totalNews!==newsArr.length}
          loader={<div className="text-center">
            <img style={{ width: "460px" }} src={loading} alt="" />
            <p >Please wait while fetching news... </p>
          </div>}
          scrollableTarget="scrollableDiv"
        >
    <div className="w-4/5 flex justify-start box-border flex-wrap flex-shrink-0">
    
    {newsArr.map((data, index)=>{
      return<div key={index} className='w-1/3 h-[70vh] my-2 box-border flex justify-center items-center flex-shrink-0'> <NewsItem  data={data}/></div>
    })}
    </div>
    </InfiniteScroll>
    </div>
  )
}
