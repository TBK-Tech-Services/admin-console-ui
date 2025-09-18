
export const getVillaStatusColor = (status: string) => {
  const statusUpper = status.toUpperCase();
  switch (statusUpper) {
    case "AVAILABLE":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "OCCUPIED":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "MAINTENANCE":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};
