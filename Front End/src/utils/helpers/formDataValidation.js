export const validateFormData = (data) => {
  let hasEmptyValue = false;

  const checkEmptyValue = (value) => {
    if (!value || (Array.isArray(value) && value.length === 0)) {
      return true;
    } else if (typeof value === "object" && Object.keys(value).length === 0) {
      return true;
    }
    return false;
  };

  const traverseData = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        if (obj[key] instanceof File) {
          // Periksa jika objek adalah instance dari File
          if (!obj[key].name) {
            console.log(`File for ${key} is empty or not selected`);
            hasEmptyValue = true;
          }
        } else {
          traverseData(obj[key]);
        }
      } else if (checkEmptyValue(obj[key])) {
        console.log(`Value for ${key} is empty or null`);
        hasEmptyValue = true;
      }
    }
  };

  traverseData(data);
  return hasEmptyValue;
};
