import mongoose, { model } from "mongoose";

const paymentSchema = new mongoose.Schema({
    from_user: {type: String, required: true},
    to_user: {type: String, required: true},
    oid: {type: String, required: true},
    message: {type: String},
    amount: {type: Number, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    status: { type: String, enum: ["completed","pending","failed"], default: "pending" },
});

export default mongoose.models.Payment || model("Payment", paymentSchema);