
export const getInitials = (name) => {
    if (!name || typeof name !== 'string') return "?";
    
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
};