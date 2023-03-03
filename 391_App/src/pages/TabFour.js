import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Helper from "../helper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";

const TabFour = () => {
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [instructorTitle, setInstructorTitle] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [courseTitle, setCourseTitle] = useState("");

  useEffect(() => {}, []);

  console.log(gender);
  console.log(department);
  console.log(instructorTitle);
  console.log(year);
  console.log(term);
  console.log(courseTitle);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: "80vh"
        }}
      >
        <div style={{ flexBasis: "45%" }}>
          <div>
		  	<div style={{ padding: '10px' }}>
              <div style={{ paddingLeft: '10px' }}>Instructor</div>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Gender
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Male"}>Male</MenuItem>
                  <MenuItem value={"Female"}>Female</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Department
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={department}
                  onChange={(event) => {
                    setDepartment(event.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Computer Science"}>
                    Computer Science
                  </MenuItem>
                  <MenuItem value={"Psychology"}>Psychology</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Title
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={instructorTitle}
                  onChange={(event) => {
                    setInstructorTitle(event.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Mr."}>Mr.</MenuItem>
                  <MenuItem value={"Mrs."}>Mrs.</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ paddingLeft: '10px' }}>Date</div>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Year
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={year}
                  onChange={(event) => {
                    setYear(event.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"1999"}>1999</MenuItem>
                  <MenuItem value={"2000"}>2000</MenuItem>
                </Select>
              </FormControl>
              <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-filled-label">
                  Term
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={term}
                  onChange={(event) => {
                    setTerm(event.target.value);
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Winter"}>Winter</MenuItem>
                  <MenuItem value={"Fall"}>Fall</MenuItem>
                  <MenuItem value={"Spring"}>Spring</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div style={{ padding: '10px' }}>
              <div style={{ paddingLeft: '10px' }}>Course</div>
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "55ch" },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="filled-basic" label="Course name" variant="filled" onChange={(event) => {
                    setCourseTitle(event.target.value);
                  }}/>
              </Box>
            </div>
          </div>
        </div>
        <div style={{ flexBasis: "45%", display: "flex", justifyContent: "center", textAlign: "center", marginTop: "100px" }}>
  			<Typography variant="h1">700000</Typography>
		</div>
      </div>
    </>
  );
};

export default TabFour;
