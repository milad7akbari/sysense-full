import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY || "dev_secret");
const ACCESS_TOKEN_EXP = "15m";
const REFRESH_TOKEN_EXP = "5d";

export async function encrypt(payload: any, exp: string) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(exp)
        .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, SECRET_KEY, { algorithms: ["HS256"] });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function createSession(userId: string) {
    const accessToken = await encrypt({ sub: userId, type: "access" }, ACCESS_TOKEN_EXP);
    const refreshToken = await encrypt({ sub: userId, type: "refresh" }, REFRESH_TOKEN_EXP);

    const cookieStore = await cookies();

    // Set Access Token (Short lived)
    cookieStore.set("session", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });

    // Set Refresh Token (Long lived)
    cookieStore.set("refresh", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("session");
    cookieStore.delete("refresh");
}