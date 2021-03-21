import React, { useState } from 'react'
import './App.css';
import Building from './components/building/Building'

function App() {
  const [numOfElevators, setNumOfElevetors] = useState(3);
  const [numOfFloors, setNumOfFloors] = useState(6);
  const [displayBuild, setDisplayBuild] = useState(false);

  const handleFloorsChange=event=>{
    console.log("floors:"+event.target.value)
    setNumOfFloors(parseInt(event.target.value));
  }
  const handleElevatorsChange=event=>{
    setNumOfElevetors(parseInt(event.target.value));
    console.log("elevators:"+ event.target.value)
  
  }
  const build=event=>{
    if (numOfElevators && numOfFloors) {
      setDisplayBuild(true);
    }
    
  }
  return (
    <div className="App">

      {!displayBuild&&(<label htmlFor="buildFloors">number of floors: </label>)}
      {!displayBuild&&(<input 
        id="buildFloors" 
        type='number' 
        defaultValue='6'
        onChange={handleFloorsChange} />)}
      <br></br>

      {!displayBuild&&(<label htmlFor="buildElevators">number of elevators: </label>)}
      {!displayBuild&&(<input 
        id="buildElevators" 
        type="number" 
        defaultValue='3'
        onChange={handleElevatorsChange} />)}
        <br></br>
      {!displayBuild &&(<button onClick={build}> Build Me My Costume Building!</button>)}
      {displayBuild && <Building elevators={numOfElevators} floors={numOfFloors} /> }
    </div>
  );
}

export default App;
