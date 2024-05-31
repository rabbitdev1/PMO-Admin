import { validateAddress, validateArray, validateFile, validateFullname, validateHTML, validateImage, validateIPAddress, validatePeriod, validatePeriod1, validateRadioBottom, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorUserAccountSI = (obj) => {
  console.log(obj);
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  // isValid = isValid && validateArray(obj.account_type, "Jenis Akun");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};
export const isValidatorPenerapanModulTTE = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateFile(obj.file_submission, 'Dokumen Proses Bisnis');
  isValid = isValid && validatePeriod1(obj.period, 'Jadwal Penerapan');

  return isValid;
};
