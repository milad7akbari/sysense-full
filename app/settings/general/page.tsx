'use client'

import { User, Phone, Mail, FileText, Upload, Save } from "lucide-react";

export default function GeneralSettingsPage() {
    return (
        <div className="space-y-6 font-sans">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">تنظیمات عمومی</h1>
                <p className="text-sm text-slate-400 mt-1">مدیریت اطلاعات شخصی و نمایه کاربری</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">

                    {/* Avatar */}
                    <div className="flex items-center gap-6 pb-8 border-b border-slate-50">
                        <div className="relative group cursor-pointer">
                            <div className="w-20 h-20 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 text-2xl font-bold border-2 border-white shadow-lg shadow-purple-100">
                                S
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                                <Upload className="w-6 h-6 text-white" />
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-slate-800 text-lg">تصویر نمایه</h3>
                            <p className="text-xs text-slate-400 mt-1 mb-3">
                                فرمت‌های مجاز: JPG, PNG (حداکثر ۲ مگابایت)
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    className="h-8 px-3 text-xs rounded-md border border-slate-200 hover:bg-slate-50 transition"
                                >
                                    تغییر تصویر
                                </button>
                                <button
                                    type="button"
                                    className="h-8 px-3 text-xs rounded-md text-rose-500 hover:text-rose-600 hover:bg-rose-50 transition"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    نام
                                </label>
                                <input
                                    defaultValue="سارا"
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    نام خانوادگی
                                </label>
                                <input
                                    defaultValue="محمدی"
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" />
                                    شماره تلفن ثبت‌شده
                                    <span className="text-[10px] text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded mr-auto">
                                        (غیرقابل تغییر)
                                    </span>
                                </label>
                                <input
                                    defaultValue="09123456789"
                                    disabled
                                    readOnly
                                    dir="ltr"
                                    className="w-full h-10 rounded-xl bg-slate-100 border border-slate-200 px-3 text-sm text-slate-500 cursor-not-allowed font-mono text-left opacity-80"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    آدرس ایمیل
                                </label>
                                <input
                                    type="email"
                                    dir="ltr"
                                    defaultValue="sara.design@example.com"
                                    className="w-full h-10 rounded-xl bg-slate-50 border border-slate-200 px-3 text-sm font-mono text-left focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" />
                                درباره من (بیوگرافی)
                            </label>
                            <textarea
                                rows={4}
                                defaultValue="عاشق استایل‌های مینیمال و رنگ‌های نود. طراح گرافیک و علاقه‌مند به دنیای مد."
                                placeholder="درباره سلیقه و استایل خود بنویسید..."
                                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 text-sm resize-none focus:bg-white focus:outline-none focus:ring-1 focus:ring-purple-500/20 transition"
                            />
                        </div>
                    </section>
                </div>

                {/* Footer */}
                <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">آخرین ویرایش: ۲ روز پیش</p>
                    <button
                        type="button"
                        className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 px-6 h-10 rounded-xl shadow-lg shadow-slate-200 transition"
                    >
                        <Save className="w-4 h-4" />
                        ذخیره تغییرات
                    </button>
                </div>
            </div>
        </div>
    );
}
