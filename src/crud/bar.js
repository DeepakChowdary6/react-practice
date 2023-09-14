import '../App.css'
import array from '../array'
import {Popup} from "reactjs-popup"

export default function Bar(props){
     const {Name,id,Age,handledelete,handleupdate}=props

    return (<tr className="App-item">
        <td>{id}</td><td>{Name}</td> <td>{Age}</td>

        <button onClick={()=>{handledelete(id)}}>delete</button>
        </tr>);
}