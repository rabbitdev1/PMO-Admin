import { validateArray, validateFullname, validateHTML, validateImage, validateIPAddress, validatePeriod1, validateRadioBottom, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorLayananZoom = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateTextArea(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validatePeriod1(obj.period, "Periode Jangka Waktu");

  return isValid;
};

export const isValidatorpermohonanLiputan = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");

  return isValid;
};
