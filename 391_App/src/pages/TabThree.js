import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Helper from '../helper';
import { DataGrid } from '@mui/x-data-grid';
import {
	Typography,
  } from "@mui/material";

const convertTime = (date) => {
	const newDate = new Date(date);
	const time = newDate.toLocaleTimeString([], {
	  hour: "2-digit",
	  minute: "2-digit",
	});
	return time.toString();
  };

const TabThree = () => {
	
	const [courses, setCourses] = useState({});
	const [rows, setRows] = useState([]);

	useEffect(() => {
		Helper.post(Helper.getAPIUrl('getStudentsTakenCourses'), {}).then(response => {
			setCourses(response.data.recordsets[0]);
		});
	}, []);

	useEffect(() => {
		if(courses.length > 0) {
			const data = [];
			let counter = 0;
			courses.map((item) => 
				data.push({
					id: counter++,
					sid: item.s_id,
					name: `${item.first_name} ${item.last_name}`,
					start: convertTime(item.start_time),
					end: convertTime(item.end_time),
					sem: item.semester,
					year: item.year,
					secid: item.sec_id,
					iid: item.i_id,
					cid: item.c_id,
					course: item.title
				})
			);
			setRows(data);
		}
	}, [courses])

	const columns = [
		{ field: 'id', headerName: 'ID', width: 100, hide: true },
		{ field: 'sid', headerName: 'Student ID', width: 100 },
		{ field: 'name', headerName: 'Full Name', width: 200 },
		{ field: 'cid', headerName: 'Course ID', width: 100 },
		{ field: 'course', headerName: 'Course', width: 200 },
		{ field: 'iid', headerName: 'Instructor ID', width: 100 },
		{ field: 'secid', headerName: 'Section ID', width: 100 },
		{ field: 'sem', headerName: 'Semester', width: 100 },
		{ field: 'year', headerName: 'Year', width: 100 },
		{ field: 'start', headerName: 'Start Time', width: 150 },
		{ field: 'end', headerName: 'End Time', width: 150 },
	]

	return (
		<>
      <div style={{ height: "89vh", width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            paddingBottom: "30px",
            flexDirection: "column",
          }}
        >
          <Typography variant="h3">Students Courses</Typography>
        </div>
        <div style={{ display: "flex", height: "75%" }}>
		{ courses.length > 0 && rows &&
				<div style={{ height: 700, width: '100%' }}>
					<DataGrid rows={rows} columns={columns}/>
				</div>
			}
          
        </div>
      </div>
    </>
	);

}

export default TabThree; 