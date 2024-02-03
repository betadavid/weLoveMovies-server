function errorHandler (error, req, res, next){

    //status defaults to 500 and message to 'something went wrong'
    const {status = 500 , message = "Something went wrong" } = error;
    
    res.status(status).json({error: message});

}

module.exports = errorHandler;