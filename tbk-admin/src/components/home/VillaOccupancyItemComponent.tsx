
export default function VillaOccupancyItemComponent({ villa, occupancy, color }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{villa}</span>
        <span className="text-muted-foreground">{occupancy}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div
          className={`h-2 rounded-full ${color}`}
          style={{ width: `${occupancy}%` }}
        />
      </div>
    </div>
  );
}