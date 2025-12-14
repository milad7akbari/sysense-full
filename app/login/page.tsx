'use client'

import { useActionState, useEffect, useState } from "react";
import { sendOtpAction, verifyOtpAction } from "@/server/actions/auth-actions";
import Image from "next/image";
import Link from "next/link";
import { Loader2, RefreshCcw, ArrowRight, ShieldCheck } from "lucide-react";

const initialState = {
    error: "",
    success: false,
    phoneNumber: ""
};

const OTP_LENGTH = 5;
const TIMER_DURATION = 120;

export default function LoginPage() {
    const [step, setStep] = useState<"PHONE" | "OTP">("PHONE");
    const [clientError, setClientError] = useState("");
    const [timer, setTimer] = useState(0);

    const [state, formAction, isPending] = useActionState(
        step === "PHONE" ? sendOtpAction : verifyOtpAction,
        initialState
    );

    useEffect(() => {
        if (step === "PHONE" && state?.success && state.phoneNumber) {
            const timeout = setTimeout(() => {
                setStep("OTP");
                setTimer(TIMER_DURATION);
                setClientError("");
            }, 0);
            return () => clearTimeout(timeout);
        }
    }, [state, step]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (step === "PHONE") {
            const formData = new FormData(e.currentTarget);
            const phone = formData.get("phoneNumber") as string;
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
        setClientError("");
    };

    // استایل‌های پایه برای اینپوت و دکمه
    const inputBaseClass = "flex w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    const btnBaseClass = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

    return (
        <div className="flex min-h-screen w-full font-sans relative overflow-hidden bg-background">

            <Link href="/" className="absolute top-6 right-6 z-50 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowRight className="w-4 h-4" />
                بازگشت به خانه
            </Link>

            <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 sm:p-10 bg-white dark:bg-black transition-colors duration-300 z-10 relative">

                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 lg:hidden"></div>

                <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-50 dark:bg-purple-900/20 text-purple-600 mb-6 shadow-sm">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h1 className="text-3xl font-bold text-foreground mb-3 tracking-tight">
                            {step === "PHONE" ? "ورود به حساب کاربری" : "تایید شماره موبایل"}
                        </h1>
                        <div className="text-muted-foreground text-sm leading-relaxed">
                            {step === "PHONE"
                                ? "برای استفاده از امکانات سای‌سنس، لطفا شماره موبایل خود را وارد کنید."
                                : <div className="flex flex-col items-center gap-2">
                                    <span>کد ۵ رقمی ارسال شده به شماره زیر را وارد کنید:</span>
                                    <span className="font-mono text-foreground dir-ltr bg-muted px-3 py-1 rounded-md text-sm tracking-wider">{state?.phoneNumber}</span>
                                </div>
                            }
                        </div>
                    </div>

                    <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
                        {step === "PHONE" ? (
                            <div className="space-y-2 group">
                                <label className="text-sm font-medium text-foreground block text-right group-focus-within:text-purple-600 transition-colors">
                                    شماره موبایل
                                </label>
                                <input
                                    name="phoneNumber"
                                    placeholder="۰۹۱۲۳۴۵۶۷۸۹"
                                    defaultValue={state?.phoneNumber || ""}
                                    className={`${inputBaseClass} h-12 text-left text-lg dir-ltr placeholder:text-right font-mono transition-all focus:ring-2 focus:ring-purple-500/20`}
                                    dir="ltr"
                                    type="tel"
                                    autoComplete="tel"
                                    autoFocus
                                />
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
                                <input type="hidden" name="phoneNumber" value={state?.phoneNumber || ""} />
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-foreground block text-right">
                                        کد تایید (۵ رقم)
                                    </label>
                                    <input
                                        name="otp"
                                        placeholder="- - - - -"
                                        className={`${inputBaseClass} h-14 text-center tracking-[0.75em] text-3xl font-bold bg-muted/30 border-2 focus:border-purple-500 rounded-xl font-mono`}
                                        maxLength={OTP_LENGTH}
                                        autoFocus
                                        autoComplete="one-time-code"
                                        inputMode="numeric"
                                        required
                                    />
                                </div>

                                <div className="flex justify-between items-center text-xs px-1">
                                    {timer > 0 ? (
                                        <span className="text-muted-foreground flex gap-1">
                                            <span>زمان باقی‌مانده:</span>
                                            <span className="font-mono font-medium text-purple-600 w-10 inline-block text-left">{formatTime(timer)}</span>
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setStep("PHONE")}
                                            className="text-purple-600 hover:text-purple-700 hover:underline flex items-center gap-1 cursor-pointer transition-colors font-medium"
                                        >
                                            <RefreshCcw className="w-3 h-3" />
                                            ارسال مجدد کد
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {(clientError || state?.error) && (
                            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 text-sm text-center border border-red-100 dark:border-red-900/50 animate-in zoom-in-95 duration-300 flex items-center justify-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                {clientError || state?.error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={`
                                ${btnBaseClass}
                                w-full h-12 bg-purple-600 text-white
                                hover:bg-gray-600/95
                                transition-all duration-150
                                active:scale-[0.98]
                            `}
                            disabled={isPending}
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    در حال بررسی...
                                </span>
                            ) : (
                                step === "PHONE" ? "ارسال کد تایید" : "ورود به سای‌سنس"
                            )}
                        </button>

                        {step === "OTP" && (
                            <button
                                type="button"
                                onClick={() => setStep("PHONE")}
                                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors text-center block pt-2"
                            >
                                شماره اشتباه است؟ <span className="underline decoration-dashed decoration-muted-foreground/50">اصلاح شماره</span>
                            </button>
                        )}
                    </form>

                    {step === "PHONE" && (
                        <div className="mt-10 text-center text-sm text-muted-foreground">
                            با ورود به سای‌سنس، <Link href="#" className="underline decoration-dotted hover:text-foreground">قوانین و مقررات</Link> را می‌پذیرید.
                        </div>
                    )}
                </div>
            </div>

            <div className="hidden lg:flex w-1/2 bg-[#f8f9fa] dark:bg-zinc-950 relative overflow-hidden items-center justify-center border-r border-black/5 dark:border-white/5">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.03]" style={{ backgroundSize: '40px 40px' }}></div>
                <div className="absolute top-[-20%] right-[-10%] w-[40vw] h-[40vw] bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-[100px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[30vw] h-[30vw] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[100px]" />

                <div className="relative z-20 text-center px-16 max-w-xl animate-in slide-in-from-left-8 duration-1000 delay-100">
                    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/50 dark:border-white/10 shadow-2xl mb-8 inline-block transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                        <Image
                            src="/window.svg"
                            alt="Logo"
                            width={120}
                            height={120}
                            className="opacity-80 dark:invert"
                        />
                    </div>
                    <h2 className="text-4xl font-extrabold text-foreground mb-6 leading-tight">
                        مدیریت هوشمند استایل با <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 px-2">سای‌سنس</span>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                        بهترین پلتفرم برای کشف، دسته‌بندی و تعامل با دنیای مد و فشن.
                        <br/>
                        <span className="font-medium text-foreground">تجربه‌ای متفاوت از سرعت و زیبایی.</span>
                    </p>
                </div>
            </div>
        </div>
    );
}