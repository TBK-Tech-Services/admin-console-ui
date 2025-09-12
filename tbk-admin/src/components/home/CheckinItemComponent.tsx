
interface CheckinItemComponentProps {
  label: string;
  count: string;
  amount: string;
}

export default function CheckinItemComponent({ label, count, amount }: CheckinItemComponentProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <div className="font-medium">{label}</div>
        <div className="text-sm text-muted-foreground">{count}</div>
      </div>
      <div className="font-bold text-primary">{amount}</div>
    </div>
  );
}
