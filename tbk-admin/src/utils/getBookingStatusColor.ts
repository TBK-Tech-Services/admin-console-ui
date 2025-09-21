
export const getBookingStatusColor = (status: string | undefined | null) => {
  if (!status) {
    return "bg-gray-100 text-gray-800 border-gray-200"; // default fallback
  }
  
  const statusLower = status.toLowerCase();
  switch (statusLower) {
    case "confirmed":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "pending":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    case "checked_in":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "checked_out":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};