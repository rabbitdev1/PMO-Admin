import { validateArray, validateFile, validateFullname, validateHTML, validatePeriod1, validateTelp } from "../../utils/helpers/validateForm";


export const isValidatorUserAccountSI = (obj) => {
  console.log(obj);
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateArray(obj.account_type, "Jenis Akun");

  return isValid;
};
export const isValidatorPenerapanModulTTE = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateFile(obj.file_process_bisiness, 'Dokumen Proses Bisnis');
  isValid = isValid && validatePeriod1(obj.period, 'Jadwal Penerapan');

  return isValid;
};

export const isValidatorIntegrasi = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.needed_data, "Data Yang di Butuhkan");
  isValid = isValid && validateHTML(obj.integration, "Tujuan Integrasi");

  return isValid;
};

