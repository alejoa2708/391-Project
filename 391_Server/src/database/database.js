const Config = require ('../dbFiles/dbConfig');
const SQL = require('mssql');

class Database {
    
    constructor() {
        this.config = Config;
        this.sql = SQL;
    }

    /**
     * Store XML data to Database Warehouse
     * @param {*} transformedData 
     * @returns 
     */
    storeXML = async(transformedData) => {
        //console.log(transformedData.transformedData[0]);
        let ins_id = transformedData.transformedData[0][0];
        let date_id = transformedData.transformedData[0][1];
        let course_id = transformedData.transformedData[0][2];
        try{
            let pool = await this.sql.connect(this.config);
            let success = pool.request().query(`INSERT INTO Fact (ins_id, date_id, course_id) VALUES (${ins_id}, ${date_id}, ${course_id});`);
            return success;
        }
        catch(err){
            console.log(err)
        }
    }

    /**
     * Retrieves filetered courses based on the requested query.
     * @param {*} query 
     * @returns 
     */
    filterCourses = async(query) => {
        try{
            let pool = await this.sql.connect(this.config);
            let course = pool.request().query(query);
            return course;
        }
        catch(err){
            console.log(err)
        }
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
                    
                    if (!capacityStatus) {
                        return { success: false, procedure: "capacity check" };
                    }
                    if (!prereqStatus) {
                        return { success: false, procedure: "pre-requisits check" };
                    }
                    if (!conflictStatus) {
                        return { success: false, procedure: "time conflict check" };
                    }
                    //return false;
                } else {
                    pool.request(transactions).query(`INSERT INTO dbo.Takes VALUES ('${sec_id}', '${c_id}', '${ts_id}', '${i_id}', '${semester}', '${year}', '${s_id}');
                                        UPDATE dbo.Section SET enrolled = enrolled + 1 WHERE sec_id = ${sec_id} AND c_id = ${c_id};`);
                    await transactions.commit();
                    return { success: true };
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
                        FROM dbo.Course as C, dbo.Section as S, dbo.Timeslot as TS 
                        WHERE C.c_id = S.c_id AND S.ts_id = TS.ts_id;
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
                        SELECT T.sec_id, T.i_id, T.c_id, C.title, T.semester, T.year, T.s_id, S.first_name, S.last_name, TS.start_time, TS.end_time
                        FROM dbo.Takes as T, dbo.Student as S, dbo.Section as SC, dbo.Timeslot as TS, dbo.Course as C
                        WHERE T.s_id = S.s_id AND SC.sec_id = T.sec_id AND TS.ts_id = T.ts_id AND C.c_id = T.c_id;
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

    /**
     * Course names getter
     * @returns course information
     */
    getCoursesName = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT distinct Cname
                        FROM dbo.Course
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
     * Course departments getter
     * @returns course information
     */
    getCoursesDepartment = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT distinct dept
                        FROM dbo.Course
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
     * Date years getter 
     * @returns course information
     */
    getDateYear = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT distinct year
                        FROM dbo.Date
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
     * Instructor departments getter
     * @returns course information
     */
    getInstructorDepartment = async() => {
        try{
            let pool = await this.sql.connect(this.config);
            var query = `
                        SELECT distinct dept
                        FROM dbo.Instructor
                        `
            let course = pool.request().query(query);
            //console.log(course);
            return course;
        }
        catch(err){
            console.log(err)
        }
    }
}
module.exports = Database;

