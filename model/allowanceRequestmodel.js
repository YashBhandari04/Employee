import mongoose from "mongoose";

const allowanceRequestSchema = mongoose.Schema({
    user:{
        type: String,
        required: true
    },

    amount:{
        type: Number,
        required: true
    },

    date:{
        type: Date,
        default: Date.now
    },

    description:{
        type: String
    },

    status:{
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
});

const allowanceRequest = mongoose.model("allowanceRequest", allowanceRequestSchema);

export default allowanceRequest;