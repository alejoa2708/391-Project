import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Helper from "../helper";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Grid from "@mui/material/Grid";
import { Typography, Box, Modal, Snackbar } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const convertTime = (date) => {
  const newDate = new Date(date);
  const time = newDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
};

const TabOne = () => {
  const [students, setStudents] = useState({});
  const [studentRows, setStudentRows] = useState([]);
  const [filteredStudentRows, setFilteredStudentRows] = useState([]);
  const [selectStudent, setSelectStudent] = useState(null);
  const [courses, setCourses] = useState({});
  const [courseRows, setCourseRows] = useState([]);
  const [filteredCourseRows, setFilteredCourseRows] = useState([]);
  const [selectCourse, setSelectCourse] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);
  const [openFailure, setOpenFailure] = React.useState(false);

  useEffect(() => {
    Helper.post(Helper.getAPIUrl("getStudents"), {}).then((response) => {
      setStudents(response.data.recordsets[0]);
    });
    Helper.post(Helper.getAPIUrl("getCourses"), {}).then((response) => {
      setCourses(response.data.recordsets[0]);
    });
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      setStudentRows(prepStudentRows(students));
    }
    if (courses.length > 0) {
      setCourseRows(prepCourseRows(courses));
    }
  }, [students, courses]);

  const prepStudentRows = (student) => {
    const data = [];
    student.map((item) =>
      data.push({
        id: item.s_id,
        first_name: item.first_name,
        last_name: item.last_name,
        gender: item.gender,
      })
    );
    return data;
  };

  const prepCourseRows = (courses) => {
    const data = [];
    courses.map((item) =>
      data.push({
        id: item.c_id,
        course_name: item.title,
        credits: item.credits,
        department: item.d_id,
        sec: item.sec_id,
        sem: item.semester,
        year: item.year,
        start: convertTime(item.start_time),
        end: convertTime(item.end_time),
        tsid: item.ts_id,
        iid: item.i_id,
      })
    );
    return data;
  };

  const filterTable = () => {
    Helper.post(Helper.getAPIUrl("filterFirstLast"), {
      firstName,
      lastName,
    }).then((response) => {
      setFilteredStudentRows(prepStudentRows(response.data.recordsets[0]));
      if (response.data.recordsets[0].length === 0) {
        setOpen(true);
      }
    });
  };

  const handleStudentClick = (row) => {
    console.log(row.row);
    setSelectStudent(row);
  };

  const handleCourseClick = (row) => {
    console.log(row.row);
    setSelectCourse(row);
  };

  const handleConfirm = () => {
    console.log("insert into takes now");
    setOpenSuccess(false);
  };

  function handleEnroll() {
    if (!selectStudent || !selectCourse) {
      console.error("Invalid Input(s) - Select a student AND a course");
    } else {
      console.log(selectStudent.row);
      console.log(selectCourse.row);

      let studentID = selectStudent.row.id;
    	let courseID = selectCourse.row.id; 
		let sectionID = selectCourse.row.sec;
		let semester = selectCourse.row.sem;
		let year = selectCourse.row.year;
		let start = selectCourse.row.start.split(' ')[0];
		let end = selectCourse.row.end.split(' ')[0];
		let takesID = selectCourse.row.tsid;
		let instructorID = selectCourse.row.iid;

		console.log(studentID, courseID, sectionID, semester, year, start, end);

      Helper.post(Helper.getAPIUrl("enroll"), {
        studentID,
        courseID,
        sectionID,
        semester,
        year,
        start,
        end,
		takesID, 
		instructorID
      }).then((response) => {
        if (!response || !response.data || !response.data.success) {
          console.error(
            "Enrolment Failed. Return an error message here later..."
          );
          setOpenFailure(true);
          return;
        }
        setOpenSuccess(true);
        console.log(
          "Enrolment Successful. Return an success message here later..."
        );
        return;
      });
    }
  }

  const studentColumns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "first_name", headerName: "First Name", width: 125 },
    { field: "last_name", headerName: "Last Name", width: 125 },
    { field: "gender", headerName: "Gender", width: 100, hide: true },
  ];

  const courseColumns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "course_name", headerName: "Course", width: 150 },
    { field: "credits", headerName: "Credits", width: 100, hide: true },
    { field: "department", headerName: "Department", width: 100, hide: true },
    { field: "sec", headerName: "Section", width: 70 },
    { field: "sem", headerName: "Semester", width: 70 },
    { field: "year", headerName: "Year", width: 70 },
    { field: "start", headerName: "Start Time", width: 100 },
    { field: "end", headerName: "End Time", width: 100 },
    { field: "tsid", headerName: "TSID", width: 150, hide: true },
    { field: "iid", headerName: "IID", width: 150, hide: true },
  ];

  return (
    <>
      <div style={{ height: "90vh", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingBottom: "40px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Enroll</Typography>
          <Typography variant="h5">Select a student and course</Typography>
        </div>
        <div style={{ padding: "5px" }}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ p: 1, width: 160 }}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            sx={{ p: 1, width: 160 }}
          />
          <Button
            variant="contained"
            onClick={filterTable}
            sx={{ p: 1, mt: 2 }}
          >
            Filter
          </Button>
        </div>
        <div style={{ display: "flex", height: "60%" }}>
          <div style={{ width: "45%", height: "100%", padding: "10px" }}>
            {filteredStudentRows.length > 0 ? (
              <DataGrid
                rows={filteredStudentRows}
                columns={studentColumns}
                onRowClick={handleStudentClick}
              />
            ) : (
              studentRows.length > 0 && (
                <DataGrid
                  rows={studentRows}
                  columns={studentColumns}
                  onRowClick={handleStudentClick}
                />
              )
            )}
          </div>
          <div
            style={{ width: "50%", height: "100%", flex: 1, padding: "10px" }}
          >
            {courseRows.length > 0 ? (
              <DataGrid
                rows={courseRows}
                columns={courseColumns}
                onRowClick={handleCourseClick}
              />
            ) : (
              <div>Loading courses</div>
            )}
          </div>
        </div>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => {
            setOpen(false);
          }}
          sx={{ marginLeft: "200px" }}
        >
          <Alert
            onClose={() => {
              setOpen(false);
            }}
            severity="error"
            sx={{ width: "400px", marginLeft: "-120px", marginTop: "-120px"}}
          >
            No names with the provided filters!
          </Alert>
        </Snackbar>
        <Modal
          open={openSuccess}
          onClose={() => setOpenSuccess(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Success
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              lOOKING GOOD, CONFIRM ENROLLMENT?
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleConfirm()}
              sx={{ p: 1, mt: 2 }}
            >
              Confirm
            </Button>
          </Box>
        </Modal>
        <Modal
          open={openFailure}
          onClose={() => setOpenFailure(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Failure
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              check ur prereqs, time conflicts, and the class capacity something
              there sucks and not letting you in
            </Typography>
          </Box>
        </Modal>
        <Grid container justifyContent="flex-end" sx={{ p: 1 }}>
          <Button
            variant="contained"
            onClick={() => handleEnroll()}
            sx={{ p: 1, mt: 2 }}
          >
            Enroll
          </Button>
        </Grid>
      </div>
    </>
  );
};

export default TabOne;
