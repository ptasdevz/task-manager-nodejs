const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(500).json({msg:`an internal error has occured.`});
}
module.exports = errorHandlerMiddleware;