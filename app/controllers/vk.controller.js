const request = require('request');

exports.getCode = (req, res, next) => { 


    // 1. Step
    var url = 'https://oauth.vk.com/authorize?response_type=code&redirect_uri=http://localhost:4000/vk&scope=email&client_id=6783191';

    
    request(url, { json: true}, (err, res, body)=>{});


    
    console.log('Req param: ', req.query.code);

    const code = req.query.code;

    // if(!code){
    //     res.status(401).json('Not Authorized');
    // }

    if( code ){
        redirectUrl = 'https://oauth.vk.com/access_token?client_id=6783191' + 
                    '&client_secret=tr8f5vvEIB97fBD5HZFZ&redirect_uri=http://localhost:4000/vk' +
                    '&code=' + code

        request(redirectUrl , { json: true }, (err, res, body) => {
            if (err) { return console.log('ERR:', err); }
            console.log('RESS: ', res.body);            

            const token = res.body.access_token;

            console.log('Token:', token)

            if( token ){
                
                // Save token

                // Register User

                // Login User
                
            }
        });

        res.status(200).json('Succeses login via VK');

    }
        

    // res.status(200).json('token')
}


exports.getToken = (req, res, next) => { 
    
    console.log('REQ: params: ', req.params);

    res.status(200).json('token')
}
