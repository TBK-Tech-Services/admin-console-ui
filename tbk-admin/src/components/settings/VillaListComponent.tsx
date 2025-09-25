import VillaItemComponent from "./VillaItemComponent";

export default function VillaListComponent({villasData}) {
  return (
    <div className="space-y-4">
      {villasData?.map((villa) => (
        <VillaItemComponent key={villa.id} villa={villa} />
      ))}
    </div>
  );
}
