Drop table Fact;
Drop table Course;
Drop table Instructor;
Drop table Date;

CREATE TABLE Date (
	date_id INT PRIMARY KEY,
	semester CHAR(3) NOT NULL,
	year INT NOT NULL,
);

CREATE TABLE Instructor (
	ins_id INT PRIMARY KEY,
	Fname CHAR(20) NOT NULL,
    Lname CHAR(20) NOT NULL,
    title CHAR(20) NOT NULL,
    dept  CHAR(20) NOT NULL,
    gender CHAR(1) NOT NULL,
);

CREATE TABLE Course (
	course_id INT PRIMARY KEY,
	Cname     CHAR(10) NOT NULL,
	dept      CHAR(20) NOT NULL,
    credits   INT NOT NULL
);

CREATE TABLE Fact (
    ins_id INT NOT NULL,
    date_id INT NOT NULL,
    course_id INT NOT NULL,
    FOREIGN KEY (ins_id) REFERENCES Instructor(ins_id),
    FOREIGN KEY (date_id) REFERENCES Date(date_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);
