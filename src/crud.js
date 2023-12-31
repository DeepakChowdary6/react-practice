import { useEffect, useRef, useState, useCallback } from "react"
import {Routes,Router} from "react-router-dom";

import Bar from "./crud/bar";
import './App.css'
import array from './array.js'

// localStorage.setItem(3,JSON.stringify({userid:"3",name:"Deepak",place:"Nandigama"}));
// const value=JSON.parse(localStorage.getItem(3));


export default function Crud(props) {
     const [data,setdata]=useState(array);
     const newid=useRef(null);
     const newname=useRef(null);
     const newage=useRef(null);

    const handledelete=(id)=>{
            const updatedData = data.filter(item => item.id !== id);
            setdata(updatedData);
    }
    const handleupdate=(id,name,age)=>{
        const ind=data.findIndex(item=>item.id===id);
        if(ind===-1){
            alert("user Id not existed")
        }
       else {
            // const updatedData = [...data];
            // updatedData[ind] = { id, Name: name, Age: age };

            // Update the state with the new array
            setdata((prevdata)=>{
                const updated_data=prevdata.map((item,index)=>{
                    if(item.id===id){
                        return { ...item, Name: name, Age: age };
                    }else return item;
                });
                return updated_data;
            });
        }
    }
    const handleaddition=()=>{
        let new_id=newid.current.value;
        let new_name=newname.current.value;
        let new_age=newage.current.value;
        if(data.findIndex(item=>item.id===new_id)===-1){
            let new_obj={id:new_id,Name:new_name,Age:new_age};
            setdata((prevState)=>[...prevState,new_obj])
        }else{
            alert("User Id already existed")
        }

    }
    return (
            <div className="App-header">
                <h className="App-link">React CRUD operations</h>
                <table>
                    <tr>
                        <th>id</th>
                        <th>Name</th>
                        <th>Age</th>
                    </tr>
                {data && data.map((item)=> <Bar
                    handledelete={handledelete}
                    Name={item.Name}
                    Age={item.Age}
                    id={item.id} />) }
                </table>
                <div><span>id</span><input ref={newid} type="text"/>
                    <span>name</span><input ref={newname} type="text"/>
                    <span>age</span><input ref={newage} type="text"/>
                    <button onClick={()=>{handleupdate(newid.current.value,newname.current.value,newage.current.value)}}>update</button>
                    <button onClick={handleaddition}>add</button>

                </div>

            </div>
    )
}