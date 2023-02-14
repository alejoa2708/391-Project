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
IF (SELECT COUNT(*) as Valid
				FROM StudentsAndCourses
				WHERE s_id = 42 
				AND c_id = (SELECT p_id
							FROM Prereq
							WHERE c_id = 16)) > 0
BEGIN
	SELECT 'True' as result
END
ELSE IF (SELECT p_id FROM Prereq Where c_id = 16) = -1
BEGIN
	SELECT 'True' as result
END
ELSE
BEGIN
	SELECT 'False' as result
END;


/*
Stored procedure that checks if a given student has the prereq for a given course
True is valid (has prereqs), True if course doesnt need prereqs, False if no prereqs for chosen course
*/
CREATE PROCEDURE CheckPrereq(@Student INT, @Course INT)
AS
BEGIN
	IF (SELECT COUNT(*) as Valid
				FROM StudentsAndCourses
				WHERE s_id = @Student 
				AND c_id = (SELECT p_id
							FROM Prereq
							WHERE c_id = @Course)) > 0
	BEGIN
		SELECT 'True' as result
	END
	ELSE IF (SELECT p_id FROM Prereq Where c_id = @Course) = -1
	BEGIN
		SELECT 'True' as result
	END
	ELSE
	BEGIN
		SELECT 'False' as result
	END;
END;

DROP PROCEDURE CheckPrereq;

/* Sample execution --> 182, 2, 6 should be true */
EXEC CheckPrereq 42, 182;