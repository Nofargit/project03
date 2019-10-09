// const jwt = require('jsonwebtoken')
function varifyToken(req, res, next)
{
    const bearerHeader = req.headers['authorization']
    console.log(bearerHeader)
    if(bearerHeader)
    {
        alert('verified')
        next()
    }
// next()
}

// export default varifyToken

module.exports={varifyToken}