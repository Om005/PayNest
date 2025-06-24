"use server";

import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto
  .createHash("sha256")
  .update(process.env.ENCRYPTION_SECRET, "utf8")
  .digest();

function encrypt(plainText) {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let data = cipher.update(plainText, "utf8", "hex");
  data += cipher.final("hex");
  return {
    iv: iv.toString("hex"),
    data,
  };
}

function decrypt(cipherHex, ivHex) {
  const iv = Buffer.from(ivHex, "hex");
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let plain = decipher.update(cipherHex, "hex", "utf8");
  plain += decipher.final("utf8");
  return plain;
}

export const initiate = async (amount, from_user, to_user, message) => {
  await connectDb();
  const user = await User.findOne({ email: to_user });
  if (!user) {
    return { success: false, message: "User not found" };
  }
  if (user.active == false) {
    return { success: false, message: "Account is inactive" };
  }
  const secret = decrypt(user.razorpay_secret, user.iv);
  var instance = new Razorpay({ key_id: user.razorpay_id, key_secret: secret });

  let options = {
    amount: Number.parseInt(amount),
    currency: "INR",
  };

  let rsp = await instance.orders.create(options);
  await Payment.create({
    oid: rsp.id,
    amount: amount / 100,
    from_user: from_user,
    to_user: to_user,
    message: message,
    status: "failed",
  });

  return rsp;
};

export const fetchall = async (searchTerm) => {
  try {
    await connectDb();
    const users = await User.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ],
    }).lean();

    return { success: true, data: JSON.parse(JSON.stringify(users)) };
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
};

export const fetchfriend = async (email) => {
  try {
    await connectDb();
    const user = await User.findOne({ email: email }).populate("friends");

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
};

export const getuser = async (email) => {
  try {
    await connectDb();
    const user = await User.findOne({ email: email });

    return { success: true, data: JSON.parse(JSON.stringify(user)) };
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
};

export const addfriend = async (useremail, friend_id) => {
  try {
    await connectDb();
    const user = await User.findOneAndUpdate(
      { email: useremail },
      {
        $addToSet: { friends: friend_id },
      }
    );

    return { success: true, message: "Contact added" };
  } catch (err) {
    console.error("fetchall error:", err);
    return { success: false, message: "Internal Server Error" };
  }
};

export const removefriend = async (useremail, friend_id) => {
  try {
    await connectDb();
    const user = await User.findOneAndUpdate(
      { email: useremail },
      {
        $pull: { friends: new mongoose.Types.ObjectId(friend_id) },
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

export const setcreds = async (email, key_id, key_secret) => {
  try {
    await connectDb();

    const { data: encryptedSecret, iv } = encrypt(key_secret);
    const user = await User.findOneAndUpdate(
      { email: email },
      {
        razorpay_id: key_id,
        razorpay_secret: encryptedSecret,
        iv: iv,
        active: true,
      },
      { new: true }
    );

    return { success: true, message: "Done" };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }
};
export const getcreds = async (email) => {
  try {
    await connectDb();

    const user = await User.findOne({ email: email });
    if (!user) {
      return { success: false, message: "User does not exist" };
    }
    if (user.active == false)
      return { success: true, message: "User is not active" };
    const decryptedSecret = decrypt(user.razorpay_secret, user.iv);

    return {
      success: true,
      id: user.razorpay_id,
      secret: decryptedSecret,
      isactive: user.active,
    };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }
};
export const delcreds = async (email) => {
  try {
    await connectDb();

    const user = await User.findOne({ email: email });
    if (!user) {
      return { success: false, message: "User does not exist" };
    }
    const rsp = await User.findOneAndUpdate(
      { email: email },
      { razorpay_id: "", razorpay_secret: "", active: false }
    );
    return { success: true, message: "Account deactivated" };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }
};

export const updatename = async (email, newname) => {
  try {
    await connectDb();

    const user = await User.findOne({ email: email });
    if (!user) {
      return { success: false, message: "User does not exist" };
    }
    const rsp = await User.findOneAndUpdate(
      { email: email },
      { name: newname }
    );
    return { success: true, message: "Name updated" };
  } catch (err) {
    console.error("Credentials error:", err);
    return { success: false, message: "Internal server error" };
  }
};

export const validateRazorpayCredentials = async (key_id, key_secret) => {
  try {
    const instance = new Razorpay({
      key_id,
      key_secret,
    });

    const orders = await instance.orders.all({ limit: 1 });

    return { valid: true, message: "Credentials are valid" };
  } catch (err) {
    return { valid: false, message: "Invalid credentials", error: err.message };
  }
};

export const getPayments = async (userEmail) => {
  try {
    await connectDb();

    const transactions = await Payment.find({
      $or: [{ from_user: userEmail }, { to_user: userEmail }],
      status: "completed",
    });

    let totalSent = 0;
    let totalReceived = 0;

    for (const tx of transactions) {
      if (tx.from_user === userEmail) {
        totalSent += tx.amount;
      } else if (tx.to_user === userEmail) {
        totalReceived += tx.amount;
      }
    }

    return {
      totalSent,
      totalReceived,
      totalTransactions: transactions.length,
    };
  } catch (err) {
    console.error("getUserPaymentStats error:", err);
    return {
      totalSent: 0,
      totalReceived: 0,
      totalTransactions: 0,
      error: "Internal server error",
    };
  }
};

export const getAllTransactions = async (email) => {
  try {
    await connectDb();

    const transactions = await Payment.find({
      $or: [{ from_user: email }, { to_user: email }],
    });

    return { success: true, data: JSON.parse(JSON.stringify(transactions)) };
  } catch (err) {
    console.error("getUserPaymentStats error:", err);
    return { success: false, message: err.message };
  }
};
