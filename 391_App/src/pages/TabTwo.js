import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Helper from "../helper";
import { DataGrid } from "@mui/x-data-grid";
import {
  TextField,
  Button,
  Alert,
  AlertTitle,
  Typography,
  Snackbar,
} from "@mui/material";

const TabTwo = () => {
  const [students, setStudents] = useState({});
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    Helper.post(Helper.getAPIUrl("getStudents"), {}).then((response) => {
      setStudents(response.data.recordsets[0]);
    });
  }, []);

  useEffect(() => {
    if (students.length > 0) {
      setRows(prepRows(students));
    }
  }, [students]);

  const prepRows = (student) => {
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

  const filterTable = () => {
    Helper.post(Helper.getAPIUrl("filterFirstLast"), {
      firstName,
      lastName,
    }).then((response) => {
      setFilteredRows(prepRows(response.data.recordsets[0]));
      if (response.data.recordsets[0].length === 0) {
        setOpen(true);
      }
    });
  };

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "first_name", headerName: "First Name", width: 150 },
    { field: "last_name", headerName: "Last Name", width: 150 },
    { field: "gender", headerName: "Gender", width: 150 },
  ];

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
          <Typography variant="h3">Students</Typography>
        </div>
        <div style={{ padding: "5px" }}>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            onChange={(e) => setFirstName(e.target.value)}
            sx={{ p: 1, width: 200 }}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            onChange={(e) => setLastName(e.target.value)}
            sx={{ p: 1, width: 200 }}
          />
          <Button
            variant="contained"
            onClick={filterTable}
            sx={{ p: 1, mt: 2 }}
          >
            Filter
          </Button>
        </div>
        <div style={{ display: "flex", height: "75%" }}>
          <div style={{ width: "75%", height: "100%", padding: "10px" }}>
            {filteredRows.length > 0 ? (
              <DataGrid
                rows={filteredRows}
                columns={columns}
              />
            ) : (
              rows.length > 0 && (
                <DataGrid
                  rows={rows}
                  columns={columns}
                />
              )
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
      </div>
    </>
  );
};

export default TabTwo;
