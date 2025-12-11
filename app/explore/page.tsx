import { MasonryGrid } from "@/components/feed/masonry-grid";
import { FeedItem } from "@/types/feed";

// --- Real images from /public ---
const IMAGES = [
    "1.jpeg",
    "2.jpeg",
    "attractive-stylish-blonde-woman-jeans-oversize-jacket-walking-against-wall-street.jpg",
    "balancing-1868051_1920.jpg",
    "fashion-9464875_1920.jpg",
    "man-9182458_1280.jpg",
    "portrait-young-happy-woman-studio.jpg",
    "woman-3083453_1280.jpg",
    "woman-716592_1280.jpg",
    "woman-8839452_1920.jpg",
    "woman-9554464_1920.jpg"
];

const MOCK_PINS: FeedItem[] = Array.from({ length: 20 }).map((_, i) => {
    const image = IMAGES[i % IMAGES.length];
    const avatar = IMAGES[(i + 3) % IMAGES.length]; // ensures avatar differs from image

    return {
        id: i + 1,
        title: `ایده استایل ${i + 1}`,
        imageUrl: `/${image}`,
        user: {
            name: `کاربر ${i + 1}`,
            avatar: `/${avatar}`
        },
        likes: Math.floor(Math.random() * 100)
    };
});

export default function ExplorePage() {
    return (
        <div className="w-full h-full animate-in fade-in zoom-in-95 duration-500">
            <MasonryGrid items={MOCK_PINS} />
        </div>
    );
}
