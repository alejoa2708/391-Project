/* Checks for all the courses student 42 is currently enrolled in*/
select * 
from takes as t, section as s
where t.s_id = 42 and s.sec_id = t.sec_id;


SELECT C.c_id, C.title, C.d_id, S.sec_id, S.i_id, S.semester, S.year, S.ts_id, TS.start_time, TS.end_time 
FROM dbo.Course as C, dbo.Section as S, dbo.Timeslot as TS, dbo.Takes as T 
where T.s_id = 42 and S.sec_id = 3772 and C.c_id = 2;

CREATE PROCEDURE CheckTaken(@student INT, @Section INT, @Instructor INT, @Takes INT, @Year INT, @Semester CHAR(3), @Start TIME, @End TIME) 
AS
BEGIN
	IF (select count(*) from 
		takes as t, section as s
		WHERE s.sec_id = @Section and t.s_id = @student and t.semester = @Semester and 
        t.i_id = @Instructor and t.ts_id = @Takes and  t.year = @Year and ts.start_time = @Start 
        and  ts.end_time = @End) > 0
	BEGIN
		SELECT 'true' as result
	END
	ELSE
	BEGIN
		SELECT 'false' as result
	END
END;

DROP PROCEDURE CheckTaken; 

/* In this test case, we are trying to check if student s_id 42 is already enrolled in Course c_id 2 Section sec_id 3772
Instructor i_id 10 in WIN 2020 at 08:00 - 09:00*/
EXEC CheckTaken 42, 3772, 214, 10, 2020, 'WIN', '08:00:00.0000000', '09:00:00.0000000';