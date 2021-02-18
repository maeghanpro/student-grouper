import React, {useState} from 'react'
import { withStyles } from '@material-ui/core/styles'
import { FormControlLabel, FormGroup, Switch} from '@material-ui/core'

const StudentSwitch = withStyles({
  switchBase: {
    color: '#7b6400',
    '&$checked': {
      color: '#ae9133',
    },
    '&$checked + $track': {
      backgroundColor: '#ae9133',
    },
  },
  checked: {},
  track: {},
})(Switch);

const StudentViewSwitch = ({updateStudentView}) => {
  const [checked, setChecked] = useState(false)

  const handleChange = (event) => {
    setChecked(!checked)
    updateStudentView()
  }

  return (
    <FormGroup>
    <FormControlLabel
      control={<StudentSwitch id="student-view-switch" checked={checked} onChange={handleChange} />}
      label="Student View"
    />
    </FormGroup>
  )
}

export default StudentViewSwitch