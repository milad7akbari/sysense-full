import { Bell, Mail } from "lucide-react";

export default function NotificationsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">تنظیمات اعلان‌ها</h1>
                <p className="text-sm text-slate-400 mt-1">مدیریت نحوه اطلاع‌رسانی‌ها و پیام‌ها</p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm space-y-8">
                <NotificationGroup
                    icon={<Bell className="w-5 h-5 text-purple-600" />}
                    title="اعلان‌های سیستمی"
                    description="دریافت پیام‌های مربوط به فعالیت‌های داخل اپلیکیشن"
                >
                    <ToggleItem label="لایک و کامنت روی پست‌ها" defaultChecked />
                    <ToggleItem label="دنبال‌کنندگان جدید" defaultChecked />
                    <ToggleItem label="پیشنهادهای استایل هوشمند" />
                </NotificationGroup>

                <div className="w-full h-px bg-slate-100" />

                <NotificationGroup
                    icon={<Mail className="w-5 h-5 text-blue-600" />}
                    title="اعلان‌های ایمیلی"
                    description="خبرنامه‌ها و گزارش‌های هفتگی"
                >
                    <ToggleItem label="خلاصه فعالیت‌های هفتگی" defaultChecked />
                    <ToggleItem label="تخفیف‌ها و پیشنهادهای ویژه" />
                </NotificationGroup>
            </div>
        </div>
    );
}
interface NotificationGroupProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    children: React.ReactNode;
}
function NotificationGroup({ icon, title, description, children }: NotificationGroupProps) {
    return (
        <div>
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center border border-slate-100">
                    {icon}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{title}</h3>
                    <p className="text-xs text-slate-400">{description}</p>
                </div>
            </div>
            <div className="space-y-4 pr-13">
                {children}
            </div>
        </div>
    )
}
interface ToggleItemProps {
    label: string;
    defaultChecked?: boolean;
}
function ToggleItem({ label, defaultChecked }: ToggleItemProps) {
    return (
        <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
        </div>
    )
}