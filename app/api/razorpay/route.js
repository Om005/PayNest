import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import Razorpay from "razorpay";
import connectDb from "@/db/connectDB";


export const POST = async(req)=>{
    await connectDb();
    let body = await req.formData();
    body = Object.fromEntries(body);

    let p = Payment.findOne({oid: body.razorpay_order_id});
    if(!p){
        return NextResponse.error("Order Id not found");
    }

    let val = await validatePaymentVerification({"order_id": body.razorpay_order_id, "razorpay_payment_id": body.razorpay_payment_id, "razorpay_signature": body.razorpay_signature}, process.env.KEY_SECRET);

    if(val){
        const updated = await Payment.findOneAndUpdate({oid: body.razorpay_order_id}, {status: "completed"}, {new: true});
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/send`)
    }
}