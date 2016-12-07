'use strict';

var jwt = require('jsonwebtoken');
var jwtSecret = require('../config/config').jwtSecret;

module.exports = {

    authMiddleware: function(app){
        // app.use(version + '/salesperson/refreshToken', this.refreshJwtAuth({secret: refreshJwtSecret}));
    },

    jwtAuth: function(req,res,next){
            if(typeof(req.headers.authorization) == 'undefined'){
                res.status(401).json({
                    result: 'failure',
                    success: 0,
                    error: 1,
                    error_msg: 'Token not provided',
                    statusCode: 401,
                    errorCode: 402
                });
            }
            else{
                var authHeader = req.headers.authorization;
                var token = authHeader.split("Bearer")[1];
                jwt.verify(token, jwtSecret, {ignoreExpiration: true}, function(err, decoded){
                    // console.log(decoded);
                    if(decoded){
                        var currentTime = parseInt((Date.now())*0.001);
                        var diff = currentTime - decoded.exp;
                        if(diff>=0){
                            var token = jwt.sign({id: decoded.id, username: decoded.username, tbl_prefix: decoded.tbl_prefix}, jwtSecret, {expiresIn: 60});
                            res.status(401).json({
                                    err_msg : "Token expired",
                                    result: 'failure',
                                    success: 0,
                                    error: 1,
                                    error_msg: 'Token expired',
                                    refreshToken: token,
                                    statusCode: 401,
                                    errorCode: 401
                            });
                        } else{
                            req.user = decoded;
                            // console.log(req.user);
                            next();
                        }
                    }
                    if(err){
                        console.log(err);
                    }
                });
            }
    }
};
