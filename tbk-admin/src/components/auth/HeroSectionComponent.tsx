
export default function HeroSectionComponent() {
    return (
        <div className="relative hidden w-1/2 flex-col justify-center bg-gradient-sunset p-10 text-white lg:flex">
            <div className="z-20 space-y-4">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
                    TBK Villas
                </h1>
                <p className="text-lg opacity-80">
                    Manage your villa properties and track their performance effortlessly.
                </p>
            </div>
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-primary/20" />
        </div>
    );
}
