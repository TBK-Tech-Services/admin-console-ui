import VillaItemComponent from "./VillaItemComponent";

const villasData = [
  { name: "Sunset Villa", capacity: 4, rate: "₹15,000" },
  { name: "Ocean View", capacity: 6, rate: "₹22,500" },
  { name: "Palm Paradise", capacity: 8, rate: "₹18,000" },
  { name: "Coconut Grove", capacity: 10, rate: "₹28,000" },
];

export default function VillaListComponent() {
  return (
    <div className="space-y-4">
      {villasData.map((villa) => (
        <VillaItemComponent key={villa.name} villa={villa} />
      ))}
    </div>
  );
}
