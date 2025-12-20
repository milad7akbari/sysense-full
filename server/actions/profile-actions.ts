'use server'

import { z } from "zod";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { decrypt } from "@/lib/auth"; // <--- ایمپورت تابع رمزگشایی

export type FormState = {
    success: boolean;
    message: string;
    errors?: {
        [key: string]: string[];
    };
};

const profileSchema = z.object({
    firstName: z.string().optional().or(z.literal("")),
    lastName: z.string().optional().or(z.literal("")),
    email: z.string().email("ایمیل معتبر نیست").optional().or(z.literal("")),
    bio: z.string().max(300, "بیوگرافی نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد").optional().or(z.literal("")),
    gender: z.enum(["male", "female", "other"]).optional(),
    dateOfBirth: z.string().optional().or(z.literal("")),
    avatar: z.any().optional()
});

export async function updateProfile(prevState: FormState, formData: FormData): Promise<FormState> {
    // 1. دریافت و رمزگشایی سشن
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    // اگر کوکی نبود یا مقدارش خالی بود
    if (!sessionCookie) {
        return { success: false, message: "نشست کاربری یافت نشد. لطفا مجدداً وارد شوید." };
    }

    // تلاش برای رمزگشایی توکن
    const session = await decrypt(sessionCookie);

    // اگر رمزگشایی ناموفق بود یا userId نداشت
    if (!session || !session.userId) {
        console.error("Session decryption failed or userId missing.");
        return { success: false, message: "نشست نامعتبر است. لطفا مجدداً وارد شوید." };
    }

    const userId = parseInt(session.userId);
    if (isNaN(userId)) {
        console.error("Invalid User ID in session:", session.userId);
        return { success: false, message: "شناسه کاربر نامعتبر است." };
    }

    // 2. پردازش داده‌های فرم
    const rawGender = formData.get("gender")?.toString();
    const genderValue = (rawGender === "male" || rawGender === "female" || rawGender === "other")
        ? rawGender
        : undefined;

    const rawData = {
        firstName: formData.get("firstName")?.toString() || "",
        lastName: formData.get("lastName")?.toString() || "",
        email: formData.get("email")?.toString() || "",
        bio: formData.get("bio")?.toString() || "",
        gender: genderValue,
        dateOfBirth: formData.get("dateOfBirth")?.toString() || "",
        avatar: formData.get("avatar"),
    };

    const validated = profileSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            errors: validated.error.flatten().fieldErrors,
            message: "لطفاً خطاهای فرم را بررسی کنید",
        };
    }

    try {
        const data = validated.data;
        const dob = data.dateOfBirth ? new Date(data.dateOfBirth as string) : null;
        let avatarPath = undefined;

        // 3. ذخیره فایل آواتار (در صورت وجود)
        const file = data.avatar as File;

        if (file && file instanceof File && file.size > 0 && file.name !== "undefined") {
            try {
                const buffer = Buffer.from(await file.arrayBuffer());

                // ایمن‌سازی نام فایل
                const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
                const filename = `avatar_${userId}_${Date.now()}_${safeName}`;

                // مسیر ذخیره‌سازی
                const uploadDir = path.join(process.cwd(), "public/uploads");

                // اطمینان از وجود پوشه
                await mkdir(uploadDir, { recursive: true });

                // نوشتن فایل
                await writeFile(path.join(uploadDir, filename), buffer);
                avatarPath = `/uploads/${filename}`;

                console.log("✅ File saved successfully:", avatarPath);
            } catch (fileError) {
                console.error("❌ Error saving file:", fileError);
                return { success: false, message: "خطا در آپلود عکس پروفایل" };
            }
        }

        // 4. آپدیت دیتابیس
        await prisma.user.update({
            where: { id: userId }, // استفاده از userId استخراج شده از توکن
            data: {
                ...(data.firstName && { firstName: data.firstName as string }),
                ...(data.lastName && { lastName: data.lastName as string }),
                ...(data.email && { email: data.email as string }),
                ...(data.bio && { bio: data.bio as string }),
                ...(data.gender && { gender: data.gender as string }),
                ...(dob && { dateOfBirth: dob }),
                ...(avatarPath && { avatar: avatarPath }),
            },
        });

        revalidatePath("/settings/general");
        return { success: true, message: "تغییرات با موفقیت ذخیره شد" };

    } catch (error) {
        // این لاگ را در ترمینال VS Code ببینید
        console.error("❌ Database Update Error:", error);
        return { success: false, message: "خطایی در ذخیره اطلاعات رخ داد. کنسول سرور را چک کنید." };
    }
}