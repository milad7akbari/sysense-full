'use client'

import { useState } from "react";
import { Search, Send, Paperclip, MoreVertical, Phone, Video, Smile } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

// داده‌های نمونه
const conversations = [
    { id: 1, name: "پشتیبانی سای‌سنس", lastMsg: "سلام، چطور می‌توانم کمکتان کنم؟", time: "۱۰:۳۰", unread: 2, avatar: "S", online: true },
    { id: 2, name: "علی رضایی", lastMsg: "فایل‌ها رو فرستادم.", time: "دیروز", unread: 0, avatar: "A", online: false },
    { id: 3, name: "سارا کمالی", lastMsg: "ممنون بابت راهنمایی!", time: "دوشنبه", unread: 0, avatar: "S", online: true },
];

export default function MessagesPage() {
    const [selectedChat, setSelectedChat] = useState(conversations[0]);
    const [message, setMessage] = useState("");

    return (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm h-full flex overflow-hidden">

            {/* لیست گفتگوها (سایدبار راست) */}
            <div className="w-full md:w-80 lg:w-96 border-l border-slate-100 flex flex-col bg-slate-50/50">
                <div className="p-4 border-b border-slate-100">
                    <h2 className="font-extrabold text-lg mb-4 text-slate-800">پیام‌ها</h2>
                    <div className="relative">
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="جستجو در گفتگوها..."
                            className="pr-9 bg-white border-slate-200 h-10 rounded-xl focus:bg-white"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                    {conversations.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setSelectedChat(chat)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                                selectedChat.id === chat.id
                                    ? 'bg-white shadow-sm border border-slate-100'
                                    : 'hover:bg-slate-100/50 border border-transparent'
                            }`}
                        >
                            <div className="relative">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 to-blue-100 flex items-center justify-center text-slate-600 font-bold text-lg">
                                    {chat.avatar}
                                </div>
                                {chat.online && (
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></span>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-bold text-sm text-slate-800 truncate">{chat.name}</h4>
                                    <span className="text-[10px] text-slate-400">{chat.time}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className="text-xs text-slate-500 truncate max-w-[140px]">{chat.lastMsg}</p>
                                    {chat.unread > 0 && (
                                        <span className="w-5 h-5 bg-purple-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                            {chat.unread}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* پنجره چت (بخش اصلی) */}
            <div className="flex-1 flex flex-col bg-white relative hidden md:flex">

                {/* هدر چت */}
                <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                                {selectedChat.avatar}
                            </div>
                            {selectedChat.online && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800 text-sm">{selectedChat.name}</h3>
                            <p className="text-[11px] text-emerald-600 font-medium">آنلاین</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-slate-400">
                        <Button variant="ghost" size="icon"><Phone className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon"><Video className="w-5 h-5" /></Button>
                        <Button variant="ghost" size="icon"><MoreVertical className="w-5 h-5" /></Button>
                    </div>
                </div>

                {/* فضای پیام‌ها */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('/grid.svg')] bg-[length:30px_30px] bg-fixed">
                    {/* پیام دریافتی نمونه */}
                    <div className="flex items-end gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 mb-1">
                            {selectedChat.avatar}
                        </div>
                        <div className="bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-br-none max-w-[70%] shadow-sm">
                            <p className="text-sm leading-relaxed">سلام! وقت بخیر. بله حتما، در مورد کالکشن جدید سوال داشتم.</p>
                            <span className="text-[10px] text-slate-400 mt-1 block text-left">۱۰:۳۰</span>
                        </div>
                    </div>

                    {/* پیام ارسالی نمونه */}
                    <div className="flex items-end gap-2 flex-row-reverse">
                        <div className="bg-purple-600 text-white px-4 py-3 rounded-2xl rounded-bl-none max-w-[70%] shadow-md shadow-purple-200">
                            <p className="text-sm leading-relaxed">سلام، خوشحال میشم کمکتون کنم. کدام بخش مد نظرتون هست؟</p>
                            <span className="text-[10px] text-purple-200 mt-1 block text-right">۱۰:۳۲</span>
                        </div>
                    </div>
                </div>

                {/* ورودی پیام */}
                <div className="p-4 border-t border-slate-100 bg-white">
                    <div className="flex items-end gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-200 focus-within:border-purple-300 focus-within:ring-4 focus-within:ring-purple-500/10 transition-all">
                        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-10 w-10 shrink-0">
                            <Paperclip className="w-5 h-5" />
                        </Button>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-3 min-h-[44px] max-h-32 resize-none outline-none placeholder:text-slate-400 custom-scrollbar"
                            rows={1}
                        />
                        <div className="flex items-center gap-1 pb-1">
                            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-600 h-9 w-9">
                                <Smile className="w-5 h-5" />
                            </Button>
                            <Button className="h-10 w-10 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shrink-0 shadow-lg shadow-purple-200">
                                <Send className="w-5 h-5 ml-0.5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}