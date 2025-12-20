'use client'

import { useActionState, useState } from "react";
import { User, Phone, Mail, FileText, Upload, Save, Calendar as CalendarIcon, UserCheck, AlertCircle } from "lucide-react";
import { updateProfile, FormState } from "@/server/actions/profile-actions";
import Image from "next/image";
import { cn } from "@/lib/utils"; // استفاده از cn برای کلاس‌های شرطی

// پکیج‌های تقویم شمسی
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";

type UserData = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string;
    bio: string | null;
    gender: string | null;
    dateOfBirth: Date | null;
    avatar: string | null;
};

const initialState: FormState = {
    success: false,
    message: "",
    errors: {}
};

export default function GeneralSettingsForm({ user }: { user: UserData }) {
    const [state, action, isPending] = useActionState(updateProfile, initialState);
    const [previewUrl, setPreviewUrl] = useState<string | null>(user.avatar);
    const [dateValue, setDateValue] = useState<Date | null | undefined>(
        user.dateOfBirth ? new Date(user.dateOfBirth) : null
    );

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // کامپوننت کمکی برای نمایش پیام خطا زیر فیلدها
    const ErrorMessage = ({ error }: { error?: string[] }) => {
        if (!error || error.length === 0) return null;
        return (
            <p className="text-red-500 text-xs font-medium mt-1.5 flex items-center gap-1 animate-in slide-in-from-top-1">
                <AlertCircle className="w-3 h-3" />
                {error[0]}
            </p>
        );
    };

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">تنظیمات عمومی</h1>
                <p className="text-sm text-slate-400 mt-1">مدیریت اطلاعات شخصی و نمایه کاربری</p>
            </div>

            {/* پیام کلی موفقیت یا خطا */}
            {state.message && (
                <div className={cn(
                    "p-4 rounded-xl text-sm flex items-center gap-2 border shadow-sm animate-in fade-in slide-in-from-top-2",
                    state.success
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                )}>
                    {state.success ? <UserCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                    {state.message}
                </div>
            )}

            <form action={action} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">

                    {/* --- بخش آواتار --- */}
                    <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                        <div className="relative group cursor-pointer shrink-0">
                            <label htmlFor="avatar-upload" className="cursor-pointer block relative">
                                <div className={cn(
                                    "w-24 h-24 rounded-3xl flex items-center justify-center overflow-hidden border-4 shadow-xl shadow-purple-100/50 relative transition-colors",
                                    state.errors?.avatar ? "border-red-500 bg-red-50" : "border-white bg-purple-50"
                                )}>
                                    {previewUrl ? (
                                        <Image src={previewUrl} alt="Avatar" fill className="object-cover" />
                                    ) : (
                                        <span className="text-purple-600 text-3xl font-bold">{user.firstName?.[0] || "U"}</span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-black/40 rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[1px]">
                                    <Upload className="w-8 h-8 text-white drop-shadow-md" />
                                </div>
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                name="avatar"
                                accept="image/*"
                                className="hidden"
                                onChange={handleAvatarChange}
                            />
                        </div>

                        <div>
                            <h3 className={cn("font-bold text-lg", state.errors?.avatar ? "text-red-600" : "text-slate-800")}>
                                تصویر نمایه
                            </h3>
                            <p className="text-xs text-slate-400 mt-1 mb-3 leading-relaxed">
                                فرمت‌های مجاز: JPG, PNG, WebP <br /> حداکثر حجم: ۲ مگابایت
                            </p>

                            {/* نمایش خطای آواتار */}
                            <ErrorMessage error={state.errors?.avatar} />

                            <div className="flex gap-2 mt-2">
                                <label
                                    htmlFor="avatar-upload"
                                    className="h-9 px-4 text-xs font-bold flex items-center justify-center rounded-xl border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-600 transition cursor-pointer select-none"
                                >
                                    تغییر تصویر
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* --- فیلدهای فرم --- */}
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={cn("text-xs font-bold flex items-center gap-1.5 transition-colors", state.errors?.firstName ? "text-red-500" : "text-slate-500")}>
                                    <User className="w-3.5 h-3.5" /> نام
                                </label>
                                <input
                                    name="firstName"
                                    defaultValue={user.firstName || ""}
                                    className={cn(
                                        "w-full h-11 rounded-xl border px-4 text-sm transition outline-none",
                                        state.errors?.firstName
                                            ? "bg-red-50 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-red-900"
                                            : "bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                                    )}
                                />
                                <ErrorMessage error={state.errors?.firstName} />
                            </div>

                            <div className="space-y-2">
                                <label className={cn("text-xs font-bold flex items-center gap-1.5 transition-colors", state.errors?.lastName ? "text-red-500" : "text-slate-500")}>
                                    <User className="w-3.5 h-3.5" /> نام خانوادگی
                                </label>
                                <input
                                    name="lastName"
                                    defaultValue={user.lastName || ""}
                                    className={cn(
                                        "w-full h-11 rounded-xl border px-4 text-sm transition outline-none",
                                        state.errors?.lastName
                                            ? "bg-red-50 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-red-900"
                                            : "bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                                    )}
                                />
                                <ErrorMessage error={state.errors?.lastName} />
                            </div>
                        </div>

                        {/* --- جنسیت و تاریخ تولد --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className={cn("text-xs font-bold flex items-center gap-1.5 transition-colors", state.errors?.gender ? "text-red-500" : "text-slate-500")}>
                                    <UserCheck className="w-3.5 h-3.5" /> جنسیت
                                </label>
                                <div className="relative">
                                    <select
                                        name="gender"
                                        defaultValue={user.gender || ""}
                                        className={cn(
                                            "w-full h-11 appearance-none rounded-xl border px-4 text-sm transition outline-none",
                                            state.errors?.gender
                                                ? "bg-red-50 border-red-300 focus:border-red-500 text-red-900"
                                                : "bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                                        )}
                                    >
                                        <option value="">انتخاب کنید</option>
                                        <option value="male">مرد</option>
                                        <option value="female">زن</option>
                                        <option value="other">سایر</option>
                                    </select>
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                </div>
                                <ErrorMessage error={state.errors?.gender} />
                            </div>

                            <div className="space-y-2 flex flex-col relative z-20">
                                <label className={cn("text-xs font-bold flex items-center gap-1.5 mb-1 transition-colors", state.errors?.dateOfBirth ? "text-red-500" : "text-slate-500")}>
                                    <CalendarIcon className="w-3.5 h-3.5" /> تاریخ تولد (شمسی)
                                </label>
                                <div className={cn(
                                    "w-full datepicker-wrapper rounded-xl",
                                    state.errors?.dateOfBirth ? "ring-1 ring-red-500 ring-offset-1" : ""
                                )}>
                                    <DatePicker
                                        calendar={persian}
                                        locale={persian_fa}
                                        value={dateValue}
                                        onChange={(date) => {
                                            if (date) setDateValue(date.toDate());
                                            else setDateValue(null);
                                        }}
                                        format="YYYY/MM/DD"
                                        placeholder="۱۴۰۰/۰۱/۰۱"
                                        containerClassName="w-full"
                                        inputClass={cn(
                                            "w-full h-11 rounded-xl border px-4 text-sm transition outline-none font-mono",
                                            state.errors?.dateOfBirth
                                                ? "bg-red-50 border-red-300 text-red-900 placeholder:text-red-400"
                                                : "bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10 text-slate-600"
                                        )}
                                        calendarPosition="bottom-right"
                                    />
                                </div>
                                <input type="hidden" name="dateOfBirth" value={dateValue ? dateValue.toISOString() : ""} />
                                <ErrorMessage error={state.errors?.dateOfBirth} />
                            </div>
                        </div>

                        {/* --- ایمیل و بیوگرافی --- */}
                        <div className="space-y-2">
                            <label className={cn("text-xs font-bold flex items-center gap-1.5 transition-colors", state.errors?.email ? "text-red-500" : "text-slate-500")}>
                                <Mail className="w-3.5 h-3.5" /> ایمیل
                            </label>
                            <input
                                type="email"
                                name="email"
                                defaultValue={user.email || ""}
                                dir="ltr"
                                className={cn(
                                    "w-full h-11 rounded-xl border px-4 text-sm text-left transition outline-none",
                                    state.errors?.email
                                        ? "bg-red-50 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-red-900"
                                        : "bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                                )}
                            />
                            <ErrorMessage error={state.errors?.email} />
                        </div>

                        <div className="space-y-2">
                            <label className={cn("text-xs font-bold flex items-center gap-1.5 transition-colors", state.errors?.bio ? "text-red-500" : "text-slate-500")}>
                                <FileText className="w-3.5 h-3.5" /> درباره من
                            </label>
                            <textarea
                                name="bio"
                                rows={4}
                                defaultValue={user.bio || ""}
                                placeholder="درباره سلیقه و استایل خود بنویسید..."
                                className={cn(
                                    "w-full rounded-xl border px-4 py-3 text-sm resize-none transition outline-none leading-relaxed",
                                    state.errors?.bio
                                        ? "bg-red-50 border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/10 text-red-900 placeholder:text-red-400"
                                        : "bg-slate-50 border-slate-200 focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/10"
                                )}
                            />
                            <ErrorMessage error={state.errors?.bio} />
                        </div>

                        <div className="hidden">
                            <input name="phoneNumber" defaultValue={user.phoneNumber} />
                        </div>
                    </section>
                </div>

                <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400 font-medium">آخرین ویرایش: {new Date().toLocaleDateString('fa-IR')}</p>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-8 h-11 rounded-xl shadow-lg shadow-slate-200 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm"
                    >
                        {isPending ? "در حال ذخیره..." : <><Save className="w-4 h-4" /> ذخیره تغییرات</>}
                    </button>
                </div>
            </form>
        </div>
    );
}