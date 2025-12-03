'use client'

import { useActionState, useEffect, useState } from "react";
import { sendOtpAction, verifyOtpAction } from "@/server/actions/auth-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { Loader2, RefreshCcw } from "lucide-react"; // آیکون‌های لودینگ و ارسال مجدد

const initialState = {
    error: "",
    success: false,
    phoneNumber: ""
};

// طول کد تایید (طبق درخواست شما ۵ رقم)
const OTP_LENGTH = 5;
// مدت زمان تایمر به ثانیه (۲ دقیقه)
const TIMER_DURATION = 120;

export default function LoginPage() {
    const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
    const [clientError, setClientError] = useState("");

    // وضعیت تایمر
    const [timer, setTimer] = useState(0);

    const [state, formAction, isPending] = useActionState(
        step === "PHONE" ? sendOtpAction : verifyOtpAction,
        initialState
    );

    // مدیریت تغییر مرحله و شروع تایمر
    useEffect(() => {
        if (step === "PHONE" && state?.success && state.phoneNumber) {
            setStep("OTP");
            setTimer(TIMER_DURATION);
            setClientError("");
        }
    }, [state, step]);

    // منطق شمارش معکوس تایمر
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // تابع فرمت زمان (تبدیل ثانیه به 02:00)
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    // هندلر اعتبارسنجی قبل از ارسال
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const formData = new FormData(e.currentTarget);
        setClientError(""); // پاک کردن خطاهای قبلی

        if (step === "PHONE") {
            const phone = formData.get("phoneNumber") as string;
            // ریجکس شماره موبایل ایران (پشتیبانی از 09, +989, 00989, 9)
            const iranMobileRegex = /^(?:0|\+98|0098)?9[0-9]{9}$/;

            if (!phone) {
                e.preventDefault();
                setClientError("لطفا شماره موبایل را وارد کنید.");
                return;
            }
            if (!iranMobileRegex.test(phone)) {
                e.preventDefault();
                setClientError("فرمت شماره موبایل صحیح نیست. (مثال: ۰۹۱۲۳۴۵۶۷۸۹)");
                return;
            }
        }
        else if (step === "OTP") {
            const otp = formData.get("otp") as string;
            // اعتبارسنجی طول کد و عددی بودن
            if (!otp || otp.length !== OTP_LENGTH || !/^\d+$/.test(otp)) {
                e.preventDefault();
                setClientError(`کد تایید باید ${OTP_LENGTH} رقم باشد.`);
                return;
            }
        }
        // اگر همه چیز درست بود، فرم به صورت خودکار اکشن سرور را صدا می‌زند
    };

    return (
        <div className="flex min-h-screen w-full font-sans relative overflow-hidden">
            {/* دکمه تغییر تم */}
            <div className="absolute top-4 left-4 z-50">
                <ModeToggle />
            </div>

            {/* ستون فرم (راست) */}
            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-10 bg-background transition-colors duration-300 z-10">
                <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* هدر فرم */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-3">
                            ورود به سای‌سنس
                        </h1>
                        <div className="text-muted-foreground text-sm">
                            {step === "PHONE"
                                ? "برای ورود، شماره موبایل خود را وارد کنید"
                                : <span className="flex flex-col gap-1">
                                    <span>کد ۵ رقمی ارسال شده به شماره زیر را وارد کنید:</span>
                                    <span className="font-mono text-foreground dir-ltr block mt-1 font-bold">{state?.phoneNumber}</span>
                                  </span>
                            }
                        </div>
                    </div>

                    {/* فرم */}
                    <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
                        {step === "PHONE" ? (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground block text-right">
                                    شماره موبایل
                                </label>
                                <Input
                                    name="phoneNumber"
                                    placeholder="مثال: ۰۹۱۲..."
                                    defaultValue={state?.phoneNumber || ""}
                                    className="h-12 text-left bg-muted/30 border-border focus:ring-primary/20 rounded-lg text-lg dir-ltr placeholder:text-right font-mono"
                                    dir="ltr"
                                    autoComplete="tel"
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <input type="hidden" name="phoneNumber" value={state?.phoneNumber || ""} />
                                <label className="text-sm font-medium text-foreground block text-right">
                                    کد تایید (۵ رقم)
                                </label>
                                <Input
                                    name="otp"
                                    placeholder="- - - - -"
                                    className="h-12 text-center tracking-[0.5em] text-2xl bg-muted/30 border-border focus:ring-primary/20 rounded-lg font-mono"
                                    maxLength={OTP_LENGTH}
                                    autoFocus
                                    autoComplete="one-time-code"
                                    required
                                />
                                {/* تایمر و ارسال مجدد */}
                                <div className="flex justify-between items-center text-xs mt-2">
                                    {timer > 0 ? (
                                        <span className="text-muted-foreground">
                                            زمان باقی‌مانده: <span className="font-mono font-medium text-primary">{formatTime(timer)}</span>
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                // منطق ارسال مجدد (معمولاً باید یک اکشن جدا صدا زده شود یا به مرحله قبل برگشت)
                                                // فعلاً برای سادگی کاربر را به مرحله اول برمی‌گردانیم تا دوباره درخواست دهد
                                                setStep("PHONE");
                                            }}
                                            className="text-primary hover:underline flex items-center gap-1 cursor-pointer"
                                        >
                                            <RefreshCcw className="w-3 h-3" />
                                            ارسال مجدد کد
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* نمایش خطاهای کلاینت یا سرور */}
                        {(clientError || state?.error) && (
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center border border-red-200 dark:border-red-800 animate-in zoom-in-95 duration-300">
                                {clientError || state?.error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full h-12 text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    در حال پردازش...
                                </span>
                            ) : (
                                step === "PHONE" ? "ارسال کد تایید" : "ورود به حساب"
                            )}
                        </Button>

                        {/* لینک برگشت در مرحله OTP */}
                        {step === "OTP" && (
                            <button
                                type="button"
                                onClick={() => setStep("PHONE")}
                                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center mt-2"
                            >
                                اشتباه وارد کردید؟ اصلاح شماره
                            </button>
                        )}
                    </form>

                    {/* فوتر فرم */}
                    {step === "PHONE" && (
                        <div className="mt-10 text-center text-sm text-muted-foreground">
                            حساب کاربری ندارید؟{" "}
                            <Link href="/register" className="text-primary font-semibold hover:underline">
                                ثبت نام کنید
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* ستون تصویر/برندینگ (چپ) */}
            <div className="hidden lg:flex w-1/2 bg-zinc-900 dark:bg-zinc-950 relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-black/90 z-10"></div>

                <div className="relative z-20 text-center px-10 max-w-lg animate-in slide-in-from-left-8 duration-1000 delay-100">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/10 shadow-2xl mb-8 inline-block">
                        <Image
                            src="/globe.svg"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="invert opacity-90"
                        />
                    </div>
                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight font-vazir">
                        مدیریت هوشمند محصولات با <br/>
                        <span className="text-primary-foreground bg-primary/20 px-2 rounded-md">سای‌سنس</span>
                    </h2>
                    <p className="text-lg text-white/70 leading-relaxed font-light">
                        بهترین پلتفرم برای مدیریت، دسته‌بندی و تعامل با محصولات دیجیتال.
                        <br/>
                        تجربه‌ای متفاوت از سرعت و امنیت.
                    </p>
                </div>
            </div>
        </div>
    );
}