

export const getPaymentStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case "paid":
      case "completed":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "failed":
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "partial":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
};