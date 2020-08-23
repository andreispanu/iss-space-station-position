import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { DashboardContext } from "./context/Context";
import MapContainer from "./containers/MapContainer";
import TopBox from "./containers/TopBox";
import LoadingScreen from './containers/LoadingScreen';

// CSS
import "./static/css/components/appContainer.css";

function App() {

  const [error, setError] = useState('');
  const [tick, setTick] = useState({});

  // API address
  const API = 'http://api.open-notify.org/iss-now.json';

  useEffect(() => {

    const pullData = () => {
      axios.get(API)
        .then(result => {
          setTick(result)
        })
        .catch(error => {
          setError(error)
        });
    }
    const interval = setInterval(async () => {
      await pullData();
    }, 1000);
    return () => clearInterval(interval);
  }, [tick]);


  return (
    <div className="app-container">
      <LoadingScreen />
      <TopBox tick={tick} />
      <MapContainer tick={tick} />
    </div>
  );
}

export default App;
