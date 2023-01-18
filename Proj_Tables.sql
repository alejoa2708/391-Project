CREATE TABLE College (
    id INT PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE Department (
    id INT PRIMARY KEY,
    college_id INT,
    head_id INT,
    FOREIGN KEY (college_id) REFERENCES College(id),
    FOREIGN KEY (head_id) REFERENCES Instructor(head_id)
);

CREATE TABLE Instructor (
    id INT PRIMARY KEY,
	head_id INT,
    name VARCHAR(255),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department(id)
);

CREATE TABLE Course (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    department_id INT,
    instructor_id INT,
	capacity INT,
    FOREIGN KEY (department_id) REFERENCES Department(id),
    FOREIGN KEY (instructor_id) REFERENCES Instructor(id)
);

CREATE TABLE Student (
	id INT PRIMARY KEY,
    first_name VARCHAR(255),
	last_name VARCHAR(255),
	gender VARCHAR(255)
); 

CREATE TABLE Enrollment (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student(id),
    FOREIGN KEY (course_id) REFERENCES Course(id)
);
