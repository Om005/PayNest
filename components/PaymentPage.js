"use client";
import React from "react";
import Script from "next/script";
const PaymentPage = () => {
  return (
    <>
      <button id="rzp-button1">Pay</button>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </>
  );
};

export default PaymentPage;
