const config = {
    user: 'test',       //Has to be changed to your machine 
    password: 'foo',    //Has to be changed to your machine 
    server: 'DOM',      //Has to be changed to your machine 
    database: '391',    //Has to be changed to your machine 
    options: {
        trustServerCertificate: true,
        trustConnectionL: false,
        enableAirthAbort: true,
        instancename: 'Aero4'   //Has to be changed to your machine
                                //Name after the / when viewing server properties 
    },
    port: 1433
}

module.exports = config;