import mongoose from 'mongoose';

const unitSchema = new mongoose.Schema ({
    societyId: {type:mongoose.Schema.Types.ObjectId , ref:'Society', required:true},
    unitNumber: {type:String, required:true, },
},
{timestamps:true});

export default mongoose.model('Unit', unitSchema);