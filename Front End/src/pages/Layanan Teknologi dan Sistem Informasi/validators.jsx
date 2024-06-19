import { validateArray, validateFile, validateFullname, validateHTML, validatePeriod, validatePeriod1, validateTelp } from "../../utils/helpers/validateForm";


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
  isValid = isValid && validateHTML(obj.needed_reason, "Alasan Dibutuhkan");
  isValid = isValid && validateHTML(obj.location_implementation, "Tempat Pelaksanaan");
  isValid = isValid && validatePeriod1(obj.period, "Periode Jangka Waktu");

  return isValid;
};