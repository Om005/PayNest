"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDB"
import User from "@/models/User"
import { NextResponse } from "next/server"
import mongoose from "mongoose"

export const initiate = async(amount, from_user, to_user, message)=>{
    await connectDb();
    const user = await User.findOne({email: to_user});
    if(!user){
      return {success: false, message: "User not found"};
    }
    if(user.active==false){
      return {success: false, message: "Account is inactive"};
    }
    var instance = new Razorpay({ key_id: user.razorpay_id, key_secret: user.razorpay_secret })

    
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",
    }

    let rsp = await instance.orders.create(options)
    await Payment.create({oid: rsp.id, amount: amount/100, from_user: from_user ,to_user: to_user, message: message, status: "failed"});

    return rsp;
}



export const fetchall = async (searchTerm) => {
  try {
    await connectDb();
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    }).lean(); // ensures plain objects

    return { success: true, data: JSON.parse(JSON.stringify(users)) }; // ✅ deeply plain
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
};

export const fetchfriend = async(email)=>{
  try {
    await connectDb();
    const user = await User.findOne({email: email}).populate("friends"); // ensures plain objects
  
    return { success: true, data: JSON.parse(JSON.stringify(user)) }; // ✅ deeply plain
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
}

export const addfriend = async(useremail, friend_id)=>{
  try {
    await connectDb();
    const user = await User.findOneAndUpdate({email: useremail}, {
  $addToSet: { friends: friend_id },
})
  
    return { success: true, message: "Contact added" }; // ✅ deeply plain
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
  
}

export const removefriend = async (useremail, friend_id) => {
  try {
    await connectDb();
    const user = await User.findOneAndUpdate(
      { email: useremail },
      {
        $pull: { friends: new mongoose.Types.ObjectId(friend_id) }, // removes friend_id from friends array
      }
    );

    return { success: true, message: "Contact removed" };
  } catch (err) {
    console.error("removefriend error:", err);
    return { success: false, message: "Internal Server Error" };
  }
};

export const getrecent = async (useremail) => {
  try {
    await connectDb();

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const payments = await Payment.find({
      from_user: useremail,
      createdAt: { $gte: twoDaysAgo },
      status: "completed",
    });

    const uniqueEmails = [...new Set(payments.map((p) => p.to_user))];

    const contacts = await User.find({ email: { $in: uniqueEmails } }).lean();

    return { success: true, data: JSON.parse(JSON.stringify(contacts)) };
  } catch (err) {
    console.error("recentcontact error:", err);
    return { success: false, message: "Internal server error" };
  }
};

export const setcreds = async (email, key_id, key_secret)=>{
  try {
    await connectDb();
  
    const user = await User.findOneAndUpdate({email: email}, {razorpay_id: key_id, razorpay_secret: key_secret, active: true});
    
    return { success: true, message: "Done" };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }

}
export const getcreds = async (email)=>{
  try {
    await connectDb();
  
    const user = await User.findOne({email: email});
    if(!user){
      return {success: false, message: "User does not exist"};
    }
    
    return { success: true, id: user.razorpay_id, secret: user.razorpay_secret, isactive: user.active };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }

}
export const delcreds = async (email)=>{
  try {
    await connectDb();
  
    const user = await User.findOne({email: email});
    if(!user){
      return {success: false, message: "User does not exist"};
    }
    const rsp = await User.findOneAndUpdate({email: email}, {razorpay_id: "", razorpay_secret: "", active: false});
    return { success: true, message: "Account deactivated" };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }

}



export const validateRazorpayCredentials = async (key_id, key_secret) => {
  try {
    const instance = new Razorpay({
      key_id,
      key_secret,
    });
    
    // Make a harmless API call
    const orders = await instance.orders.all({ limit: 1 });
    // console.log(orders);  

    // If no error, credentials are valid
    return { valid: true, message: "Credentials are valid" };
  } catch (err) {
    // Credentials are invalid
    return { valid: false, message: "Invalid credentials", error: err.message };
  }
};