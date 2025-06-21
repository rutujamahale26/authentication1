const authRoles = (...allowedRoles) =>{
    return (req, res, next)=>{
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({message:'Access is denied'})
        }
        next();
    }
}

export default authRoles