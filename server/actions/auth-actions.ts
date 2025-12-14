'use server'

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import {redirect} from "next/navigation";
export type ActionState = {
    error: string;
    success: boolean;
    phoneNumber?: string;
    message?: string;
};
// --- Mocking Services (Must connect to a real SMS service in production) ---
const sendSms = async (phoneNumber: string, code: string) => {
    // This function simulates sending an SMS.
    // In a real project: integrate with providers like KavehNegar, MeliPayamak, etc.
    console.log(`Sending OTP ${code} to ${phoneNumber}`);
    return true;
}

const generateRandomOtp = () => {
    // Generates a 5-digit code
    return Math.floor(10000 + Math.random() * 90000).toString();
}

// --- Constants ---
const OTP_EXPIRY_MINUTES = 2;


export async function sendOtpAction(prevState: ActionState, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string;

    if (!phoneNumber) {
        return { error: "Please enter your phone number.", success: false, phoneNumber: "" };
    }

    const otpCode = generateRandomOtp();
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + OTP_EXPIRY_MINUTES);

    try {
        // 1. Store or update the OTP in the dedicated table (using the new model OtpRequests)
        await prisma.otpRequests.upsert({
            where: { phoneNumber: phoneNumber },
            update: {
                code: otpCode,
                expiresAt: expiryDate,
                used: false // Reset used status on new request
            },
            create: {
                phoneNumber: phoneNumber,
                code: otpCode,
                expiresAt: expiryDate,
                used: false
            },
        });

        // 2. Send SMS (Mocked)
        await sendSms(phoneNumber, otpCode);

        return {
            error: "",
            success: true,
            phoneNumber: phoneNumber
        };
    } catch (e) {
        console.error("Error sending OTP or saving to DB:", e);
        return {
            error: "Server error during OTP transmission. Please try again.",
            success: false,
            phoneNumber: phoneNumber
        };
    }
}


export async function verifyOtpAction(prevState: ActionState, formData: FormData) {
    const otp = formData.get("otp") as string;
    const phoneNumber = formData.get("phoneNumber") as string;

    // 1. Retrieve the stored OTP and check for validity
    const storedOtpEntry = await prisma.otpRequests.findUnique({
        where: { phoneNumber: phoneNumber },
    });

    if (!storedOtpEntry) {
        return { error: "Invalid or expired verification code.", success: false, phoneNumber };
    }

    // Check code match, expiry time, and usage status
    const isExpired = new Date() > storedOtpEntry.expiresAt;
    const isCodeMatch = otp === storedOtpEntry.code;
    const hasBeenUsed = storedOtpEntry.used;

    if (hasBeenUsed) {
        return { error: "Verification code has already been used.", success: false, phoneNumber };
    }

    if (isExpired) {
        // Clean up expired OTP record
        await prisma.otpRequests.delete({ where: { phoneNumber: phoneNumber } });
        return { error: "Verification code has expired. Please request a new one.", success: false, phoneNumber };
    }

    if (!isCodeMatch) {
        return { error: "The entered code is incorrect.", success: false, phoneNumber };
    }

    // --- Successful Login: Store/Create User in PostgreSQL ---
    try {
        // 1. Find the user based on the phone number
        let user = await prisma.user.findUnique({
            where: { phoneNumber: phoneNumber }
        });

        // 2. If the user doesn't exist, create a new record (Signup)
        if (!user) {
            user = await prisma.user.create({
                data: {
                    phoneNumber: phoneNumber,
                }
            });
        }

        // 3. Mark the OTP record as used to prevent replay attacks
        await prisma.otpRequests.update({
            where: { phoneNumber: phoneNumber },
            data: { used: true }
        });

        // 4. Create the session cookie (Auth)
        (await cookies()).set('session', user.id.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week expiry
            path: '/',
        });
        return {
            error: "",
            success: true,
            message: "Login successful. Redirecting...",
            phoneNumber
        };
        redirect('/');

    } catch (e) {
        console.error("Database Error during login/signup:", e);
        // Note: We leave the 'used' status true or rely on expiry if DB error occurs here
        return {
            error: "Server error while processing user data.",
            success: false,
            phoneNumber
        };
    }
}