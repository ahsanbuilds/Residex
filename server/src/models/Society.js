import mongoose from "mongoose";

const societySchema = new mongoose.Schema ({
    name: {type: String , required : true},
    address: {type:String , required:true},
},
{timestamps:true});

export default mongoose.model('Society', societySchema);