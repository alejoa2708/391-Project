const express = require('express');
const Router = express.Router;
const bodyParser = require('body-parser');
const json = bodyParser.json;
const urlencoded = bodyParser.urlencoded;
const cors = require('cors');

class API {
    
    constructor(database) {
        
        this.database = database;
        let API_PORT = process.env.PORT || 5000;
        let app = express();
        app.use(urlencoded({ extended: true }));
        app.use(json());

        let router = Router();

        this.handle(router);

        app.use(cors());
        app.use('/', router);

        /* this.database.authenticateStudent('Aaron', 'Alejo', status => {
            //response.json({ success: status });
            console.log(status);
        }); */

        /* dbOperations.getStudents().then(res => {
            console.log(res.recordset);
        }) */


        app.listen(API_PORT, () => console.log(`Listening port ${API_PORT}`));
    }

    /**
     * The primary handler for organizing GET and POST requests.
     * @param router The express router we are using.
     */
    async handle(router) {
        // Blank get response when someone attempts to connect to the API directly.
        router.get('/', this.handleRoot.bind(this));

        //router.post('/register', this.handleRegistration.bind(this));
        router.post('/login', this.handleLogin.bind(this));
        //router.post('/uservalid', this.handleUserValid.bind(this));
        router.post('/getStudents', this.getStudents.bind(this));
    }

    /**
     * Handles the root response when making a GET request directly to the server.
     * @param request The request passed on.
     * @param response The response that we send back to the client/browser/etc.
     */
    handleRoot(request, response) {
        response.json({ response: 'lmao something happened here kek.' });
    }

    /**
     * Check if the credentials are correct and authenticate login.
     * @param request Request body contains the username and password.
     * @param response Response to the client indicating the success status.
     */
    handleLogin(request, response) {
        let body = request.body;
        
        // Check if the request body is valid and if the email/password are valid.
        if (!body || !body.email || !body.password) return;
        
        this.database.authenticateStudent(body.email, body.password).then(res => {
            
            if(res?.recordset.length === 0){ 
                response.json({success: false});
                return
            };
            
            if(body.password !== res?.recordset[0].last_name) {
               //console.log(false);
               response.json({ success: false });
            } else{
               //console.log(true);
               response.json({ success: true });
            }
           
       });

        // Attempt to authenticate and respond with the database status.
        /* this.database.authenticateStudent(body.email, body.password, status => {
            
            response.json({ success: status });
        }); */
    }


        /**
     * Check if the credentials are correct and authenticate login.
     * @param request Request body contains the username and password.
     * @param response Response to the client indicating the success status.
     */
    handleLogin(request, response) {
        let body = request.body;
        
        // Check if the request body is valid and if the email/password are valid.
        if (!body || !body.email || !body.password) return;
        
        this.database.authenticateStudent(body.email, body.password).then(res => {
            
            if(res?.recordset.length === 0){ 
                response.json({success: false});
                return
            };
            
            if(body.password !== res?.recordset[0].last_name) {
               //console.log(false);
               response.json({ success: false });
            } else{
               //console.log(true);
               response.json({ success: true });
            }
           
       });

        // Attempt to authenticate and respond with the database status.
        /* this.database.authenticateStudent(body.email, body.password, status => {
            
            response.json({ success: status });
        }); */
    }

    /**
     * 
     * @param response Response to the client indicating the success status.
     */
    getStudents(request, response) {
        let body = request.body;
            
        this.database.getStudents().then(res => {
            console.log(res);
            response.json(res);
        });
    }
    
}
module.exports = API;