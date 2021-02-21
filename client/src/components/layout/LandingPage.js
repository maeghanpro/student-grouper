import React from 'react'
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import {Typography, Card, CardMedia, Box, Button} from '@material-ui/core'

import classesImage from '../../../public/images/classes.png'
import studentsImage from  '../../../public/images/students.png'
import groupsImage from '../../../public/images/groups.png'

const useStyles = makeStyles({
  root1: {
    width: 615,
    maxHeight: 250,
    position: 'relative',
    backgroundColor: '#F3F3EE',
    padding: 10
  },

  root3: {
    width: 900,
    maxHeight: 430,
    backgroundColor: '#F3F3EE',
    position: 'relative',
  },
  media1: {
    height: 250,
  },
  media3: {
    height: 430,
  },
  text: {
    position: 'relative',
    maxWidth: 400,
    padding: 10
  }
});

const LandingPage = (props) => {
  const classes = useStyles();
  return (
    <div className='landing-page'>
      <div style={{width: '100%'}}>
        <Box display="flex" justifyContent="center" m={2} p={1}>
          <Typography variant="h2">
            Welcome to Student Grouper
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" m={3} p={1}>
          <Box m={4} p={3}>
            <Typography className={classes.text} variant='h3'>
            Generate groups of students 
              <Typography className={classes.text} variant="h5">
                based on their academic and social-emotional characteristics.
              </Typography>
            </Typography>
          </Box>
          <Card raised elevation={9} className={classes.root3}>
            <CardMedia
              className={classes.media3}
              image={groupsImage}
              title='Groups Page'
            />
          </Card>
        </Box>
        <hr style={{paddingTop: 30}}/>
        <Box display="flex" justifyContent="center" m={2} p={1}>
          <Box display="flex" flexDirection="column"  m={2} p={1}>
            <Box justifyContent="center">
              <Typography style={{position: 'relative'}} variant="h2">
                Getting Started
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center" m={1} p={2}>
              <Link to="/users/new">
                <Button className= "sign-up-button" variant="contained">
                  Sign Up
                </Button> 
              </Link>
            </Box>
          </Box>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-evenly" m={2} p={1}>
          <Card raised elevation={9} className={classes.root1}>
            <CardMedia
              className={classes.media1}
              image={classesImage}
              title='Classes Page'
            />
          </Card>
          <Card raised elevation={9} className={classes.root1}>
            <CardMedia
              className={classes.media1}
              image={studentsImage}
              title='Student Roster Page'
            />
          </Card>
        </Box>
      </div>
    </div>
  )
}

export default LandingPage