module.exports.permit = (...allowed) => {
        
    const isAllowed = role => allowed.indexOf(role) > -1;

    return (req, res, next) => {        
        console.log('Second');

        if( req.user && req.user.role && isAllowed(req.user.role)){
            next();
        }else{
            res.status(403).json({message: "You dont have permission!"});
        }        
    }
    
}