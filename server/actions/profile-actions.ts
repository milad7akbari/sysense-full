'use server'

import { z } from "zod";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

// تعریف اسکیما برای اعتبارسنجی
const profileSchema = z.object({
    firstName: z.string().min(2, "نام باید حداقل ۲ حرف باشد"),
    lastName: z.string().min(2, "نام خانوادگی باید حداقل ۲ حرف باشد"),
    email: z.string().email("ایمیل معتبر نیست").optional().or(z.literal("")),
    bio: z.string().max(300, "بیوگرافی نمی‌تواند بیشتر از ۳۰۰ کاراکتر باشد").optional(),
    gender: z
        .enum(["male", "female", "other"])
        .optional()
        .refine(val => val !== undefined, {
            message: "لطفاً جنسیت را انتخاب کنید",
        }),
    dateOfBirth: z.string().optional(), // تاریخ به صورت رشته از اینپوت می‌آید
});

export async function updateProfile(prevState: never, formData: FormData) {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
        return { success: false, message: "لطفا مجدداً وارد شوید" };
    }

    // تبدیل FormData به آبجکت
    const rawData = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        bio: formData.get("bio"),
        gender: formData.get("gender"),
        dateOfBirth: formData.get("dateOfBirth"),
    };

    // اعتبارسنجی
    const validated = profileSchema.safeParse(rawData);

    if (!validated.success) {
        return {
            success: false,
            errors: validated.error.flatten().fieldErrors,
            message: "لطفاً خطاهای فرم را بررسی کنید",
        };
    }

    try {
        // تبدیل تاریخ تولد به فرمت Date برای دیتابیس
        const dob = validated.data.dateOfBirth
            ? new Date(validated.data.dateOfBirth)
            : null;

        await prisma.user.update({
            where: { id: parseInt(session) },
            data: {
                firstName: validated.data.firstName,
                lastName: validated.data.lastName,
                email: validated.data.email || null, // ذخیره null اگر خالی بود
                bio: validated.data.bio,
                gender: validated.data.gender,
                dateOfBirth: dob,
            },
        });

        revalidatePath("/settings/general");
        return { success: true, message: "تغییرات با موفقیت ذخیره شد" };
    } catch (error) {
        console.error("Profile Update Error:", error);
        return { success: false, message: "خطایی در ذخیره اطلاعات رخ داد" };
    }
}