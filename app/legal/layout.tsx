export default function Link({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a href={href} className="text-jjk-blue hover:underline">
            {children}
        </a>
    );
}

export function LegalLayout({ children, title }: { children: React.ReactNode; title: string }) {
    return (
        <div className="min-h-screen bg-black text-white p-8 md:p-20 font-sans">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-serif text-jjk-red mb-8">{title}</h1>
                <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-lg shadow-lg space-y-6 text-gray-300 leading-relaxed">
                    {children}
                </div>
            </div>
        </div>
    );
}
