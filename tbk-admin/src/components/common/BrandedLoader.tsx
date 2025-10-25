import TBKLogo from "./TBKLogo";

export default function BrandedLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
            <div className="relative">
                {/* Single Subtle Ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 rounded-full border-2 border-orange-500/20 animate-pulse"></div>
                </div>

                {/* Logo - Clean and Clear */}
                <div className="relative z-10">
                    <TBKLogo />
                </div>

                {/* Simple Loading Dots */}
                <div className="flex justify-center gap-2 mt-6">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
            </div>
        </div>
    );
}