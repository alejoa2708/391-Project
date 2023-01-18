

CREATE TABLE Department (
    d_id INT PRIMARY KEY,
    building VARCHAR(255)
);

CREATE TABLE Instructor (
    i_id INT PRIMARY KEY,
    name VARCHAR(255),
    d_id INT,
    FOREIGN KEY (d_id) REFERENCES Department(d_id)
);

CREATE TABLE Course (
    c_id INT PRIMARY KEY,
    title VARCHAR(255),
	credits VARCHAR(255),
    d_id INT,
    FOREIGN KEY (d_id) REFERENCES Department(d_id),
);

CREATE TABLE Student (
    s_id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    gender VARCHAR(255)
); 

CREATE TABLE Section (
	sec_id INT,
	c_id INT,
	ts_id INT,
	i_id INT,
	semester CHAR(3),
	year INT,
	capacity INT,
	enrolled INT,
	PRIMARY KEY (sec_id, c_id, ts_id, i_id, semester, year),
	FOREIGN KEY (c_id) REFERENCES Course (c_id),
	FOREIGN KEY (ts_id) REFERENCES Timeslot (ts_id),
	FOREIGN KEY (i_id) REFERENCES Instructor (i_id)
);