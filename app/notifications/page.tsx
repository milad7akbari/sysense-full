'use client'

import { useState } from "react";
import { Bell, Heart, MessageCircle, UserPlus, Star, CheckCheck, Clock, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const initialNotifications = [
    {
        id: 1,
        type: 'like',
        title: 'لایک پست',
        message: 'سارا و ۳ نفر دیگر پست جدید شما را پسندیدند.',
        time: '۲ دقیقه پیش',
        read: false,
        icon: Heart,
        color: 'text-rose-500 bg-rose-50',
    },
    {
        id: 2,
        type: 'system',
        title: 'به‌روزرسانی سیستم',
        message: 'نسخه جدید سای‌سنس با قابلیت‌های هوش مصنوعی فعال شد.',
        time: '۱ ساعت پیش',
        read: false,
        icon: Star,
        color: 'text-amber-500 bg-amber-50',
    },
    {
        id: 3,
        type: 'comment',
        title: 'نظر جدید',
        message: 'علی در پاسخ به نظر شما نوشت: "دقیقاً همینطور است!"',
        time: '۵ ساعت پیش',
        read: true,
        icon: MessageCircle,
        color: 'text-blue-500 bg-blue-50',
    },
    {
        id: 4,
        type: 'follow',
        title: 'دنبال‌کننده جدید',
        message: 'مینا راد شما را دنبال کرد.',
        time: 'دیروز',
        read: true,
        icon: UserPlus,
        color: 'text-purple-500 bg-purple-50',
    },
];
export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => !n.read);

    return (
        <div className="space-y-6 font-sans">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
                        <Bell className="w-6 h-6 text-slate-400" />
                        اعلان‌ها
                    </h1>
                    <p className="text-sm text-slate-400 mt-1">آخرین فعالیت‌ها و پیام‌های سیستم</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={markAllAsRead}
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 h-9 px-3"
                    >
                        <CheckCheck className="w-4 h-4 mr-2" />
                        خواندن همه
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-slate-100 h-9 w-9">
                        <Settings className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </div>


            <div className="flex p-1 bg-slate-100/80 rounded-xl w-fit">
                <button
                    onClick={() => setFilter('all')}
                    className={cn(
                        "px-4 py-1.5 rounded-lg text-sm font-bold transition-all focus:outline-none",
                        filter === 'all' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    همه
                </button>
                <button
                    onClick={() => setFilter('unread')}
                    className={cn(
                        "px-4 py-1.5 rounded-lg text-sm font-bold transition-all flex items-center gap-2 focus:outline-none",
                        filter === 'unread' ? "bg-white text-slate-800 shadow-sm" : "text-slate-500 hover:text-slate-700"
                    )}
                >
                    خوانده نشده
                    {notifications.some(n => !n.read) && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    )}
                </button>
            </div>


            <div className="space-y-3">
                {filteredNotifications.length > 0 ? (
                    filteredNotifications.map((item) => (
                        <div
                            key={item.id}
                            className={cn(
                                "group flex items-start gap-4 p-4 rounded-2xl border transition-all duration-200 hover:shadow-md cursor-default",
                                item.read
                                    ? "bg-white border-slate-100"
                                    : "bg-purple-50/30 border-purple-100 shadow-sm"
                            )}
                        >

                            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", item.color)}>
                                <item.icon className="w-6 h-6" />
                            </div>


                            <div className="flex-1 min-w-0 pt-1">
                                <div className="flex justify-between items-start">
                                    <h4 className={cn("text-sm font-bold truncate", item.read ? "text-slate-700" : "text-slate-900")}>
                                        {item.title}
                                    </h4>
                                    <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0 bg-slate-50 px-2 py-0.5 rounded-full">
                                        <Clock className="w-3 h-3" />
                                        {item.time}
                                    </span>
                                </div>
                                <p className={cn("text-sm mt-1 leading-relaxed", item.read ? "text-slate-500" : "text-slate-700 font-medium")}>
                                    {item.message}
                                </p>
                            </div>


                            {!item.read && (
                                <div className="w-2 h-2 rounded-full bg-purple-500 mt-3 shrink-0" title="جدید" />
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-slate-300" />
                        </div>
                        <p className="text-slate-500 font-medium">هیچ اعلان جدیدی ندارید</p>
                    </div>
                )}
            </div>
        </div>
    );
}