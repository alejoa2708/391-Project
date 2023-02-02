const Config = require ('../dbFiles/dbConfig');
const SQL = require('mssql');
//const Sanitizer = require('sanitizer');

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
            let student = pool.request().query("SELECT * from Student");
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
            /* if (data.length === 0) return callback?.(false);

            // There can only be one user, so grab the first one.
            //let user = data.shift();
            
            // Compares inputted password to the from DB.
            if(password !== data?.last_name) {
                return callback?.(false);
              }
            return callback?.(true); */
            //return student;
        }
        catch(err){
            console.log(err)
        }

        // Get all users with the specified email.
        /* let pool = await this.sql.connect(this.config);
        pool.request().query("SELECT * FROM Student WHERE first_name=" + "'" + email + "'", (results) => {
            let data = results;
            console.log(data);
            // No users found, return false to the callback.
            if (data.length === 0) return callback?.(false);

            // There can only be one user, so grab the first one.
            //let user = data.shift();

            // Compares inputted password to the from DB.
            if(password !== data?.last_name) {
                return callback?.(false);
              }
              callback?.(true);
              
        }); */
    }
    

    /* query(queryString, callback) {
        try {
            this.create();
    
            if (this.connection) {
                this.connection.query(this.sanitizer.sanitize(queryString), (error, results, fields) => {
                    if (error) throw error;
                    if (callback) callback(results, fields);
                });
            }
            this.close();
        } catch (error) {
            console.log(error);
        }
    } */
    

    /**
     * Close the connection.
     */
    close() {
        if (this.connection) this.connection.end();
    }
}
module.exports = Database;

