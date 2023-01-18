

CREATE TABLE Department (
    d_id INT PRIMARY KEY,
    building INT
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

CREATE TABLE Timeslot (
	ts_id INT PRIMARY KEY,
	start_time TIME,
	end_time TIME,
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
	FOREIGN KEY (c_id) REFERENCES Course(c_id),
	FOREIGN KEY (ts_id) REFERENCES Timeslot(ts_id),
	FOREIGN KEY (i_id) REFERENCES Instructor(i_id)
);


CREATE TABLE Takes (
	sec_id INT,
	c_id INT,
	ts_id INT,
	i_id INT,
	semester CHAR(3),
	year INT,
	s_id INT,
	PRIMARY KEY (sec_id, c_id, ts_id, i_id, semester, year, s_id),
	FOREIGN KEY (s_id) REFERENCES Student(s_id),
	FOREIGN KEY (sec_id, c_id, ts_id, i_id, semester, year) REFERENCES Section(sec_id, c_id, ts_id, i_id, semester, year)
);


CREATE TABLE Prereq (
	c_id INT PRIMARY KEY,
	title VARCHAR(255),
	credits INT
);

