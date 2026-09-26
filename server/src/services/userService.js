import User from '../models/User.js';

export async function createStaffUser({name,email,password,societyId}){
    const existingStaff = await User.findOne({email});
    if(existingStaff){
        throw new Error('User Already Exists.');
    }
    const newUser = await User.create({name,email,password,role:'staff' ,societyId});
    newUser.password=undefined;
    return newUser;
}