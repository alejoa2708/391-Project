const config = {
    user: 'tadrosv',       //Has to be changed to your machine 
    password: 'santander515',    //Has to be changed to your machine 
    server: 'DESKTOP-DMB6OF8',      //Has to be changed to your machine 
    database: '391',    //Has to be changed to your machine 
    options: {
        trustServerCertificate: true,
        trustConnectionL: false,
        enableAirthAbort: true,
        instancename: 'victo'   //Has to be changed to your machine
                                //Name after the / when viewing server properties 
    },
    port: 1433
}

module.exports = config;