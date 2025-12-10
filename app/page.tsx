import { cookies } from "next/headers";
import ExplorePage from "@/app/explore/page";
import LandingPage from "@/components/landing-page";

export default async function Home() {
    const cookieStore = await cookies();
    const isLoggedIn = cookieStore.has('session');

    if (isLoggedIn) {
        return <ExplorePage />;
    }

    return <LandingPage />;
}