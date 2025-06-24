import mongoose, {model} from "mongoose";

const userShema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    friends: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], default: []},
    razorpay_id: {type: String, default:""},
    razorpay_secret: {type: String, default:""},
    iv: {type: String, default: ""},
    active: {type: Boolean, default: false}

});

export default mongoose.models.User || model("User", userShema);