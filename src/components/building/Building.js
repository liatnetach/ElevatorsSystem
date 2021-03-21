import React ,{useState, useRef} from 'react';
import Elevator from '../elevator/Elevator';
import Button from '../button/Button';
import './building.scss';
import '../elevator/elevator.scss';
import Sound from 'react-sound';
import elevatorBell from './ElevatorBell.mp3';

const Building = (props)=> {
    const floorsNum=props.floors
    const elevatorsNum=props.elevators
    const arr = Array(elevatorsNum).fill(null).map((u, i) => {return({elevatorId:i+1,floorNum:0})})
    const [elevatorsList, setElevatorsList] = useState(() => arr);
    
    const requestsQueue=useRef([]);
    const queueManager=useRef([]);
    
   const orderElevator= (event) =>{
       if( !requestsQueue.current.includes(parseInt(event.target.id))){//if floor btn already pressed there is no need for duplicate
            requestsQueue.current.push(parseInt(event.target.id));
            checkQueue();
        }
    }
    const [isPlaying, setIsPlaying] = useState(false);
    const setPlayingStatus = (event)=>{
       setIsPlaying(false);

    }

    const elevatorHasArrived=(floor)=>{
        setIsPlaying(true);
        document.getElementById(floor).style.backgroundColor='green';
    }

    async function performBatchActions(id, currFloor) {
        elevatorHasArrived(currFloor)
        sleep(2000).then(() => {
            queueManager.current[id-1]=true;
        });
    }
    
    const sleep = ms => new Promise(resolve => {
        setTimeout(
            () => {resolve()},
            ms
        );
    });

    async function checkQueue(){

        if(queueManager.current.length===0)
        {
            queueManager.current=Array(elevatorsNum).fill(null).map((u,i)=> {return(true)})
        } 
        const availableElevators=elevatorsList.filter(elevator=>{
            return queueManager.current[elevator.elevatorId-1];
        }); 
        if(requestsQueue.current.length>0){
            if(availableElevators.length > 0)
            {
                const listDup=[...elevatorsList];
                const request=requestsQueue.current.shift()//pull out the first request in the line and shift the rest
              // find the best match
                const currentFloorsDif=availableElevators.map(curr=>{return Math.abs(curr.floorNum-request)})//create array of the distances between current floor of each elevator to the requested floor
                const closestfloor= Math.min.apply(null, currentFloorsDif);//find the shortest distance
                const closestelevator= availableElevators.find(cell=>(Math.abs(cell.floorNum-request)===closestfloor))//find the elevator that has the minimum distance
                if(closestelevator.floorNum===request){//in case that there is already available elevator in the requested floor
                    elevatorHasArrived(request)
                }
                else{
                    listDup[closestelevator.elevatorId-1]={elevatorId:closestelevator.elevatorId,floorNum:request}
                    queueManager.current[closestelevator.elevatorId-1]=false;
                    setElevatorsList(listDup);
                }
            }
            else{
                sleep(2000).then(() => {
                    checkQueue()
                });
            }
        }
      
    }
  
    const floors = Array(floorsNum).fill(null).map((u, i) => i)
    return(
        <div className="building-outline"> 
            <div className="building-inline">
                <div className="space" />
                <div className="buttons" >
                    {
                        floors.map(cell =>{ 
                        return (
                        <Button 
                            key={cell} 
                            id={cell} 
                            onClick={orderElevator}/>
                        )
                    })
                    }
                 </div>
                 <div className="elevators" id="elevators" >
                     {
                     elevatorsList.map(cell => { 
                        return (
                        <Elevator  
                            key={floors.length+cell.elevatorId} 
                            id={cell.elevatorId} 
                            currentFloor={cell.floorNum} 
                            transEnd={performBatchActions} 
                            floorsNum={floorsNum}/> 
                        )
                })}
                  
                </div>   
                <div className="space" > 
                    <Sound url={elevatorBell} playStatus={
                    isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED} volume={25} onFinishedPlaying={setPlayingStatus}/>
                </div>
            </div>
           
        </div>
    )
};
export default Building
