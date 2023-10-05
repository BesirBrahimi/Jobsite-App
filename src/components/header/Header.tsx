import React from 'react'
import "./Header.css"

type header = {
    completedCount:number;
    onRoadCount:number;
    onHoldCount:number;
}

const Header:  React.FC<header> = ({completedCount, onRoadCount, onHoldCount}) => {
  return (
     <div className="App-header">
        <header className="header">
        <div className="status-road">
            <h3 className='status'> {onRoadCount} On Road</h3>
        </div>
        <div className="status-completed1">
            <h3 className='status'> {completedCount} Completed</h3>
        </div>
        <div className="status-hold">
            <h3 className='status'> {onHoldCount} On Hold</h3>
        </div>
      </header> 
     </div>
    )
}

export default Header