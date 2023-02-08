import React, { useState, useEffect } from 'react';
import Helper from '../helper';
import { TableGrid } from 'ionic-react-tablegrid';

const TabOne = () => {

	const [students, setStudents] = useState({});

	useEffect(() => {
		Helper.post(Helper.getAPIUrl('getStudents'), {}).then(response => {
			//console.log(response.data.recordsets[0]);
			setStudents(response.data.recordsets[0]);
		});
	}, []);

	return (
		<>
			{ students.length > 0 &&
				<div>
					<TableGrid
						rows={students.map((item) => item)}
						headers={['ID','First Name','Last Name', 'Gender']}
						headerStyle={{backgroundColor: 'gray'}}
        				rowStyle={{backgroundColor: 'white'}}
					/>
				</div>
			}
		</>
	);

}

export default TabOne; 