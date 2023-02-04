import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Helper from '../helper';
import { DataGrid } from '@mui/x-data-grid';

const TabThree = () => {
	
	const [students, setStudents] = useState({});
	const [rows, setRows] = useState([]);

	useEffect(() => {
		Helper.post(Helper.getAPIUrl('getStudents'), {}).then(response => {
			setStudents(response.data.recordsets[0]);
		});
	}, []);

	useEffect(() => {
		if(students.length > 0) {
			const data = [];
			students.map((item) => 
				data.push({ id: item.s_id, first_name: item.first_name, last_name: item.last_name, gender: item.gender })
			);
			setRows(data);
		}
	}, [students])

	const columns = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'first_name', headerName: 'First Name', width: 150 },
		{ field: 'last_name', headerName: 'Last Name', width: 150 },
		{ field: 'gender', headerName: 'Gender', width: 150 },
	]

	return (
		<>
			yooooooooooooooo what are we gonna put in hereeeeeeee?
		</>	
	);

}

export default TabThree; 