export const CapitalizeName = (name) => {
  if (!name) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
};
