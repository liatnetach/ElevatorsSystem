import React ,{ useEffect } from 'react';

import './elevator.scss';

const Elevator = (props) =>{
   const { currentFloor, id , transEnd, floorsNum} = props;

   useEffect(() => {
    const floorsPosition = Array(floorsNum).fill(null).map((u, i) => (floorsNum-1-i)*(-59))
    const lift = document.querySelector('.singleLift'+id);
    lift.style.bottom=floorsPosition[currentFloor]+ 'px'; 
    lift.addEventListener('transitionend',(e)=>{
      transEnd(id,currentFloor);
    })
  },[currentFloor])
  

    return(
        <div key={id*10} className={`singleLift${id}`} id={`singleLift${id}`}/>
   
    )
};
export default Elevator