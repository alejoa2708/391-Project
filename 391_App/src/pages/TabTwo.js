import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Helper from '../helper';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

const TabTwo = () => {
	const [students, setStudents] = useState({});
	const [rows, setRows] = useState([]);
	const [filteredRows, setFilteredRows] = useState([]);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [open, setOpen] = React.useState(false);

	useEffect(() => {
		Helper.post(Helper.getAPIUrl('getStudents'), {}).then(response => {
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
		student.map(item => 
			data.push({ id: item.s_id, first_name: item.first_name, last_name: item.last_name, gender: item.gender })
		);
		return data;
	}

	const filterTable = () => {
		Helper.post(Helper.getAPIUrl('filterFirstLast'), { firstName, lastName }).then(response => {
			setFilteredRows(prepRows(response.data.recordsets[0]));
			if(response.data.recordsets[0].length === 0){
				setOpen(true);
			}
		});

	}

	const columns = [
		{ field: 'id', headerName: 'ID', width: 150 },
		{ field: 'first_name', headerName: 'First Name', width: 150 },
		{ field: 'last_name', headerName: 'Last Name', width: 150 },
		{ field: 'gender', headerName: 'Gender', width: 150 },
	]

	return (
		<>
			<div style={{ height: 700, width: '100%' }}>
				<div>
					<TextField id="outlined-basic" label="First Name" variant="outlined" onChange={e => setFirstName(e.target.value)} />
					<TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={e => setLastName(e.target.value)} />
					<Button variant="contained" onClick={filterTable}>Filter</Button>
				</div>
				{ filteredRows.length > 0 ?
					<DataGrid rows={filteredRows} columns={columns} />
				:
					rows.length > 0 && <DataGrid rows={rows} columns={columns} />
				}{ open ?
					<div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 999 }}>
					<Alert onClose={() => {setOpen(false)}} severity="error">
					<AlertTitle>Error</AlertTitle>
					No names with the provided filters <strong>- change your search!</strong>
				  </Alert>
				  </div>
				:
				<></>
				}
			</div>
		</>	
	);
};

export default TabTwo;
