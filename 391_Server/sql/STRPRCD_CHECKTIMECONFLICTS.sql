/*
Materialized view of Students, Takes, and Timeslot
*/
CREATE VIEW StudentsAndCourses AS
SELECT S.s_id, S.first_name, S.last_name, S.gender, T.sec_id, T.c_id, T.ts_id, T.i_id, T.semester, T.year, TS.start_time, TS.end_time
FROM Student as S
JOIN Takes as T ON S.s_id = T.s_id
JOIN Timeslot as TS ON TS.ts_id = T.ts_id;

SELECT *
FROM StudentsAndCourses;

DROP VIEW StudentsAndCourses;


/*
Stored procedure that checks if a given student, semester, and year has a class during the
given start and end times
True is available (no conflicts), False if it given times overlap
*/
CREATE PROCEDURE CheckTimeConflict(@Student INT, @Semester VARCHAR(255), @Year INT, @Start VARCHAR(255), @End VARCHAR(255))
AS
BEGIN
    SELECT
        CASE
            WHEN MIN(
                CASE
                    WHEN ((@Start >= Dates.start_time AND @Start < Dates.end_time) OR
                            (@End > Dates.start_time AND @End <= Dates.end_time)) THEN 'FALSE'
                    ELSE 'TRUE'
                END) = 'FALSE' THEN 'FALSE'
            ELSE 'TRUE'
        END AS Result
    FROM (SELECT *
		FROM StudentsAndCourses
        WHERE s_id = @Student AND semester = @Semester AND year = @Year) as Dates;
END;

DROP PROCEDURE CheckTimeConflict;

EXEC CheckTimeConflict 1, 'FAL', 2022, '09:00', '11:00';