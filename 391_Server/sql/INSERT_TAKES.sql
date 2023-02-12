/*Inserts some specific students to test on & Inserts some students in bulk to courses that have no
pre-reqs. I also added some lines that will no matter what edit these specific courses so that it will always have 
the same pre-req*/


/*Randomize the p_id so courses will have different nums than c_id*/
DECLARE @x int = 0
WHILE @x <= 1000 
BEGIN
    SET @x = @x + 1
    UPDATE Prereq
	SET p_id = (rand()*1001)
	WHERE c_id = @x;
END



/*Insert single student - Joy Johnson  -> Course:16*/
INSERT INTO Takes VALUES('1','16','4','593','FAL','2023','13');
UPDATE Section
SET enrolled = enrolled + 1
WHERE sec_id = 1 AND c_id = 16;
UPDATE Prereq
SET p_id = -1
WHERE c_id = 16;

/*Insert single student - Benjamin Daniells  -> Course:234*/
INSERT INTO Takes VALUES('4','234','8','107','FAL','2021','11');
UPDATE Section
SET enrolled = enrolled + 1
WHERE sec_id = 4 AND c_id = 234;
UPDATE Prereq
SET p_id = -1
WHERE c_id = 234;

/*Insert single student - Wendy Morgan -> Course:743*/
INSERT INTO Takes VALUES('8','743','1','528','WIN','2023','5');
UPDATE Section
SET enrolled = enrolled + 1
WHERE sec_id = 8 AND c_id = 743;
UPDATE Prereq
SET p_id = -1
WHERE c_id = 743;

/*Insert single student - George Isaac -> Course:831*/
INSERT INTO Takes VALUES('108','831','6','909','FAL','2023','42');
UPDATE Section
SET enrolled = enrolled + 1
WHERE sec_id = 108 AND c_id = 831;
UPDATE Prereq
SET p_id = -1
WHERE c_id = 831;

/*Make class have no pre-req*/
UPDATE Prereq
SET p_id = -1
WHERE c_id = 555;


DECLARE @i int = 0
WHILE @i <= 28 
BEGIN
    SET @i = @i + 1
    INSERT INTO Takes VALUES('1','16','4','593','FAL','2023',@i+20);
	UPDATE Section
	SET enrolled = enrolled + 1
	WHERE sec_id = 1 AND c_id = 16;
END

/*Creates a class Room thats full 30/30*/
DECLARE @a int = 0
WHILE @a <= 28 
BEGIN
    SET @a = @a + 1
    INSERT INTO Takes VALUES('8','743','1','528','WIN','2023',@a+700);
	UPDATE Section
	SET enrolled = enrolled + 1
	WHERE sec_id = 8 AND c_id = 743;
END


/*Creates a class Room thats almost full 29/30*/
DECLARE @c int = 0
WHILE @c <= 28 
BEGIN
    SET @c = @c + 1
    INSERT INTO Takes VALUES('5','555','12','642','WIN','2023',@c+900);
	UPDATE Section
	SET enrolled = enrolled + 1
	WHERE sec_id = 5 AND c_id = 555;
END


/*Make class have pre-req to students who have taken class 243 - Students should be enrolled in this class 243 - Course:1 pre-req Course: 243*/
UPDATE Prereq
SET p_id = 243
WHERE c_id = 1;

/*Make class (2) have pre-req to students who have taken class (16) - Students should be enrolled in this class 16 - Course:2 pre-req Course: 16*/
UPDATE Prereq
SET p_id = 16
WHERE c_id = 2;

/*Make class (3) have pre-req to students who have taken class (555) - Students should be enrolled in this class 555 - Course:3 pre-req Course: 555*/
UPDATE Prereq
SET p_id = 555
WHERE c_id = 3;

/*Make class (6) have pre-req to students who have taken class (831) - Students should be enrolled in this class 831 - Course:6 pre-req Course: 831*/
UPDATE Prereq
SET p_id = 831
WHERE c_id = 6;