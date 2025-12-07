'use client'

import { User, Phone, Mail, FileText, Upload, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function GeneralSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">تنظیمات عمومی</h1>
                <p className="text-sm text-slate-400 mt-1">مدیریت اطلاعات شخصی و نمایه کاربری</p>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 md:p-8 space-y-8">

                    
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
                            <p className="text-xs text-slate-400 mt-1 mb-3">فرمت‌های مجاز: JPG, PNG (حداکثر ۲ مگابایت)</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-xs h-8">تغییر تصویر</Button>
                                <Button size="sm" variant="ghost" className="text-xs h-8 text-rose-500 hover:text-rose-600 hover:bg-rose-50">حذف</Button>
                            </div>
                        </div>
                    </div>

                    
                    <section className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    نام
                                </label>
                                <Input defaultValue="سارا" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <User className="w-3.5 h-3.5" />
                                    نام خانوادگی
                                </label>
                                <Input defaultValue="محمدی" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5" />
                                    شماره تلفن ثبت‌شده
                                    <span className="text-[10px] text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded mr-auto">(غیرقابل تغییر)</span>
                                </label>
                                
                                <Input
                                    defaultValue="09123456789"
                                    className="bg-slate-100 border-slate-200 text-slate-500 cursor-not-allowed opacity-80 font-mono text-left"
                                    dir="ltr"
                                    disabled
                                    readOnly
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                    <Mail className="w-3.5 h-3.5" />
                                    آدرس ایمیل
                                </label>
                                <Input defaultValue="sara.design@example.com" className="bg-slate-50 border-slate-200 focus:bg-white transition-colors font-mono text-left" dir="ltr" type="email" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                                <FileText className="w-3.5 h-3.5" />
                                درباره من (بیوگرافی)
                            </label>
                            <textarea
                                className="flex min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm shadow-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500/20 disabled:cursor-not-allowed disabled:opacity-50 resize-none focus:bg-white transition-colors"
                                placeholder="درباره سلیقه و استایل خود بنویسید..."
                                defaultValue="عاشق استایل‌های مینیمال و رنگ‌های نود. طراح گرافیک و علاقه‌مند به دنیای مد."
                            />
                        </div>
                    </section>
                </div>

                <div className="bg-slate-50 p-4 px-8 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-xs text-slate-400">آخرین ویرایش: ۲ روز پیش</p>
                    <Button className="bg-slate-900 text-white hover:bg-slate-800 px-6 rounded-xl gap-2 shadow-lg shadow-slate-200">
                        <Save className="w-4 h-4" />
                        ذخیره تغییرات
                    </Button>
                </div>
            </div>
        </div>
    );
}