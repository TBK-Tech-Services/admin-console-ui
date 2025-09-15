import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VillaPerformanceListComponentProps {
  villaData: any[];
}

export default function VillaPerformanceListComponent({ villaData }: VillaPerformanceListComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Villa Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {villaData.map((villa, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div>
                <h4 className="font-medium text-foreground">{villa.name}</h4>
                <p className="text-sm text-muted-foreground">
                  Income: ₹{villa.income.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-success">
                  ₹{villa.profit.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Profit</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}