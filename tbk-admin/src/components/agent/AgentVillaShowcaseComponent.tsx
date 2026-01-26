import AgentVillaCardComponent from "./AgentVillaCardComponent";

export default function AgentVillaShowcaseComponent({ villas, onViewDetails, isLoading }) {

    // Loading state
    if (isLoading) {
        return (
            <section className="py-12 sm:py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
                            Loading Villas...
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="animate-pulse bg-gray-200 h-64 sm:h-96 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-12 sm:py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-16">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                        Our Premium Villa Collection
                    </h2>
                    <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
                        Each villa offers a unique experience with world-class amenities and stunning locations
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    {villas.map((villa) => (
                        <AgentVillaCardComponent
                            key={villa.id}
                            villa={villa}
                            onViewDetails={() => onViewDetails(villa)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}