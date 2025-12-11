export default function MessagesLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="w-full h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            {children}
        </div>
    );
}