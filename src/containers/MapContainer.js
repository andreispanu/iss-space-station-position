import React, { useState, useEffect, useRef } from "react"
import { geoEqualEarth, geoPath } from "d3-geo"
import { feature } from "topojson-client"
import axios from 'axios';
import * as d3 from "d3";

const MapContainer = (props) => {
  const d3Svg = useRef();
  let width = window.innerWidth;
  let viewBox = `0 0 800 450`;
  let [error, setError] = useState('')
  const [geographies, setGeographies] = useState([])
  let [iss, setIss] = useState([])

  // let station = require('../static/svg/issShuttle.svg')

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

  let marked = require('../static/svg/issShuttle.svg')

  const appendCustomMarker = () => {
    var svg = d3.select("body").append("svg")
    svg.append('image')
      .attr('xlink:href', marked)
      .attr('width', 100)
      .attr('height', 100)

    var circle = d3.select('.markers')
    circle.append('svg:defs')
      .attr("id", "grump_avatar")
      .attr("width", 100)
      .attr("height", 100)
      .attr("patternUnits", "userSpaceOnUse")
      .append('image')
      .attr('xlink:href', 'https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png')
      .attr('width', 100)
      .attr('height', 100)
      .attr("x", 0)
      .attr("y", 0);

    circle.style("fill", "url(https://cdn1.iconfinder.com/data/icons/social-media-set/24/Reverbnation-128.png)")


    // var body = d3.select("body");
    // var svg = body.append("svg");

    // svg.append('svg:defs')
    //   .attr("id", "grump_avatar")
    //   .attr("width", 100)
    //   .attr("height", 100)
    //   .attr("patternUnits", "userSpaceOnUse")
    //   .append("svg:image")
    //   .attr("xlink:href", marked)
    //   .attr("width", 100)
    //   .attr("height", 100)
    //   .attr("x", 0)
    //   .attr("y", 0);

    // var circle = d3.select('.circleNow')
    // circle.style("fill", "url(#grump_avatar)")


    // var defs = svg.append('svg:defs');
    // var defs = svg.append("svg")
    // .attr("id", "grump_avatar")
    // .attr("width", 100)
    // .attr("height", 100)
    // .attr("patternUnits", "userSpaceOnUse")
    // .append("svg:image")
    // .attr("xlink:href", marked)
    // .attr("width", 100)
    // .attr("height", 100)
    // .attr("x", 0)
    // .attr("y", 0);


    // svg.style("fill", "url(#grump_avatar)")

    // svg.append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple")
    // var myimage = svg.append('image')
    //   .attr('xlink:href', marked)
    //   .attr('width', 100)
    //   .attr('height', 100)
  }

  // useEffect(() => {
  //   appendCustomMarker()
  // }, [])

  // ============================

  useEffect(() => {
    let createPositionArray = () => {
      if (props.tick.data !== undefined) {
        let source = props.tick.data.iss_position
        let { latitude } = source
        let { longitude } = source
        setIss([...iss, { coordinates: [longitude, latitude], size: 10 }])
      }
    }
    // call the function
    createPositionArray()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.tick])


  return (
    <svg width={width} height={'100vh'} viewBox={viewBox} >
      <g className="countries">
        {
          geographies.map((d, i) => (
            <path
              key={`path-${i}`}
              d={geoPath().projection(projection)(d)}
              fill="#212529"
              stroke="#343a40"
              strokeWidth={0.5}
            />
          ))
        }
      </g>
      <g className="markers" >
        {
          iss.map((locationData, i) => (
            <circle
              ref={d3Svg}
              key={`marker-${i}`}
              cx={projection(locationData.coordinates)[0]}
              cy={projection(locationData.coordinates)[1]}
              r={locationData.size}
              fill='yellow'
              stroke="rgba(65, 135, 238, 0.2)"
              className="circleNow"
            />
          ))
        }
      </g>
    </svg>
  )
}

export default MapContainer