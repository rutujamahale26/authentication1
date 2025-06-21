import jwt from 'jsonwebtoken';

const JWT_SECRET = 'accd_ef';

const verifyToken = (req, res, next) =>{
    let token;
    let authHeader =req.headers.Authorization || req.headers.authorization
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1]

        if(!token){
           return res.status(401).json({message:'No token found, Access denied'})
        }

        try{
            const decode = jwt.verify(token, JWT_SECRET)
            req.user = decode;
            console.log('The user is: ' ,req.user)
            next()
        }catch(error){
            res.status(400).json({
                message: 'Token is not valid'
            })
        }
    }else{
        return res.status(401).json({message:'No token found, Access denied'})
    }
}

export default verifyToken;