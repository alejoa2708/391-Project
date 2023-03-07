
DECLARE @i INT = 1;
WHILE (@i <= 900)
BEGIN
    DECLARE @ins_id INT = FLOOR(RAND()*(1000-1+1)+1);
    DECLARE @date_id INT = FLOOR(RAND()*(136-1+1)+1);
    DECLARE @course_id INT = FLOOR(RAND()*(1000-1+1)+1);

    INSERT INTO Fact (ins_id, date_id, course_id) VALUES (@ins_id, @date_id, @course_id);

    SET @i = @i + 1;
END


-- Use this code to remove any dups if they exist
WITH CTE AS (
    SELECT ins_id, date_id, course_id,
        ROW_NUMBER() OVER (PARTITION BY ins_id, date_id, course_id ORDER BY (SELECT NULL)) AS RowNumber
    FROM fact
)
DELETE FROM CTE WHERE RowNumber > 1;
