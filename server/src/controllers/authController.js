import {registerUser , loginUser} from '../services/authService.js';

export async function register(req,res){
    try {
        const newUser = await registerUser(req.body);
        res.status(201).json ({success:true , data:newUser});
    } catch (error) {
        res.status(400).json({success:false , message:error.message});
    }
}

export async function login(req,res){
    try {
        const {user,token} = await loginUser(req.body);
        res.cookie('token',token, {
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            sameSite:'strict',
            maxAge: 7*24*60*60*1000,
        });
        res.status(200).json({success:true , data:user});
    } catch (error) {
        res.status(400).json({success:false , message:error.message});
    }
}

export function getMe(req,res){
    res.status(200).json({success:true , data:req.user});
}