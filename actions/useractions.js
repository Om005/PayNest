"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDB"
import User from "@/models/User"

export const initiate = async(amount, from_user, to_user, message)=>{
    await connectDb();
    var instance = new Razorpay({ key_id: process.env.NEXT_PUBLIC_KEY_ID, key_secret: process.env.KEY_SECRET })

    
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let rsp = await instance.orders.create(options)
    await Payment.create({oid: rsp.id, amount: amount/100, from_user: from_user ,to_user: to_user, message: message, status: "pending"});

    return rsp;
}