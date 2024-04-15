import React from 'react'
import './ListView.css'

export const ListView = ({ noteObj, key }) => {
  return (
    

      <div className="listDiv" style={{backgroundColor:noteObj.color}}>
        <h3>{noteObj.title}</h3>
        <p>{noteObj.description}</p>
      </div>
    


  )
}
