
export const getPaymentStatusColor = (status: string | undefined | null) => {
  if (!status) {
    return "bg-gray-100 text-gray-800 border-gray-200"; // default fallback
  }
  
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "paid":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "failed":
      return "bg-red-100 text-red-800 border-red-200";
    case "refunded":
      return "bg-blue-100 text-blue-800 border-blue-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};