import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Helper from '../helper';
import { DataGrid } from '@mui/x-data-grid';

const TabFour = () => {
	
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
				data.push({ id: item.s_id, name: `${item.first_name} ${item.last_name}`, gender: item.gender })
			);
			setRows(data);
		}
	}, [students])

	const columns = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'name', headerName: 'Full Name', width: 150 },
		{ field: 'gender', headerName: 'Gender', width: 150 },
	]

	return (
		<>
			yooooooooooooooooooo whaaaaaaaaaat shouuuuuuuuuuuld weeeeeeeeeeeeeeeeeeee puttttttttttttttt heeeeeeeeeeeeerrrrrrrreeeeeee?
		</>	
	);

}

export default TabFour; 