import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import GeneralSettingsForm from "./general-settings-form";

export default async function GeneralSettingsPage() {
    const session = (await cookies()).get("session")?.value;

    if (!session) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { id: parseInt(session) },
        select: {
            firstName: true,
            lastName: true,
            email: true,
            phoneNumber: true,
            bio: true,
            gender: true,
            dateOfBirth: true,
        }
    });

    if (!user) redirect("/login");

    return <GeneralSettingsForm user={user} />;
}