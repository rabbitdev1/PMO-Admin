export const formatArray = (array) => {
  return array.map((item) => {
    return item
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  });
};