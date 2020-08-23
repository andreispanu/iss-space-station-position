import React, { useState, useEffect } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
// CSS
import "../static/css/components/mapContainer.css";
import * as d3 from "d3";


const MapContainer = (props) => {

  let width = window.innerWidth;
  let viewBox = `0 0 800 450`;
  const [geographies, setGeographies] = useState([])
  let [iss, setIss] = useState([])
  let issImage = require('../static/svg/satelite.svg')

  const projection = geoEqualEarth()
    .scale(160)
    .translate([800 / 2, 450 / 2])

  useEffect(() => {
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
      .then(response => {
        if (response.status !== 200) {
          console.log(`There was a problem: ${response.status}`)
          return
        }
        response.json().then(worlddata => {
          setGeographies(feature(worlddata, worlddata.objects.countries).features)
        })
      })
  }, [])

  useEffect(() => {
    let createPositionArray = () => {
      if (props.tick.data !== undefined) {
        let source = props.tick.data.iss_position
        let { latitude } = source
        let { longitude } = source
        setIss([...iss, { coordinates: [longitude, latitude], size: 12 }])
        // setIss([{ coordinates: [longitude, latitude], size: 17 }])
      }
    }
    // call the function
    createPositionArray()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tick])

  return (
    <div className="svg-container">
      <svg width='100%' height="100vh" viewBox={viewBox} >
        <g className="countries">
          {
            geographies.map((d, i) => (
              <path
                key={`path-${i}`}
                d={geoPath().projection(projection)(d)}
              />
            ))
          }
        </g>
        <g className="markers">
          <defs>
            <pattern id="img1" patternUnits="objectBoundingBox" width="24" height="24">
              <image href={issImage} x="0" y="0" width="24" height="24" />
            </pattern>
          </defs>
          {
            iss.map((locationData, i) =>
              <circle
                key={`marker-${i}`}
                cx={projection(locationData.coordinates)[0]}
                cy={projection(locationData.coordinates)[1]}
                r={locationData.size}
                className="circleNow"
                fill="url(#img1)"
              />
            )
          }
        </g>
      </svg>
    </div>

  )
}

export default MapContainer