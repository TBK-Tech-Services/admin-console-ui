
export default function BookingSummaryComponent() {
  const summaryData = [
    { label: "Villa Rate (per night)", amount: "₹15,000" },
    { label: "Number of Nights", amount: "3" },
    { label: "Subtotal", amount: "₹45,000" },
    { label: "Taxes & Fees", amount: "₹5,400" },
  ];

  return (
    <div className="border-t pt-4 space-y-3">
      {summaryData.map((item, index) => (
        <div key={index} className="flex justify-between">
          <span className="text-muted-foreground">{item.label}</span>
          <span className="font-medium">{item.amount}</span>
        </div>
      ))}
      <div className="border-t pt-3">
        <div className="flex justify-between">
          <span className="text-lg font-semibold">Total Amount</span>
          <span className="text-lg font-bold text-primary">₹50,400</span>
        </div>
      </div>
    </div>
  );
}