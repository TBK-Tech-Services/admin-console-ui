
export const formatDateForInput = (isoDate) => {
  if (!isoDate){
    return "";
  };
  return new Date(isoDate).toISOString().split('T')[0];
};
