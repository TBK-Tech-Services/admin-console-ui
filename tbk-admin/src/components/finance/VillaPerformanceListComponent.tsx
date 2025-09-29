import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface VillaPerformanceListComponentProps {
  villaData: Array<{
    villaId: number;
    villaName: string;
    income: number;
    profit: number;
    profitMargin: number;
  }>;
}

export default function VillaPerformanceListComponent({ villaData }: VillaPerformanceListComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Villa Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {villaData && villaData.length > 0 ? (
            villaData.map((villa) => (
              <div 
                key={villa.villaId} 
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div>
                  <h4 className="font-medium text-foreground">{villa.villaName}</h4>
                  <p className="text-sm text-muted-foreground">
                    Income: ₹{villa.income.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${villa.profit >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {villa.profit >= 0 ? '₹' : '-₹'}
                    {Math.abs(villa.profit).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Profit ({villa.profitMargin}%)
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No villa performance data available
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}