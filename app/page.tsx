import { cookies } from "next/headers";
import LandingPage from "@/components/landing-page";
import HomePage from "@/app/home/page";

export default async function Home() {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.has('session');

    if (isLoggedIn) {
        return <HomePage />;
    }

    return <LandingPage />;
}