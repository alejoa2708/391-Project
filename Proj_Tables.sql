CREATE TABLE IF NOT EXISTS Department (
	d_id INT PRIMARY KEY,
	d_name VARCHAR(255) NOT NULL,
	building INT NOT NULL
);

CREATE TABLE Instructor (
	i_id INT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	d_id INT NOT NULL,
	FOREIGN KEY (d_id) REFERENCES Department(d_id)
);

CREATE TABLE Course (
	c_id INT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	credits VARCHAR(255) NOT NULL,
	d_id INT NOT NULL,
	FOREIGN KEY (d_id) REFERENCES Department(d_id),
);

CREATE TABLE Student (
	s_id INT PRIMARY KEY,
	first_name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	gender VARCHAR(255) NOT NULL
); 

CREATE TABLE Timeslot (
	ts_id INT PRIMARY KEY,
	start_time TIME NOT NULL,
	end_time TIME NOT NULL,
);

CREATE TABLE Section (
	sec_id INT,
	c_id INT,
	ts_id INT,
	i_id INT,
	semester CHAR(3) NOT NULL,
	year INT NOT NULL,
	capacity INT NOT NULL,
	enrolled INT NOT NULL,
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
	semester CHAR(3) NOT NULL,
	year INT NOT NULL,
	s_id INT NOT NULL,
	PRIMARY KEY (sec_id, c_id, ts_id, i_id, semester, year, s_id),
	FOREIGN KEY (s_id) REFERENCES Student(s_id),
	FOREIGN KEY (sec_id, c_id, ts_id, i_id, semester, year) REFERENCES Section(sec_id, c_id, ts_id, i_id, semester, year)
);


CREATE TABLE Prereq (
	c_id INT PRIMARY KEY,
	title VARCHAR(255) NOT NULL,
	credits INT NOT NULL
);

