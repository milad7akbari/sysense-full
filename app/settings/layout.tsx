export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full animate-in fade-in slide-in-from-bottom-3 duration-700">
            <div className="max-w-4xl mx-auto space-y-6">
                {children}
            </div>
        </div>
    );
}