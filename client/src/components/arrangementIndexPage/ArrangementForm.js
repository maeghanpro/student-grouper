import React, { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Card,
  CardContent,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DonutLarge } from "@material-ui/icons";
import ErrorList from "../Alerts/ErrorList";

const primary = "#7E93A2";
const secondary = "#F3F3EE";

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: primary,
    color: secondary,
    marginTop: 40,
  },
  header: {
    margin: 10,
  },
  form: {
    alignContent: "center",
    "& .MuiTextField-root": {
      margin: 10,
      width: 200,
    },
    "& .MuiInputBase-input:focus": {
      backgroundColor: primary,
      color: secondary,
    },
    "& .MuiInputBase-input": {
      backgroundColor: primary,
      color: secondary,
      fontSize: "large",
    },
    "& .MuiInputLabel-root": {
      color: secondary,
    },
  },
  formControl: {
    minWidth: 180,
    margin: 10,
  },
}));

const ArrangementForm = ({ groupSizeOptions, addArrangement, errors }) => {
  const classes = useStyles();
  const [newArrangement, setNewArrangement] = useState({
    name: "",
    type: "",
    groupSize: "",
  });

  const handleInputChange = (event) => {
    setNewArrangement({
      ...newArrangement,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addArrangement(newArrangement);
  };

  const groupSizeMenuItems = groupSizeOptions.map((size) => (
    <MenuItem key={size} value={size}>
      {size}
    </MenuItem>
  ));

  return (
    <div>
      <Card className={classes.card} raised>
        <CardContent>
          <Typography className={classes.header} variant="h3">
            Create New Groups
          </Typography>
          <ErrorList errors={errors} />
          <form onSubmit={handleSubmit} className={classes.form}>
            <TextField
              className={classes.textField}
              onChange={handleInputChange}
              name="name"
              value={newArrangement.name}
              label="Name*"
              id="first-arrangement-name"
              variant="outlined"
            />
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="first-arrangement-type-label">Type*</InputLabel>
              <Select
                labelId="first-arrangement-type-label"
                id="first-arrangement-type"
                value={newArrangement.type}
                onChange={handleInputChange}
                label="Type*"
                inputProps={{
                  name: "type",
                }}
              >
                <MenuItem value="">
                  <em>Select Type</em>
                </MenuItem>
                <MenuItem value="random">Random</MenuItem>
                <MenuItem value="similar academicTier">Similar Academically</MenuItem>
                <MenuItem value="similar socialEmotionalTier">Similar Socially</MenuItem>
                <MenuItem value="varied academicTier">Varied Academically</MenuItem>
                <MenuItem value="varied socialEmotionalTier">Varied Socially</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
              <InputLabel id="first-arrangement-groupSize-label">Group Size*</InputLabel>
              <Select
                labelId="first-arrangement-groupSize-label"
                id="first-arrangement-groupSize"
                value={newArrangement.groupSize}
                onChange={handleInputChange}
                label="Group Size*"
                inputProps={{
                  name: "groupSize",
                }}
              >
                <MenuItem value="">
                  <em>Select Size</em>
                </MenuItem>
                {groupSizeMenuItems}
              </Select>
            </FormControl>
          </form>
          <Button variant="contained" size="medium" onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ArrangementForm;
