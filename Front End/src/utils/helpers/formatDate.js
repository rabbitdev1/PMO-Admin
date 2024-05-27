export const formatDate = (isoString) => {
  const date = new Date(isoString);
  const formattedDate = date.toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return `${formattedDate} ${formattedTime}`;
};

export const formatMultiDate = (isoStringArray) => {
  const formattedDates = isoStringArray.map((isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  });

  return `${formattedDates[0]} s/d ${formattedDates[1]}`;
};