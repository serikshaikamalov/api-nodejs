const isDebug = true;

let constants = {    
    STATIC_SERVER_HTTP: 'http://localhost:4001',
    STATIC_SERVER_PATH: '../static.arabtili.local/uploads',
    IMAGE_PATH : '/images/',
    IMAGE_FORMAT: 'png',
    JWT_SECRET: 'Arabtili.kz'
} 

// Production
if( isDebug == false ){
    constants.STATIC_SERVER_HTTP = 'http://static.arabtili.kz';
    constants.STATIC_SERVER_PATH = '../static.arabtili.local/uploads';
}

module.exports = constants;