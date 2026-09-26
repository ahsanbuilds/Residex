import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    societyId:{type:mongoose.Schema.Types.ObjectId , ref:'Society' , required:true},
    reporterId:{type:mongoose.Schema.Types.ObjectId, ref:'User' , required:true},
    unitId:{type:mongoose.Schema.Types.ObjectId , ref:'Unit' , required:true},
    assignedStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    category:{type: String ,
        enum:['Plumbing' , 'Electrical', 'Water', 'Drainage', 'Garbage','StreetLight', 'Security' , 'Cleaning', 'Other'],
        required:true,
    },

    description:{type:String , required:true},
    status:{type:String,
        enum:['New','Assigned','InProgress','Resolved', 'Closed'],
        default:'New',
    },
    }, {timestamps:true});

export default mongoose.model('Issue', issueSchema);