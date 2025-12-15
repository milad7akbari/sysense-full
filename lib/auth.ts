import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

/**
 * JWT payload stored in the session cookie.
 * Dates MUST be serialized in JWTs.
 */
type SessionPayload = {
    userId: string;
    expires: string;
};

const secretKey = process.env.SESSION_SECRET ?? "M7AD";
const key = new TextEncoder().encode(secretKey);

/**
 * Encrypt and sign a session payload as JWT.
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}

/**
 * Verify and decrypt a JWT session token.
 */
export async function decrypt(input: string): Promise<SessionPayload | null> {
    try {
        const { payload } = await jwtVerify<SessionPayload>(input, key, {
            algorithms: ["HS256"],
        });

        return payload;
    } catch {
        return null;
    }
}

/**
 * Create a session cookie for the authenticated user.
 */
export async function createSession(userId: string): Promise<void> {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const session = await encrypt({
        userId,
        expires: expires.toISOString(),
    });

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        expires,
    });
}

/**
 * Verify current session from cookies.
 */
export async function verifySession(): Promise<{
    isAuth: true;
    userId: string;
} | null> {
    const token = (await cookies()).get("session")?.value;
    if (!token) return null;

    const session = await decrypt(token);
    if (!session?.userId) return null;

    return { isAuth: true, userId: session.userId };
}

/**
 * Destroy the current session.
 */
export async function deleteSession(): Promise<void> {
    (await cookies()).delete("session");
}
