import AgentVillaCardComponent from "./AgentVillaCardComponent";

export default function AgentVillaShowcaseComponent({ villas, onViewDetails, isLoading }) {

    // Loading state
    if (isLoading) {
        return (
            <section className="py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-foreground mb-4">
                            Loading Villas...
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {[1, 2, 3, 4].map((n) => (
                            <div key={n} className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-foreground mb-4">
                        Our Premium Villa Collection
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Each villa offers a unique experience with world-class amenities and stunning locations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
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