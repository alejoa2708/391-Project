Select *
FROM CoursesAndSections;

SELECT *
FROM StudentsAndCourses
WHERE s_id = 42 AND c_id = 16;

SELECT *
FROM Prereq
WHERE p_id = 831;

/*
We want to enroll in c_id=2 and it has a p_id=16
We need to check if p_id=16 is a c_id in s_id=42
Use materialized view already created --> 'StudentsAndCourses'
*/
SELECT
CASE
	WHEN
	(SELECT COUNT(*) as Valid
	FROM StudentsAndCourses
	WHERE s_id = 42 
	AND c_id = (SELECT p_id
				FROM Prereq
				WHERE c_id = 2)) > 0 THEN 'True'
	ELSE 'False'
END AS result;


/*
Stored procedure that checks if a given student has the prereq for a given course
True is valid (has prereqs), False if no prereqs for chosen course
*/
CREATE PROCEDURE CheckPrereq(@Student INT, @Course INT)
AS
BEGIN
	SELECT
		CASE
			WHEN
				(SELECT COUNT(*) as Valid
				FROM StudentsAndCourses
				WHERE s_id = @Student 
				AND c_id = (SELECT p_id
							FROM Prereq
							WHERE c_id = @Course)) > 0 THEN 'True'
			ELSE 'False'
		END AS result
END;

DROP PROCEDURE CheckPrereq;

/* Sample execution --> 182, 2, 6 should be true */
EXEC CheckPrereq 42, 182;