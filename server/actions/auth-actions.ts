'use server'


import {redirect} from "next/navigation";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendOtpAction(prevState: any, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string;

    
    if (!phoneNumber || phoneNumber.length < 10) {
        return {
            success: false,
            error: "شماره موبایل نامعتبر است.",
            phoneNumber: ""
        };
    }

    console.log(`Sending OTP to ${phoneNumber}`);

    return {
        success: true,
        error: "",
        phoneNumber: phoneNumber
    };
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string;
    const otp = formData.get("otp") as string;

    await delay(1500);

    
    if (otp !== "12345") {
        return {
            success: false,
            error: "کد وارد شده اشتباه است.",
            phoneNumber: phoneNumber
        };
    }

    
    redirect('/profile');

    return {
        success: true,
        error: "",
        phoneNumber: phoneNumber
    };
}