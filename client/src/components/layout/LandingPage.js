import React from 'react'
import {Typography} from '@material-ui/core'

import backgroundLogo from '../../../public/logo_transparent_background_shape.png'

const LandingPage = (props) => {
  return (
    <div>
      <div className="landing-header">
        <Typography align="center" variant="h1" >Welcome</Typography>
        <Typography align="center" variant="h1">to</Typography>
        <Typography align="center" variant="h1">Student Grouper</Typography>
      </div>
      <img className="background-logo" src={backgroundLogo} alt="student grouper logo"/>
    </div>
  )
}

export default LandingPage