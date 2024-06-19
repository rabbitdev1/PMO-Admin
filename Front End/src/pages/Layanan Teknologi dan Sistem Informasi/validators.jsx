import { validateArray, validateFile, validateFullname, validateHTML, validatePeriod, validatePeriod1, validateTelp, validateTextArea } from "../../utils/helpers/validateForm";


export const isValidatorZoom = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validatePeriod1(obj.period, "Periode Jangka Waktu");

  return isValid;
};
export const isValidatorPermohonanLiputan = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateTextArea(obj.reason, "Alasan Dibutuhkan");
  isValid = isValid && validateTextArea(obj.location_implementation, "Tempat Pelaksanaan");
  isValid = isValid && validatePeriod1(obj.period, "Periode Jangka Waktu");

  return isValid;
};