
export default function TBKLogo({ className = "" }) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className="text-center">
                {/* TBK Text - Bold and Clear */}
                <div className="text-7xl font-bold tracking-wider">
                    <span className="text-orange-500">T</span>
                    <span className="text-orange-600">B</span>
                    <span className="text-orange-700">K</span>
                </div>
                {/* Villas Text */}
                <div className="text-base font-light tracking-[0.4em] text-gray-400 mt-2">
                    VILLAS
                </div>
            </div>
        </div>
    );
}