const   express = require('express'),
        dbOperations = require('./dbFiles/dpOperation'),
        Student = require('./dbFiles/student'),
        cors = require('cors');

const API_PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

dbOperations.getStudents().then(res => {
    console.log(res.recordset);
})


app.listen(API_PORT, () => console.log(`Listening port ${API_PORT}`));

//To start or test, run "npm run server" into the terminal