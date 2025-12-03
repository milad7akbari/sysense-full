'use server'

import { db } from "@/server/db";
import { otpRequests, users } from "@/server/db/schema";
import { eq, and, gt, desc } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { createSession } from "@/lib/auth";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis"
import { redirect } from "next/navigation";

// Initialize Rate Limiter
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
});

function generateOTP() {
    return "11111";//Math.floor(1000 + Math.random() * 9000).toString(); // 4 digit
}

export async function sendOtpAction(prevState: any, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string;

    if (!phoneNumber) return { error: "Phone number required" };

    // Rate Limit Check
    const { success } = await ratelimit.limit(`otp:${phoneNumber}`);
    if (!success) return { error: "Too many requests. Try again later." };

    const plainOtp = generateOTP();
    const hashedOtp = await bcrypt.hash(plainOtp, 10);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await db.insert(otpRequests).values({
        phoneNumber,
        hashedOtp,
        expiresAt,
    });

    console.log(`[DEV ONLY] OTP for ${phoneNumber}: ${plainOtp}`);

    return { success: true, message: "OTP Sent", phoneNumber };
}

export async function verifyOtpAction(prevState: any, formData: FormData) {
    const phoneNumber = formData.get("phoneNumber") as string;
    const otp = formData.get("otp") as string;

    // Find valid OTP
    const validOtpRecord = await db.query.otpRequests.findFirst({
        where: and(
            eq(otpRequests.phoneNumber, phoneNumber),
            eq(otpRequests.used, false),
            gt(otpRequests.expiresAt, new Date())
        ),
        orderBy: [desc(otpRequests.createdAt)]
    });

    if (!validOtpRecord) {
        return { error: "Invalid or expired OTP" };
    }

    const isValid = await bcrypt.compare(otp, validOtpRecord.hashedOtp);
    if (!isValid) return { error: "Incorrect Code" };

    // Mark used
    await db.update(otpRequests)
        .set({ used: true })
        .where(eq(otpRequests.id, validOtpRecord.id));

    // Find or Create User
    let user = await db.query.users.findFirst({
        where: eq(users.phoneNumber, phoneNumber)
    });

    if (!user) {
        [user] = await db.insert(users).values({ phoneNumber }).returning();
    }

    // Create Session
    await createSession(user.id);

    redirect("/feed");
}