import { registerUser, loginUser, getCurrentUser } from '../services/authService.js';

export async function register(req, res) {
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json({ success: true, data: newUser });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function login(req, res) {
    try {
        const { user, token } = await loginUser(req.body);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

export async function getMe(req, res) {
    try {
        const currUser = await getCurrentUser(req.user.userId);
        res.status(200).json({ success: true, data: currUser });
    }
    catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

export function logout(req,res){
    res.clearCookie('token' , {
        httpOnly:true,
        secure:process.env.NODE_ENV==='production',
        sameSite:'strict',
    });
    res.status(200).json({success:true , message:'Logged Out'});
}