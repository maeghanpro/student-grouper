import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { FormControlLabel, Switch } from "@material-ui/core";

const StudentSwitch = withStyles({
  switchBase: {
    color: "#7b6400",
    "&$checked": {
      color: "#ae9133",
    },
    "&$checked + $track": {
      backgroundColor: "#ae9133",
    },
  },
  checked: {},
  track: {},
})(Switch);

const StudentViewSwitch = ({ updateStudentView }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    updateStudentView();
  };

  return (
    <FormControlLabel
      control={<StudentSwitch id="student-view-switch" checked={checked} onChange={handleChange} />}
      label="Student View"
    />
  );
};

export default StudentViewSwitch;
