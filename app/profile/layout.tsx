export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        // فقط انیمیشن و استایل کانتینر باقی می‌ماند
        <div className="w-full h-full animate-in fade-in slide-in-from-bottom-3 duration-700">
            {children}
        </div>
    );
}