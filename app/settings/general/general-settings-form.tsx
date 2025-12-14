'use client'

import { useActionState } from "react";
import { User, Phone, Mail, FileText, Save, Calendar, UserCheck } from "lucide-react";
import { updateProfile } from "@/server/actions/profile-actions";
import { formatDateForInput } from "@/lib/utils";

type UserData = {
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    phoneNumber: string;
    bio: string | null;
    gender: string | null;
    dateOfBirth: Date | null;
};

export default function GeneralSettingsForm({ user }: { user: UserData }) {
    const [state, action, isPending] = useActionState(updateProfile, { success: false, message: "" });
    const dobValue = formatDateForInput(user.dateOfBirth);

    return (
        <div className="space-y-6 font-sans">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">تنظیمات عمومی</h1>
                <p className="text-sm text-slate-400 mt-1">مدیریت اطلاعات شخصی و نمایه کاربری</p>
            </div>

            {/* نمایش پیام موفقیت یا خطا */}
            {state.message && (
                <div className={`p-4 rounded-xl text-sm ${state.success ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                    {state.message}
                </div>
            )}

            <form action={action} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">

                    {/* Avatar Section (UI Only for now) */}
                    <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                        <div className="relative group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold border-2 border-white shadow-lg shadow-purple-100">
                                {user.firstName?.[0] || "U"}
                            </div>
                            {/* ... دکمه آپلود ... */}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">تصویر نمایه</h3>
                            <p className="text-xs text-slate-400 mt-1 mb-3">JPG, PNG (Max 2MB)</p>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" /> نام
                                </label>
                                <input
                                    name="firstName"
                                    defaultValue={user.firstName || ""}
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm focus:bg-white focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                                {state.errors?.firstName && <p className="text-red-500 text-xs">{state.errors.firstName}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" /> نام خانوادگی
                                </label>
                                <input
                                    name="lastName"
                                    defaultValue={user.lastName || ""}
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm focus:bg-white focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                                {state.errors?.lastName && <p className="text-red-500 text-xs">{state.errors.lastName}</p>}
                            </div>
                        </div>

                        {/* Gender & Date of Birth */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <UserCheck className="w-3.5 h-3.5" /> جنسیت
                                </label>
                                <select
                                    name="gender"
                                    defaultValue={user.gender || ""}
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm focus:bg-white focus:ring-1 focus:ring-purple-500/20 transition"
                                >
                                    <option value="" disabled>انتخاب کنید</option>
                                    <option value="male">مرد</option>
                                    <option value="female">زن</option>
                                    <option value="other">سایر</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Calendar className="w-3.5 h-3.5" /> تاریخ تولد
                                </label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    defaultValue={dobValue}
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm focus:bg-white focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" /> شماره تلفن
                                    <span className="text-[10px] text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded mr-auto">(غیرقابل تغییر)</span>
                                </label>
                                <input
                                    defaultValue={user.phoneNumber}
                                    disabled
                                    dir="ltr"
                                    className="w-full h-10 rounded-xl bg-slate-100 border border-slate-200 px-3 text-sm text-slate-500 cursor-not-allowed text-left opacity-80"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" /> ایمیل
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    defaultValue={user.email || ""}
                                    dir="ltr"
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm text-left focus:bg-white focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                                {state.errors?.email && <p className="text-red-500 text-xs">{state.errors.email}</p>}
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" /> درباره من
                            </label>
                            <textarea
                                name="bio"
                                rows={4}
                                defaultValue={user.bio || ""}
                                placeholder="درباره خود بنویسید..."
                                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-sm resize-none focus:bg-white focus:ring-1 focus:ring-purple-500/20 transition"
                            />
                            {state.errors?.bio && <p className="text-red-500 text-xs">{state.errors.bio}</p>}
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">آخرین ویرایش: {new Date().toLocaleDateString('fa-IR')}</p>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-6 h-10 rounded-xl shadow-lg shadow-slate-200 transition disabled:opacity-50"
                    >
                        {isPending ? "در حال ذخیره..." : (
                            <>
                                <Save className="w-4 h-4" /> ذخیره تغییرات
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}