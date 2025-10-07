import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";

interface MonthlySummaryCardProps {
    title: string;
    value: string;
    change: number;
    subtitle?: string;
    icon: LucideIcon;
    gradientClass: string;
}

export default function OwnerMonthlySummaryCardComponent({
    title,
    value,
    change,
    subtitle,
    icon: Icon,
    gradientClass,
}: MonthlySummaryCardProps) {
    const isPositive = change >= 0;

    return (
        <Card className="border-border shadow-soft">
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <div className={`p-2 rounded-lg ${gradientClass}`}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                    </div>
                    <div
                        className={`flex items-center text-sm font-medium ${isPositive ? "text-success" : "text-destructive"
                            }`}
                    >
                        {isPositive ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(change).toFixed(1)}%
                    </div>
                </div>
                <div className="text-3xl font-bold text-foreground">{value}</div>
                {subtitle && (
                    <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
                )}
            </CardContent>
        </Card>
    );
}