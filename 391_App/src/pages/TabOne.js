import React, { useState, useEffect } from 'react'
import './Dashboard.css'
import Helper from '../helper'
import { DataGrid } from '@mui/x-data-grid'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'

const TabOne = () => {
  const [students, setStudents] = useState({})
  const [studentRows, setStudentRows] = useState([])
  const [filteredStudentRows, setFilteredStudentRows] = useState([])
  const [selectStudent, setSelectStudent] = useState(null);
  const [courses, setCourses] = useState({})
  const [courseRows, setCourseRows] = useState([])
  const [filteredCourseRows, setFilteredCourseRows] = useState([])
  const [selectCourse, setSelectCourse] = useState(null);
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    Helper.post(Helper.getAPIUrl('getStudents'), {}).then(response => {
      setStudents(response.data.recordsets[0])
    })
    Helper.post(Helper.getAPIUrl('getCourses'), {}).then(response => {
      setCourses(response.data.recordsets[0])
    })
  }, [])

  useEffect(() => {
    if (students.length > 0) {
      setStudentRows(prepStudentRows(students))
    }
    if (courses.length > 0) {
      setCourseRows(prepCourseRows(courses))
    }
  }, [students, courses])

  const prepStudentRows = student => {
    const data = []
    student.map(item =>
      data.push({
        id: item.s_id,
        first_name: item.first_name,
        last_name: item.last_name,
        gender: item.gender
      })
    )
    return data
  }

  const prepCourseRows = courses => {
    const data = []
    courses.map(item =>
      data.push({
        id: item.c_id,
        course_name: item.title,
        credits: item.credits,
        department: item.d_id
      })
    )
    return data
  }

  const filterTable = () => {
    Helper.post(Helper.getAPIUrl('filterFirstLast'), {
      firstName,
      lastName
    }).then(response => {
      setFilteredStudentRows(prepStudentRows(response.data.recordsets[0]))
      if (response.data.recordsets[0].length === 0) {
        setOpen(true)
      }
    })
  }

  const handleStudentClick = (row) => {
    setSelectStudent(row);
  };

  const handleCourseClick = (row) => {
    setSelectCourse(row);
  };

  const handleEnroll = (student, course) => {
    console.log(student);
	console.log(course);
  };

  const studentColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'first_name', headerName: 'First Name', width: 125 },
    { field: 'last_name', headerName: 'Last Name', width: 125 },
    { field: 'gender', headerName: 'Gender', width: 100 }
  ]

  const courseColumns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'course_name', headerName: 'Course', width: 150 },
    { field: 'credits', headerName: 'Credits', width: 100, hide: true },
    { field: 'department', headerName: 'Department', width: 100, hide: true }
  ]

  return (
    <>
      <div style={{ height: 700, width: '100%' }}>
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', paddingBottom: '40px', flexDirection: 'column'}}>
			<Typography variant="h3">Enroll</Typography>
			<Typography variant="h5">Select a student and course</Typography>
		</div>
        <div style={{ padding: "5px" }}>
          <TextField
            id='outlined-basic'
            label='First Name'
            variant='outlined'
            onChange={e => setFirstName(e.target.value)}
			sx={{p:1, width:160 }}
          />
          <TextField
            id='outlined-basic'
            label='Last Name'
            variant='outlined'
            onChange={e => setLastName(e.target.value)}
			sx={{p:1, width:160}}
          />
          <Button variant='contained' onClick={filterTable} sx={{p:1, mt:2}}>
            Filter
          </Button>
        </div>
        <div style={{ display: 'flex', height: '80%' }}>
          <div style={{ width: '70%', height: '100%', padding: '10px' }}>
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
          <div style={{ width: '30%', height: '100%', flex: 1, padding: '10px' }}>
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

        {open ? (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              zIndex: 999
            }}
          >
            <Alert
              onClose={() => {
                setOpen(false)
              }}
              severity='error'
            >
              <AlertTitle>Error</AlertTitle>
              No names with the provided filters{' '}
              <strong>- change your search!</strong>
            </Alert>
          </div>
        ) : (
          <></>
        )}
		<Grid container justifyContent="flex-end" sx={{p:1}}>
			<Button
				variant='contained'
				onClick={handleEnroll(selectStudent, selectCourse)}
				sx={{p:1, mt:2}}
			>
            Enroll
          </Button>
		</Grid>
      </div>
    </>
  )
}

export default TabOne
