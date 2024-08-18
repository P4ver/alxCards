const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt

    if(!token) {
        return res.status(401).json({ error: 'No token provided' })
    }

    jwt.verify(token, "my_secret",(err, decoded)=>{
        if (err){
            return res.status(403).json({ error: 'Invalid token' })
        }
        req.user = decoded
        next()
    })
}


module.exports = verifyToken