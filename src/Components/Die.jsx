import React from 'react'

function Die({value,isHeld,onHold}) {
  return (
    <div className='Die'
         style = {{backgroundColor: isHeld ? "#59E391": "white"} }
         onClick={onHold} >
      <h3>{value}</h3>
    </div>
  )
}

export default Die
