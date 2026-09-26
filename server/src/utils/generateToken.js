import jwt from 'jsonwebtoken';

export function generateToken(userId,role,societyId){
    return jwt.sign(
        {userId, role , societyId},
        process.env.JWT_SECRET,
        {expiresIn:'7d'}
    );
}