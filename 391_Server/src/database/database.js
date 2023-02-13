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
     * @param s_id student ID
     * @param c_id Course ID
     * @returns 
     */
    enrollStudent = async(s_id, c_id, sec_id, semester, year, start, end) => {
        try{
            let pool = await this.sql.connect(this.config);
            let capProc = pool.request().query(`EXEC CheckCapacity '${s_id}', '${sec_id}'`);
            let prereqProc = pool.request().query(`EXEC CheckPrereq '${s_id}', '${c_id}'`);
            let conflictProc = pool.request().query(`EXEC CheckTimeConflict '${s_id}', '${semester}', '${year}', '${start}', '${end}'`);

            // If everything passes/true
            if (capProc || prereqProc || conflictProc) {
                // run transactions in this line...
                // run INSERT STUDENT query here...
                return true;
            }
            return false;
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
                        FROM Course as C, Depasrtment as D
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
            let course = pool.request().query("SELECT * FROM dbo.Course");
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

