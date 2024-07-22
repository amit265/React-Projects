import React from 'react'
import AboutFunctional from './AboutFunctional'
import AboutClass from './AboutClass'

const About = () => {
  return (
    <div style={{backgroundColor: "white"}}>
      <AboutFunctional name={"Amit Kumar(function)"} location ={"Bihar"}/>
      <AboutClass name = {"Amit Kumar(Class)"} location = {"India"}/>
    </div>
  )
}

export default About
