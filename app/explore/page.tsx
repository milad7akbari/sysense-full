import { Sidebar } from "@/components/dashboard/sidebar";
import { Header } from "@/components/dashboard/header";
import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";

const MOCK_PINS: FeedItem[] = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    title: `ایده استایل ${i + 1}`,
    imageUrl: `/${(i % 2) + 1}.jpeg`,
    user: {
        name: `کاربر ${i + 1}`,
        avatar: `/${(i % 2) + 1}.jpeg`
    },
    likes: Math.floor(Math.random() * 100)
}));

export default function ExplorePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="flex pt-20">
                <Sidebar />

                <main className="flex-1 md:ml-64 p-4 transition-all duration-300">
                    <div className="container mx-auto max-w-[1600px]">
                        <MasonryGrid items={MOCK_PINS} />
                    </div>
                </main>
            </div>
        </div>
    );
}