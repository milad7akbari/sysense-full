import { Shirt, Sparkles, TrendingUp } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="space-y-8">

            {/* Welcome Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-purple-600 p-8 text-white shadow-xl">
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">سلام، خوش برگشتی! 👋</h1>
                    <p className="text-primary-foreground/90 max-w-xl text-lg opacity-90">
                        امروز ۵ پیشنهاد جدید هوشمند برای استایل تابستانی تو داریم. همین حالا بررسیشون کن.
                    </p>
                </div>

                {/* Abstract Shapes Background */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<Shirt className="w-6 h-6 text-blue-600" />}
                    label="لباس‌های در کمد"
                    value="124"
                    bg="bg-blue-50"
                />
                <StatCard
                    icon={<Sparkles className="w-6 h-6 text-purple-600" />}
                    label="ست‌های پیشنهادی"
                    value="8"
                    bg="bg-purple-50"
                />
                <StatCard
                    icon={<TrendingUp className="w-6 h-6 text-green-600" />}
                    label="امتیاز استایل"
                    value="92"
                    bg="bg-green-50"
                />
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-foreground">فعالیت‌های اخیر</h3>
                    <button className="text-sm text-primary hover:underline">مشاهده همه</button>
                </div>

                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                                <Shirt className="w-6 h-6 text-gray-500" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-semibold text-foreground text-sm">افزودن تیشرت نخی سفید</h4>
                                <p className="text-xs text-muted-foreground mt-1">۲ ساعت پیش • کمد لباس</p>
                            </div>
                            <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-lg">تکمیل شده</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, bg }: { icon: React.ReactNode, label: string, value: string, bg: string }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bg}`}>
                {icon}
            </div>
            <div>
                <p className="text-muted-foreground text-sm font-medium mb-1">{label}</p>
                <h4 className="text-2xl font-bold text-foreground font-sans">{value}</h4>
            </div>
        </div>
    );
}