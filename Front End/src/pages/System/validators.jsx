import { validateText } from "../../utils/helpers/validateForm";

export const isValidatorListApps = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.name_apps, "Nama Aplikasi");

  return isValid;
};


