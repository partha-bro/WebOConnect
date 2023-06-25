import jwt from 'jsonwebtoken'
import CustomError from '../errors/customError.js'

const auth = (req,res,next) => {
    const authToken = req.headers.authorization

    if(authToken && authToken.startsWith('Bearer ')){
        const token = authToken.split(' ')[1]
        const user = jwt.verify(token,process.env.JWT_SECERET)
        res.user = user
        next()
    }else{
        throw new CustomError(500, 'json web token is not valid')
    }
}

export default auth