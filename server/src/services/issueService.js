import Issue from '../models/Issue.js';

export async function createIssue({societyId,reporterId,unitId,category,description}) {
    const issue = await Issue.create({societyId,reporterId,unitId,category,description});    
    return issue;
}

export async function getIssues({userId,role,societyId}){
    const filter = {societyId};
    if(role==='resident'){
        filter.reporterId = userId;
    }
    const issue = await Issue.find(filter).sort({createdAt:-1});
    return issue;
}

export async function getIssueById({issueId,userId,societyId,role}){
    const issue = await Issue.findById(issueId);
    if(!issue){
        throw new Error('Issue Not Found.')
    }
    if(issue.societyId.toString()!== societyId.toString()){
        throw new Error('Issue Not Found.')
    }
    if(role==='resident' && issue.reporterId.toString() !== userId.toString()){
        throw new Error ('Not Authorized to view this issue.');
    }
    return issue;
}

const ALLOWED_TRANSITIONS = {
    New:{next:'Assigned' , allowedRoles: ['admin']},
    Assigned:{next:'InProgress' , allowedRoles:['staff']},
    InProgress:{next:'Resolved' , allowedRoles:['staff']},
    Resolved:{next:'Closed' , allowedRoles:['resident']},
};

export async function updateIssueStatus({issueId,userId,role,societyId}) {
    const issue = await Issue.findById(issueId);

    if(!issue){
        throw new Error ('Issue Not Found.')
    }
    if(issue.societyId.toString() !== societyId.toString()){
        throw new Error('Issue Not Found.');
    }

    const transition = ALLOWED_TRANSITIONS[issue.status];

    if(!transition){
        throw new Error(`Issue is already in final state : ${issue.status}`);
    }
    if(!transition.allowedRoles.includes(role)){
        throw new Error('Not authorize to perform this transition.');
    }
    if(role==='staff' && issue.assignedStaffId?.toString() !== userId.toString()){
        throw new Error('Only the assigned staff member can update this issue.');
    }
    if(role==='resident' && issue.reporterId.toString() !== userId.toString()){
        throw new Error('Only Reporting Resident can close this issue');
    }

    issue.status = transition.next;
    await issue.save();
    return issue;
}