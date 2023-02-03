const Config = require ('../dbFiles/dbConfig');
const SQL = require('mssql');

class Database {
    
    constructor() {
        this.config = Config;
        this.sql = SQL;
        //this.sanitizer = Sanitizer;
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
     * Checks the credentials provided if they match the database.
     * @param email User"s inputted email.
     * @param password Rawtext password of the user.
     */
    authenticateStudent = async(email, password, callback) => {

        try{
            let pool = await this.sql.connect(this.config);
            let data = pool.request().query("SELECT * FROM Student WHERE first_name=" + "'" + email + "'");
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

