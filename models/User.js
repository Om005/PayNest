import mongoose, {model} from "mongoose";

const userShema = new mongoose.Schema({
    email: {type: String, required: true},
    username: {type: String, required: true},
    name: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
});

export default mongoose.models.User || model("User", userShema);