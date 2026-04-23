import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  TrendingUp,
  Users,
  DollarSign,
  CalendarX,
  Clock
} from "lucide-react";

// Icon mapping
const iconMap = {
  DollarSign,
  Calendar,
  Users,
  Clock,
  CalendarX,
};

export default function StatCardComponent({ title, value, change, icon, gradient, trend, subtitle }) {

  // Determine the icon component to use
  const IconComponent = iconMap[icon as keyof typeof iconMap] || DollarSign;

  return(
    <Card className="overflow-hidden hover:shadow-medium transition-all duration-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {subtitle && (
            <p className="text-[11px] text-muted-foreground/70 mt-0.5 leading-tight">{subtitle}</p>
          )}
        </div>
        <div className={`p-2 rounded-lg ${gradient || 'bg-secondary'}`}>
          <IconComponent className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {change && (
          <p className={`text-xs flex items-center gap-1 mt-1 ${
            trend === 'up' ? 'text-green-600' :
            trend === 'down' ? 'text-red-600' :
            'text-gray-500'
          }`}>
            {trend === 'up' && <TrendingUp className="h-3 w-3" />}
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
