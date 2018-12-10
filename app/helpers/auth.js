module.exports = {
    ensureAuthenticated: function( req, res, next ){
        if( req.isAuthenticated() ){
            return next();
        }

        res.send({ 'message': 'Not authenticated' });
    }
}