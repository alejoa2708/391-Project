/*
Materialized view of Courses and Sections
Joins Courses and Sections together
*/
CREATE VIEW CoursesAndSections AS
SELECT C.c_id, C.title, C.credits, C.d_id, S.sec_id, S.ts_id, S.i_id, S.semester, S.year, S.capacity, S.enrolled
FROM Course as C
INNER JOIN Section as S ON C.c_id = S.c_id;

DROP VIEW CoursesAndActions;

/*
Stored procedure that checks a courses capacity based on given course and section
True if available (less than 30), False if full
*/
CREATE PROCEDURE CheckCapacity (@Course INT, @Section INT)
AS
BEGIN
    SELECT 
        CASE 
            WHEN enrolled < 30 THEN 'true'
            ELSE 'false' 
        END AS Available
    FROM 
        CoursesAndSections
    WHERE 
        c_id = @Course AND sec_id = @Section;
END;

DROP PROCEDURE CheckCapacity;

EXEC CheckCapacity 1, 1957;