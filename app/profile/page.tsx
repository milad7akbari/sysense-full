'use client'

import { useState } from "react";
import {
    Grid,
    Bookmark,
    Heart,
    ArrowUpRight,
    Sparkles,
    User,
    Phone,
    Mail,
    Edit2,
    Check,
    X
} from "lucide-react";

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

function UserInfoCard() {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: "سارا محمدی",
        phone: "09123456789",
        email: "sara.design@gmail.com"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.02)] h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="font-bold text-xl text-slate-800">حساب کاربری</h3>
                    <p className="text-xs text-slate-400 mt-1">اطلاعات شخصی شما</p>
                </div>
                <button
                    onClick={() => !isEditing && setIsEditing(true)}
                    disabled={isEditing}
                    className={`p-2 rounded-xl transition-all ${isEditing ? 'opacity-50 cursor-default' : 'hover:bg-slate-100 text-slate-600'}`}
                >
                    <Edit2 className="w-5 h-5" />
                </button>
            </div>

            <div className="space-y-6 flex-1">
                <EditableField
                    label="نام نمایشی"
                    icon={<User className="w-4 h-4" />}
                    name="name"
                    value={userData.name}
                    isEditing={isEditing}
                    onChange={handleChange}
                />
                <EditableField
                    label="شماره موبایل"
                    icon={<Phone className="w-4 h-4" />}
                    name="phone"
                    value={userData.phone}
                    isEditing={isEditing}
                    onChange={handleChange}
                    type="tel"
                />
                <EditableField
                    label="آدرس ایمیل"
                    icon={<Mail className="w-4 h-4" />}
                    name="email"
                    value={userData.email}
                    isEditing={isEditing}
                    onChange={handleChange}
                    type="email"
                />
            </div>

            {isEditing && (
                <div className="flex gap-3 mt-8 pt-4 border-t border-slate-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
                    <button
                        onClick={() => setIsEditing(false)}
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
                    >
                        <X className="w-4 h-4" />
                        انصراف
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-200"
                    >
                        <Check className="w-4 h-4" />
                        ذخیره تغییرات
                    </button>
                </div>
            )}
        </div>
    );
}

function EditableField({ label, icon, value, isEditing, onChange, name, type = "text" }: any) {
    return (
        <div className="group">
            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                {icon}
                {label}
            </label>
            {isEditing ? (
                <div className="relative">
                    <input
                        type={type}
                        name={name}
                        value={value}
                        onChange={onChange}
                        className="w-full bg-slate-50 text-slate-800 font-bold text-sm px-4 py-3 rounded-xl border border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none"
                    />
                </div>
            ) : (
                <div className="px-4 py-3 bg-white border border-transparent group-hover:bg-slate-50 group-hover:border-slate-100 rounded-xl transition-all duration-300">
                    <p className="text-slate-800 font-bold text-sm dir-ltr text-right">{value}</p>
                </div>
            )}
        </div>
    );
}

function StatCard({ icon, label, value, subText, bg, trend }: {
    icon: React.ReactNode,
    label: string,
    value: string,
    subText: string,
    bg: string,
    trend: 'up' | 'neutral'
}) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bg} group-hover:scale-110 transition-transform duration-300`}>
                    {icon}
                </div>
                {trend === 'up' && (
                    <span className="flex items-center text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        +۱۲%
                        <ArrowUpRight className="w-3 h-3 mr-0.5" />
                    </span>
                )}
            </div>
            <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
                <h4 className="text-3xl font-extrabold text-slate-800 font-sans mb-1">{value}</h4>
                <p className="text-xs text-slate-400 font-medium">{subText}</p>
            </div>
        </div>
    );
}

function ActivityItem({ icon, bg, title, desc, time, status, statusColor }: any) {
    return (
        <div className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-all duration-200 group cursor-pointer border border-transparent hover:border-slate-100">
            <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center shrink-0 shadow-sm group-hover:shadow transition-all`}>
                {icon}
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 text-sm truncate">{title}</h4>
                <p className="text-xs text-slate-500 mt-1 truncate">{desc}</p>
            </div>
            <div className="text-right hidden sm:block">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-lg block mb-1 text-center ${statusColor}`}>
                    {status}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{time}</span>
            </div>
        </div>
    )
}
