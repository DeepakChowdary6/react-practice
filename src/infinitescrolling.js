import { useState, useCallback, useRef } from 'react';
import './App.css';
import Crud from './crud';

//this is backend driven approach
function Infinitescrolling() {
     const myref=useRef()
    const observer=useRef(null);

    const [query,setquery]=useState("");
     const page=useRef(1)
     const [data,setdata]=useState([]);
     const [loading,setloading]=useState(false);
     const controller=useRef(null);
    const prev_quer=useRef(query);
     const lastelementobs=useCallback((tag)=>{
              console.log("this is the last element ",tag);
             if(observer.current){
                 observer.current.disconnect();

             }
                 observer.current=new IntersectionObserver(entries => {
                     if(entries[0].isIntersecting){

                         page.current++;
                         fetch_data(query);
                     }

                 });


         if(tag)observer.current.observe(tag);

     })
    const fetch_data=useCallback(async (query)=>{

     setloading(true);
          if(prev_quer.current!==query){
              setdata([]);
              prev_quer.current=query;
              page.current=1;
          }
              const prm = await fetch('https://openlibrary.org/search.json?' + new URLSearchParams({
                  q: query,
                  page: page.current
              })).then(response => {
                  return response.json()
              }).finally(setloading(false));
              setdata(prevState => [...prevState, ...prm.docs]);



    },[])



   return (<>


       <input value={query} onChange={(event)=>{setquery(event.target.value)}}/>

       <button onClick={()=>{fetch_data(query)}}> search </button>
       {data && data.map((item,index)=> {if(index===data.length-1) return <div ref={lastelementobs} key={index}>{item.title}</div>
       else return <div key={index}>{item.title}</div>;})
       }
       {loading && "LOADING"}
   </>)
}

export default Infinitescrolling;