import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Helper from '../helper';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const TabTwo = () => {
	
	const [students, setStudents] = useState({});
	const [rows, setRows] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	useEffect(() => {
		Helper.post(Helper.getAPIUrl('getStudents'), {}).then(response => {
			//console.log(response.data.recordsets[0]);
			setStudents(response.data.recordsets[0]);
		});
		if(students.length > 0) {
			prepRows();
		}
	}, [students]);

	const prepRows = () => {
		const data = [];
		students.map((item) => 
			data.push({ id: item.s_id, first_name: item.first_name, last_name: item.last_name, gender: item.gender })
		);
		setRows(data);
	}

	const filterTable = () => {
		console.log("clicked")
		Helper.post(Helper.getAPIUrl('filterFirstLast'), {firstName, lastName}).then(response => {
			//console.log(response.data.recordsets[0]);
			//setStudents(response.data.recordsets[0]);
		});
		//prepRows();
		//console.log(rows);
	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'first_name', headerName: 'First Name', width: 150 },
		{ field: 'last_name', headerName: 'Last Name', width: 150 },
		{ field: 'gender', headerName: 'Gender', width: 150 },
	]

	return (
		<>
			<>
				{ students.length > 0 && rows &&
					<div style={{ height: 700, width: '100%' }}>
						<div>
							<TextField id="outlined-basic" label="First Name" variant="outlined" onChange={(e)=>setFirstName(e)}/>
							<TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={(e)=>setLastName(e)}/>
							<Button variant="contained" onClick={()=>{filterTable()}}>Filter</Button>
						</div>
						<DataGrid rows={rows} columns={columns}/>
					</div>
				}
			</>
		</>	
	);

}

export default TabTwo; 