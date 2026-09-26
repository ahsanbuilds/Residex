import jwt from 'jsonwebtoken';

export function protect(req,res,next){

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({success : false , message : 'Not authorized. No Token.'});
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } 
    catch (error) {
        return res.status(401).json({success: false , message:'Not Authorized. Invalid Token.'});
    }
}

export function authorize (...allowedRoles){
    return function (req,res,next){
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({success:false , message:'ForBidden : Insufficient Permissions.'});
        }
        next();
    };
}