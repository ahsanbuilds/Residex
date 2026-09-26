import User from '../models/User.js';
import { generateToken } from '../utils/generateToken.js'; 

export async function registerUser ({name,email,password,societyId}){

const existingUser = await User.findOne({email});
if(existingUser){
    throw new Error('User Already Exists.Log In')
}

const newUser = await User.create({name,email,password,role:'resident',societyId});
newUser.password = undefined;
return newUser;
}

export async function loginUser({email,password}){
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new Error('Invalid Email or Password');
    }

    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        throw new Error('Invalid Email or Password');
    }
    const token = generateToken(user._id,user.role , user.societyId);
    user.password = undefined;
    return {user,token};
}