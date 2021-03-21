import React from 'react'
import './button.scss'

const Button = (props)=>{
    const { onClick, id }=props;
   
    const click=(event)=>{
        document.getElementById(id).style.backgroundColor='red';
        onClick(event);
    }
    return(
    <div className="buttonscontainer">
        <button key={id} id ={id} className="floor_button" onClick={click}> floor {id}</button>
    </div>)
};
export default Button