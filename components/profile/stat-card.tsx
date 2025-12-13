import { ArrowUpRight } from "lucide-react";

interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    subText: string;
    bg: string;
    trend: 'up' | 'neutral';
}

export function StatCard({ icon, label, value, subText, bg, trend }: StatCardProps) {
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