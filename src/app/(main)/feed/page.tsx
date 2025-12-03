import { getFeed, getUserInteractions } from "@/server/dal/products";
import { getSession } from "@/lib/auth";
import ProductCard from "@/components/products/product-card";
import { Suspense } from "react";
import { Filter } from "lucide-react";

export const metadata = {
    title: "فید شما | سای‌سنس",
};

// لیست دسته‌بندی‌های نمونه (تگ‌ها)
const categories = ["همه", "تکنولوژی", "طراحی داخلی", "مد و فشن", "هوش مصنوعی", "عکاسی", "گجت‌ها", "خودرو", "معماری"];

export default async function FeedPage() {
    const session = await getSession();
    const userId = session?.sub;

    // دریافت داده‌ها به صورت موازی
    const [products, interactions] = await Promise.all([
        getFeed(userId),
        userId ? getUserInteractions(userId) : Promise.resolve([])
    ]);

    const interactionMap = new Map(
        interactions.map(i => [i.productId, i.interactionType as 'like' | 'dislike'])
    );

    return (
        <div className="flex flex-col w-full">

            {/* نوار دسته‌بندی (Sticky) */}
            <div className="sticky top-20 z-40 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40 py-3 mb-6">
                <div className="container mx-auto px-4 flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                    <button className="p-2 rounded-xl border border-border hover:bg-secondary transition-colors shrink-0">
                        <Filter className="w-5 h-5 text-muted-foreground" />
                    </button>
                    {categories.map((cat, i) => (
                        <button
                            key={i}
                            className={`
                                px-5 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200
                                ${i === 0
                                ? "bg-foreground text-background shadow-md"
                                : "bg-secondary/50 text-foreground hover:bg-secondary hover:scale-105"}
                            `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* گرید آبشاری (Masonry Grid) */}
            <div className="container mx-auto px-2 sm:px-4 pb-20">
                {products.length > 0 ? (
                    // استفاده از CSS Columns برای چیدمان پینترستی
                    // در موبایل ۲ ستون، تبلت ۳ ستون، دسکتاپ ۴ و ۵ ستون
                    <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4">
                        <Suspense fallback={<div className="col-span-full text-center py-20">در حال بارگذاری فید...</div>}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    initialInteraction={interactionMap.get(product.id) || null}
                                />
                            ))}
                        </Suspense>
                    </div>
                ) : (
                    // حالت بدون محتوا
                    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                        <div className="w-48 h-48 bg-secondary/50 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <span className="text-4xl">🔍</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">هنوز محصولی وجود ندارد</h3>
                        <p className="text-muted-foreground max-w-md mb-8">
                            به نظر می‌رسد فید شما خالی است. اولین نفری باشید که محصولی را به اشتراک می‌گذارد!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}