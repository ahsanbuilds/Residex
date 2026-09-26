import {createIssue as createIssueService} from '../services/issueService.js';
import {getIssues as getIssueService} from '../services/issueService.js';
import { getIssueById as getIssueByIdService } from '../services/issueService.js';
import { updateIssueStatus as updateIssueStatusService } from '../services/issueService.js';

export async function createIssue(req , res) {
    try {
        const {unitId,category,description} = req.body;
        const reporterId = req.user.userId;
        const societyId = req.user.societyId;
        const issue = await createIssueService({societyId,reporterId,unitId,category,description});
        res.status(201).json({success:true , data:issue});
    } 
    catch (error) {
        res.status(400).json({success:false , message: error.message});
    }
}

export async function getIssues(req,res){
    try{
        const{userId,role,societyId}=req.user;
        const issues = await getIssueService({userId,role,societyId});
        res.status(200).json({success:true , data:issues});
    }
    catch(error){
        res.status(400).json({success:false , message: error.message});
    }
}

export async function getIssueById(req,res){
    try{
        const issueId = req.params.id;
        const {userId,role,societyId} = req.user;
        const issue = await getIssueByIdService({issueId,userId,role,societyId});
        res.status(200).json({success:true , data:issue});
    }
    catch(error){
        res.status(404).json({success:false , message:error.message});
    }
}

export async function updateIssueStatus(req,res){
    try {
        const issueId = req.params.id;
        const {userId,role,societyId} =req.user;
        const issue = await updateIssueStatusService({issueId,userId,role,societyId});
        res.status(200).json({success:true , data:issue});
    } 
    catch (error) {
        res.status(404).json({success:false, message:error.message});
    }
}