const Config = require ('../dbFiles/dbConfig');
const SQL = require('mssql');

class Database {
    
    constructor() {
        this.config = Config;
        this.sql = SQL;
        //this.sanitizer = Sanitizer;
    }

    /**
     * Performs student enrolment with implementation of SQL procedures, views, and trasactions.
     * @param s_id Student ID
     * @param c_id Course ID
     * @param sec_id Section ID
     * @param semester 
     * @param year 
     * @param start Course start time
     * @param end Course end time
     * @returns a list of promises returned by the queries
     */
    enrollStudent = async(s_id, c_id, sec_id, semester, year, start, end, ts_id, i_id) => {
            
        try{
            let capacityStatus;
            let prereqStatus;
            let conflictStatus;
            let pool = await this.sql.connect(this.config);
            let capProc = pool.request().query(`EXEC CheckCapacity ${c_id}, ${sec_id};`);
            let res = await capProc;
            capacityStatus = JSON.parse(res.recordset[0].Available);

            let prereqProc = pool.request().query(`EXEC CheckPrereq ${s_id}, ${c_id};`);
            let res1 = await prereqProc;
            prereqStatus = JSON.parse(res1.recordset[0].result);

            let conflictProc = pool.request().query(`EXEC CheckTimeConflict ${s_id}, '${semester}', ${year}, '${start}', '${end}';`);
            let res2 = await conflictProc;
            conflictStatus = JSON.parse(res2.recordset[0].Result);

            console.log(capacityStatus && prereqStatus && conflictStatus);

            var transactions = new this.sql.Transaction()       //Transaction class to ensure transaction occurs
            await transactions.begin();
            try {
                if (!(capacityStatus && prereqStatus && conflictStatus)) {
                    return false;
                } else {
                    pool.request(transactions).query(`INSERT INTO dbo.Takes VALUES ('${sec_id}', '${c_id}', '${ts_id}', '${i_id}', '${semester}', '${year}', '${s_id}');
                                        UPDATE dbo.Section SET enrolled = enrolled + 1 WHERE sec_id = ${sec_id} AND c_id = ${c_id};`);
                    await transactions.commit();
                    return true;
                } 
            } catch (error) {
                await transactions.rollback();
                console.log(error)
            }

            //return Promise.all([capProc, prereqProc, conflictProc]);
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Course info getter by department
     * @returns course information
     */
    filterCoursesByDept = async(first, last) => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT title as c_name, d_name, credits, c_id, D.d_id
                        FROM Course as C, Department as D
                        WHERE C.d_id = D.d_id AND D.d_id = %` + first + `%;
                        `
            let course = pool.request().query(query);
            //console.log(course)
            return course;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Course info getter. 
     * @returns course information
     */
    getCourses = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT C.c_id, C.title, C.d_id, S.sec_id, S.i_id, S.semester, S.year, S.ts_id, TS.start_time, TS.end_time 
                        FROM dbo.Course as C 
                        JOIN dbo.Section as S ON C.c_id = S.c_id 
                        JOIN dbo.Timeslot as TS ON S.ts_id = TS.ts_id;
                        `
            let course = pool.request().query(query);
            //console.log(course);
            return course;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * 
     * @returns 
     */
    getStudentsTakenCourses = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT distinct S.s_id, S.first_name, S.last_name, SC.sec_id, SC.i_id, SC.semester, SC.year, SC.ts_id 
                        FROM dbo.Student as S 
                        JOIN dbo.Section as SC ON S.s_id = SC.sec_id 
                        JOIN dbo.Course as C ON C.c_id = SC.c_id
                        JOIN dbo.Takes as T ON T.sec_id = SC.sec_id;
                        `
            let course = pool.request().query(query);
            //console.log(course);
            return course;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Department info getter. 
     * @returns department information
     */
    getDepartments = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            let department = pool.request().query("SELECT * FROM dbo.Department");
            //console.log(department);
            return department;
        }
        catch(err){
            console.log(err)
        }
    }
   
    /**
     * Student info getter. 
     * @returns student information
     */
    getStudents = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            let student = pool.request().query("SELECT * FROM dbo.Student");
            //console.log(student);
            return student;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Student info getter. 
     * @returns student information
     */
    filterStudentsFirstLast = async(first, last) => {
        try{
            let pool = await this.sql.connect(this.config);
            let student = pool.request().query("SELECT * FROM dbo.Student WHERE first_name LIKE '%" + first + "%' AND last_name LIKE '%" + last + "%'");
            console.log(student)
            return student;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Checks the credentials provided if they match the database.
     * @param email User"s inputted email.
     * @param password Rawtext password of the user.
     */
    authenticateStudent = async(email, password, callback) => {

        try{
            let pool = await this.sql.connect(this.config);
            let data = pool.request().query(`SELECT * FROM Student WHERE first_name='${email}'`);

            console.log(data);
            

            return data;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Close the connection.
     */
    close() {
        if (this.connection) this.connection.end();
    }
}
module.exports = Database;

