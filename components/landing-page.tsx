import Link from "next/link";
import { ArrowLeft, Sparkles, ScanFace, Shirt, TrendingUp } from "lucide-react";

export default function LandingPage() {
    const baseBtnClass = "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    return (
        <div dir="rtl" className="min-h-screen flex flex-col relative overflow-hidden font-sans bg-background text-foreground selection:bg-purple-500/20 selection:text-purple-900 dark:selection:text-purple-100">


            <div className="absolute inset-0 -z-10 bg-background">

                <div
                    className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
                    style={{ backgroundSize: '40px 40px', opacity: 0.04 }}
                ></div>


                <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-purple-200/20 dark:bg-purple-900/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-blue-200/20 dark:bg-blue-900/10 rounded-full blur-[100px]" />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
            </div>


            <header className="sticky top-0 container mx-auto px-6 py-4 flex items-center justify-between z-50 bg-background/70 backdrop-blur-md ">


                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 dark:bg-primary/20 text-primary rounded-xl flex items-center justify-center shadow-sm border border-primary/10">
                        <span className="font-bold text-xl">S</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">سای‌سنس</span>
                </div>


                <div className="flex items-center gap-4">
                    <Link href="/login">
                        <button className={`${baseBtnClass} rounded-md px-4 py-2 hover:bg-accent hover:text-accent-foreground font-medium text-muted-foreground hover:bg-muted/50 duration-200`}>
                            ورود
                        </button>
                    </Link>
                    <Link href="/dashboard">
                        <button className={`${baseBtnClass} rounded-full px-6 py-2 bg-foreground text-background hover:bg-foreground/90 shadow-lg shadow-primary/5 duration-200 hover:scale-105 active:scale-95`}>
                            شروع کنید
                        </button>
                    </Link>
                </div>
            </header>


            <main className="flex-1 container mx-auto px-6 flex flex-col items-center justify-center text-center py-16 lg:py-24 relative z-10">


                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border backdrop-blur-sm text-secondary-foreground text-sm font-medium mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 shadow-sm">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>هوشمندترین راه برای کشف استایل شخصی</span>
                </div>


                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-8 leading-[1.1] max-w-5xl animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-100 drop-shadow-sm">
                    استایل خود را <br className="hidden sm:block" />

                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                     کشف و خلق کنید
                    </span>
                </h1>


                <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
                    سای‌سنس با تلفیق هوش مصنوعی و مد، پیشنهادهایی متناسب با سلیقه منحصربه‌فرد شما ارائه می‌دهد.
                </p>


                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-7 duration-1000 delay-300">
                    <Link href="/profile" className="w-full sm:w-auto">
                        <button className={`${baseBtnClass} w-full sm:w-auto text-lg h-14 px-10 rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1`}>
                            ورود به حساب کاربری
                            <ArrowLeft className="mr-2 w-5 h-5" />
                        </button>
                    </Link>
                    <Link href="/about" className="w-full sm:w-auto">
                        <button className={`${baseBtnClass} border border-input bg-background w-full sm:w-auto text-lg h-14 px-10 rounded-full bg-background/50 border-border text-foreground hover:bg-accent hover:text-accent-foreground backdrop-blur-sm transition-colors duration-200`}>
                            بیشتر بدانید
                        </button>
                    </Link>
                </div>


                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl animate-in fade-in zoom-in-95 duration-1000 delay-500">
                    <FeatureCard
                        icon={<ScanFace className="w-6 h-6" />}
                        title="تحلیل هوشمند"
                        desc="یادگیری الگوی انتخاب‌های شما با هوش مصنوعی"
                    />
                    <FeatureCard
                        icon={<TrendingUp className="w-6 h-6" />}
                        title="ترندهای روز"
                        desc="مشاهده جدیدترین مدهای جهانی متناسب با شما"
                        highlighted
                    />
                    <FeatureCard
                        icon={<Shirt className="w-6 h-6" />}
                        title="کمد دیجیتال"
                        desc="مدیریت و ست کردن لباس‌ها در فضای ابری"
                    />
                </div>

            </main>


            <footer className="container mx-auto px-6 py-8 mt-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2025 سای‌سنس. تمامی حقوق محفوظ است.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-primary transition-colors">قوانین</Link>
                        <Link href="#" className="hover:text-primary transition-colors">حریم خصوصی</Link>
                        <Link href="#" className="hover:text-primary transition-colors">تماس با ما</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({ icon, title, desc, highlighted = false }: { icon: React.ReactNode, title: string, desc: string, highlighted?: boolean }) {
    return (
        <div className={`
            group flex flex-col items-center p-8 rounded-3xl border transition-all duration-300 relative overflow-hidden
            ${highlighted
            ? 'bg-white/80 dark:bg-white/5 border-purple-500/30 shadow-2xl shadow-purple-500/10 scale-105 z-10'
            : 'bg-white/40 dark:bg-white/5 border-border/50 hover:bg-white/60 dark:hover:bg-white/10 hover:border-purple-500/20 hover:shadow-xl'}
            backdrop-blur-sm
        `}>

            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 relative z-10
                ${highlighted
                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300'
                : 'bg-muted text-muted-foreground group-hover:bg-purple-600 group-hover:text-white dark:group-hover:text-white'}
            `}>
                {icon}
            </div>
            <h3 className="font-bold text-lg mb-2 text-foreground relative z-10">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{desc}</p>
        </div>
    )
}