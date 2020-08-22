import React, { useState, useEffect } from "react"
// CSS
import "../static/css/components/topBox.css";

const TopBox = (props) => {
  let [positions, setPositions] = useState([])

  useEffect(() => {
    let createPositionArray = () => {
      if (props.tick.data !== undefined) {
        let source = props.tick.data.iss_position
        let { latitude } = source
        let { longitude } = source
        setPositions([longitude, latitude])
      }
    }
    // call the function
    createPositionArray()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tick])

  return (
    <div className="box-container">
      <div className="box-title">
        <p>Live Feed</p>
      </div>
      <div className="box-positions-container">
        <div className="box-item"><p>Lat: <span>{positions[0]}</span></p></div>
        <div className="box-item"><p>Long:<span>{positions[1]}</span></p></div>
      </div>
    </div>
  )
}

export default TopBox