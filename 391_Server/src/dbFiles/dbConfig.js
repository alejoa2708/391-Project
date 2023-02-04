const config = {
    user: '',       //Has to be changed to your machine 
    password: '',    //Has to be changed to your machine 
    server: '',      //Has to be changed to your machine 
    database: '',    //Has to be changed to your machine 
    options: {
        trustServerCertificate: true,
        trustConnectionL: false,
        enableAirthAbort: true,
        instancename: ''   //Has to be changed to your machine
                                //Name after the / when viewing server properties 
    },
    port: 1433
}

module.exports = config;
