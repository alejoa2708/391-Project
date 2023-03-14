Drop table Fact;
Drop table Course;
Drop table Instructor;
Drop table Date;

CREATE TABLE Date (
	date_id INT PRIMARY KEY,
	semester CHAR(3),
	year INT,
);

CREATE TABLE Instructor (
	ins_id INT PRIMARY KEY,
	Fname CHAR(20),
    Lname CHAR(20),
    title CHAR(20),
    dept  CHAR(20),
    gender CHAR(1),
);

CREATE TABLE Course (
	course_id INT PRIMARY KEY,
	Cname     CHAR(10),
	dept      CHAR(20),
    credits   INT
);

CREATE TABLE Fact (
    ins_id INT NOT NULL,
    date_id INT NOT NULL,
    course_id INT NOT NULL,
    count INT DEFAULT 1,
    FOREIGN KEY (ins_id) REFERENCES Instructor(ins_id),
    FOREIGN KEY (date_id) REFERENCES Date(date_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
