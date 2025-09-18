
// Helper to Format a Date Range
export const formatDateRange = (checkIn, checkOut) => {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  
  const options = { 
    day: 'numeric', 
    month: 'short' 
  };
  
  const start = startDate.toLocaleDateString('en-GB', options);
  const end = endDate.toLocaleDateString('en-GB', options);
  
  return `${start} - ${end}`;
};

// Helper to Format a Date
export const formatDate = (bookedOn) => {
  const bookedOnDate = new Date(bookedOn);
  
  const options = { 
    day: 'numeric', 
    month: 'short' 
  };
  
  const bookingDate = bookedOnDate.toLocaleDateString('en-GB', options);
  
  return `${bookingDate}`;
};

// Helper to Calculate Total Days of Stay
export const calculateTotalDaysOfStay = (checkIn, checkOut) => {
  const startDate = new Date(checkIn);
  const endDate = new Date(checkOut);
  
  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
  return totalDays;
};
