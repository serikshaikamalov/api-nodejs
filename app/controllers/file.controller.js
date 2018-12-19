const constants = require('../../config/constants');
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    //  cb(null, '../static.arabtili.local/uploads/images/')
        cb(null, constants.STATIC_SERVER_PATH +  '/images/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.png');        
    }
})

var upload = multer({ storage: storage });

module.exports = upload;