import React, { useState, useEffect } from "react"
// CSS
import "../static/css/components/loadingScreen.css";

const LoadScreen = (props) => {
  let [visible, setVisible] = useState(true)
  let graphics = require('../static/svg/loadScreen.svg')

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
    }, 4000);
    return () => clearInterval(interval);
  }, [])

  return (
    <div className={visible ? 'load-screen-container' : 'load-screen-container hidden'}>
      <div className="load-screen-graphics">
        <img src={graphics} alt="Load screen" />
      </div>
    </div>
  )
}

export default LoadScreen;