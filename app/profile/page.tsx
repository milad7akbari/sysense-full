'use client'

import {
    Grid,
    Bookmark,
    Heart,
    ArrowUpRight,
    Sparkles
} from "lucide-react";
import { StatCard } from "@/components/profile/stat-card";
import { ActivityItem } from "@/components/profile/activity-item";
import { UserInfoCard } from "@/components/profile/user-info-card";

export default function Dashboard() {
    return (
        <div className="space-y-8 p-6 lg:p-10 max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl shadow-slate-200">
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                                نسخه هوشمند ✨
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold mb-2 tracking-tight">سلام، سارا! 👋</h1>
                        <p className="text-slate-300 max-w-xl text-lg font-light leading-relaxed">
                            هوش مصنوعی ما ۵ استایل جدید بر اساس <span className="text-white font-semibold border-b border-white/30 pb-0.5">کلکسیون تابستانه</span> تو پیدا کرده است.
                        </p>
                    </div>
                    <button className="whitespace-nowrap bg-white text-slate-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors shadow-lg flex items-center gap-2 group">
                        <Sparkles className="w-4 h-4 text-purple-600" />
                        مشاهده پیشنهادها
                    </button>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard
                    icon={<Grid className="w-6 h-6 text-blue-600" />}
                    label="پست‌های من"
                    value="42"
                    subText="+2 در هفته گذشته"
                    bg="bg-blue-50"
                    trend="up"
                />
                <StatCard
                    icon={<Bookmark className="w-6 h-6 text-purple-600" />}
                    label="کلکسیون‌ها (Saved)"
                    value="12"
                    subText="۳ برد عمومی، ۹ خصوصی"
                    bg="bg-purple-50"
                    trend="neutral"
                />
                <StatCard
                    icon={<Heart className="w-6 h-6 text-rose-600" />}
                    label="پست‌های لایک‌شده"
                    value="1,204"
                    subText="محبوب‌ترین: استایل خیابانی"
                    bg="bg-rose-50"
                    trend="up"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                    <UserInfoCard />
                </div>

                <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="font-bold text-xl text-slate-800">فعالیت‌های اخیر</h3>
                            <p className="text-xs text-slate-400 mt-1">تاریخچه تعاملات شما با محتوا</p>
                        </div>
                        <button className="text-sm font-semibold text-primary hover:bg-primary/5 px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                            مشاهده کامل
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="space-y-1">
                        <ActivityItem
                            icon={<Bookmark className="w-5 h-5 text-purple-600" />}
                            bg="bg-purple-100"
                            title="ذخیره در کلکسیون"
                            desc="پست «کت جین آبی» را در برد «زمستانه» ذخیره کردید."
                            time="۲۵ دقیقه پیش"
                            status="ذخیره شد"
                            statusColor="text-purple-700 bg-purple-50"
                        />
                        <ActivityItem
                            icon={<Heart className="w-5 h-5 text-rose-600" />}
                            bg="bg-rose-100"
                            title="لایک پست"
                            desc="شما استایل «مینیمال اداری» را پسندیدید."
                            time="۲ ساعت پیش"
                            status="پسندیده شد"
                            statusColor="text-rose-700 bg-rose-50"
                        />
                        <ActivityItem
                            icon={<Grid className="w-5 h-5 text-blue-600" />}
                            bg="bg-blue-100"
                            title="پست جدید"
                            desc="تصویر جدیدی در دسته «اکسسوری‌ها» بارگذاری کردید."
                            time="۱ روز پیش"
                            status="منتشر شده"
                            statusColor="text-green-700 bg-green-50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}