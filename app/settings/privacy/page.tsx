import { ShieldCheck, Eye, Lock, Globe } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">حریم خصوصی و امنیت</h1>
                <p className="text-sm text-slate-400 mt-1">کنترل دسترسی‌ها و نمایش اطلاعات شما</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                            <Eye className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-800">قابلیت مشاهده</h3>
                    </div>

                    <div className="space-y-4">
                        <RadioItem
                            name="visibility"
                            label="عمومی"
                            desc="همه می‌توانند پروفایل و پست‌های شما را ببینند."
                            icon={<Globe className="w-4 h-4" />}
                            checked
                        />
                        <RadioItem
                            name="visibility"
                            label="خصوصی"
                            desc="فقط دنبال‌کنندگان تایید شده دسترسی دارند."
                            icon={<Lock className="w-4 h-4" />}
                        />
                    </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="font-bold text-slate-800">داده‌ها و دسترسی‌ها</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <div>
                                <p className="text-sm font-bold text-slate-800">دانلود آرشیو اطلاعات</p>
                                <p className="text-xs text-slate-500 mt-1">دریافت فایل کامل تمام فعالیت‌های شما</p>
                            </div>
                            <button className="text-xs font-bold bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-100 transition-colors">
                                درخواست
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function RadioItem({ name, label, desc, icon, checked }: any) {
    return (
        <label className="flex items-start gap-4 p-4 rounded-2xl border border-transparent hover:border-slate-100 hover:bg-slate-50 cursor-pointer transition-all has-[:checked]:border-purple-200 has-[:checked]:bg-purple-50/50">
            <input type="radio" name={name} defaultChecked={checked} className="mt-1 w-4 h-4 accent-purple-600" />
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-slate-400">{icon}</span>
                    <span className="font-bold text-sm text-slate-800">{label}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
            </div>
        </label>
    )
}