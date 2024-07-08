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

// export const formatMultiDate = ({ startDate, endDate }) => {
//   const formatDate = (isoString) => {
//     const date = new Date(isoString);
//     return date.toLocaleDateString("id-ID", {
//       day: "numeric",
//       month: "long",
//       year: "numeric",
//     });
//   };

//   const formattedStartDate = formatDate(startDate);
//   const formattedEndDate = formatDate(endDate);

//   if (startDate === endDate) {
//     return formattedStartDate;
//   } else {
//     return `${formattedStartDate} s/d ${formattedEndDate}`;
//   }
// };

export const formatMultiDate = (dateArray) => {
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (dateArray.length === 0) {
    return '';
  }

  const formattedDates = dateArray.map(formatDate);

  if (dateArray.length === 1) {
    return formattedDates[0];
  } else {
    return `${formattedDates[0]} s/d ${formattedDates[dateArray.length - 1]}`;
  }
};
