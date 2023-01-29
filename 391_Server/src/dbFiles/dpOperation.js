const config = require ('./dbConfig'),
      sql = require('mssql');


/**
 * 
 * @returns 
 */
const getStudents = async() => {
    try{
        let pool = await sql.connect(config);
        let student = pool.request().query("SELECT * from dbo.Student WHERE first_name='Aaron'")
        console.log(student);
        return student;
    }
    catch(err){
        console.log(err)
    }
}

/**
 * 
 * @param {*} Student 
 * @returns 
 */
const insertStudent = async(Student) => {
    try{
        let pool = await sql.connect(config);
        let student = pool.request()
        .query(`INSERT INTO dbo.Student VALUES
        (${Student.s_id},'${Student.last_name}','${Student.first_name}','${Student.gender}')
        `)
        console.log(student);
        return student;
    }
    catch(err){
        console.log(err)
    }
}


module.exports = {
    getStudents,
    insertStudent
}