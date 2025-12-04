'use server'

// شبیه‌سازی تاخیر شبکه
import {redirect} from "next/navigation";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function sendOtpAction(prevState: any, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string;

    // شبیه‌سازی پردازش
    await delay(1500);

    // اعتبارسنجی ساده سمت سرور
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

    // شبیه‌سازی بررسی کد (مثلا کد 12345 همیشه صحیح است)
    if (otp !== "12345") {
        return {
            success: false,
            error: "کد وارد شده اشتباه است.",
            phoneNumber: phoneNumber
        };
    }

    // در اینجا معمولاً کاربر را لاگین می‌کنید و ریدایرکت می‌کنید
    redirect('/profile');

    return {
        success: true,
        error: "",
        phoneNumber: phoneNumber
    };
}