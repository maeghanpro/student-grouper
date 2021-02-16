import React from 'react'
import {Typography} from '@material-ui/core'

import backgroundLogo from '../../../public/logo_transparent_background_shape.png'

const LandingPage = (props) => {
  return (
    <div>
      <img className="background-logo" src={backgroundLogo} alt="student grouper logo"/>
    </div>
  )
}

export default LandingPage