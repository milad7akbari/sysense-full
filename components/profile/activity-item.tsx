interface ActivityItemProps {
    icon: React.ReactNode;
    bg: string;
    title: string;
    desc: string;
    time: string;
    status: string;
    statusColor: string;
}

export function ActivityItem({ icon, bg, title, desc, time, status, statusColor }: ActivityItemProps) {
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
    );
}