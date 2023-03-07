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

/**
   * Filter button function. Takes the created query from queryBuilder and sends it as a request.
   * Updates and filters the courses tables if succeeds.
   */
function handleFilter() {
  let query = queryBuilder;
  console.log(query)
  Helper.post(Helper.getAPIUrl("filterCourses"), {
    query
  }).then((response) => {
    if (!response || !response.data || !response.data.success) {
      console.error(
        `Something went wrong...`
      );
      return;
    }
    console.log(response.data.val);
    return;
  });
}

// THIS IS JUST A SAMPLE DOESNT USE THE ACTUAL TABLES
const queryBuilder = (
  gender,
  department,
  instructorTitle,
  year,
  term,
  courseTitle
) => {
  let query = `SELECT COUNT(*) FROM Fact FT`;

  if (gender || department || instructorTitle) {
    query += " JOIN Instructor I ON FT.ins_id = I.ins_id";
  }

  if (year || term) {
    query += " JOIN Date D ON D.date_id = FT.date_id";
  }

  if (courseTitle) {
    query += " JOIN Course C ON C.course_id = FT.course_id";
  }

  if (gender || department || instructorTitle || year || term || courseTitle) {
    query += " WHERE";

    if (gender) {
      query += ` I.gender = '${gender}'`;
    }

    if (department) {
      query += gender ? " AND" : "";
      query += ` I.dept = '${department}'`;
    }

    if (instructorTitle) {
      query += gender || department ? " AND" : "";
      query += ` I.title = '${instructorTitle}'`;
    }

    if (year) {
      query += gender || department || instructorTitle ? " AND" : "";
      query += ` D.year = '${year}'`;
    }

    if (term) {
      query += gender || department || instructorTitle || year ? " AND" : "";
      query += ` D.semester = '${term}'`;
    }

    // might have to change this to contains not just a where clause
    if (courseTitle) {
      query +=
        gender || department || instructorTitle || year || term ? " AND" : "";
      query += ` C.title = '${courseTitle}'`;
    }
  }
  
  console.log(query);
};

const TabFour = () => {
  const [gender, setGender] = useState("");
  const [department, setDepartment] = useState("");
  const [instructorTitle, setInstructorTitle] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [courseNum, setcourseNum] = useState("");

  useEffect(() => {
    // This function will be called whenever there is a change
    let query = `SELECT COUNT(*) FROM Fact FT`;

    if (gender || department || instructorTitle) {
      query += " JOIN Instructor I ON FT.ins_id = I.ins_id";
    }

    if (year || term) {
      query += " JOIN Date D ON D.date_id = FT.date_id";
    }

    if (courseTitle) {
      query += " JOIN Course C ON C.course_id = FT.course_id";
    }

    if (gender || department || instructorTitle || year || term || courseTitle) {
      query += " WHERE";

      if (gender) {
        query += ` I.gender = '${gender}'`;
      }

      if (department) {
        query += gender ? " AND" : "";
        query += ` I.dept = '${department}'`;
      }

      if (instructorTitle) {
        query += gender || department ? " AND" : "";
        query += ` I.title = '${instructorTitle}'`;
      }

      if (year) {
        query += gender || department || instructorTitle ? " AND" : "";
        query += ` D.year = '${year}'`;
      }

      if (term) {
        query += gender || department || instructorTitle || year ? " AND" : "";
        query += ` D.semester = '${term}'`;
      }

      // might have to change this to contains not just a where clause
      if (courseTitle) {
        query +=
          gender || department || instructorTitle || year || term ? " AND" : "";
        query += ` C.title = '${courseTitle}'`;
      }
    }

    // runs the queries right after selecting filters
    Helper.post(Helper.getAPIUrl("filterCourses"), {
      query
    }).then((response) => {
      if (!response || !response.data || !response.data.success) {
        console.error(`Something went wrong...`);
        return;
      }
      setcourseNum(response.data.val);
      console.log(response.data.val);
      return;
  });
    // queryBuilder(gender, department, instructorTitle, year, term, courseTitle);
  }, [gender, department, instructorTitle, year, term, courseTitle]);

  return (
    <>
      <div style={{ height: "89vh", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingBottom: "10px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Number of courses</Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            height: "80vh",
          }}
        >
          <div style={{ flexBasis: "45%" }}>
            <div>
              <div style={{ paddingLeft: "20px" }}>
                <Typography variant="h5">Filters</Typography>
              </div>
              <div style={{ padding: "10px" }}>
                <div style={{ paddingLeft: "10px" }}>Instructor</div>
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
                    <MenuItem value={"Mr"}>Mr.</MenuItem>
                    <MenuItem value={"Mrs"}>Mrs.</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div style={{ padding: "10px" }}>
                <div style={{ paddingLeft: "10px" }}>Date</div>
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
              <div style={{ padding: "10px" }}>
                <div style={{ paddingLeft: "10px" }}>Course</div>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "55ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="filled-basic"
                    label="Course name"
                    variant="filled"
                    onChange={(event) => {
                      setCourseTitle(event.target.value);
                    }}
                  />
                </Box>
              </div>
            </div>
          </div>
          <div
            style={{
              flexBasis: "45%",
              display: "flex",  
              justifyContent: "center",
              textAlign: "center",
              marginTop: "125px",
            }}
          >
            <Typography variant="h1">{courseNum}</Typography>
          </div>
        </div>
      </div>
    </>
  );
};

export default TabFour;
