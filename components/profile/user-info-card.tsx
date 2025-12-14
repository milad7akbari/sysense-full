'use client'

import { useState } from "react";
import { User, Phone, Mail, Edit2, Check, X } from "lucide-react";

export function UserInfoCard() {
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
interface EditableFieldProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    isEditing: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
    type?: string;
}
function EditableField({ label, icon, value, isEditing, onChange, name, type = "text" }: EditableFieldProps) {
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