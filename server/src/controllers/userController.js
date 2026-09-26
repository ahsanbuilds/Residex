import {createStaffUser as createStaff} from '../services/userService.js';

export async function createStaffUser(req,res){
    try {
        const {name , email , password} = req.body;
        const societyId = req.user.societyId;
        const staff = await createStaff({name,email,password,societyId});
        res.status(201).json({success:true , data: staff});
    } catch (error) {
        res.status(400).json({success:false , message:error.message});
    }
}