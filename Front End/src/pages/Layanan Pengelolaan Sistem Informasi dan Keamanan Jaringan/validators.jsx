import { validateArray, validateEmail, validateFile, validateFullname, validateHTML, validatePassword, validatePeriod, validatePeriod1, validateRadioBottom, validateRepeatPassword, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorUserAccountSI = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.submission_type_user_account, "Jenis Pengajuan");
  


  if (obj.submission_type_user_account === 'reset_password') {
    isValid = isValid && validatePassword(obj.new_password, "Password Baru");
    isValid = isValid && validateRepeatPassword(obj.new_password, obj.repeat_password);
    isValid = isValid && validateArray(obj.submission_type_user_account, "Jenis Pengajuan");
    isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  } else if (obj.submission_type_user_account === 'new_account') {
    isValid = isValid && validateArray(obj.account_type, "Jenis Akun");
    isValid = isValid && validateText(obj.name, "Nama PPK");
    isValid = isValid && validateTelp(obj.telp, "Nomor Handphone");
    isValid = isValid && validateEmail(obj.email, "Email");
    isValid = isValid && validateText(obj.origin_agency, "Asal Instansi");
    isValid = isValid && validateArray(obj.submission_type_user_account, "Jenis Pengajuan");
    isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  }
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
  isValid = isValid && validateText(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.needed_data, "Data Yang di Butuhkan");
  isValid = isValid && validateHTML(obj.integration, "Tujuan Integrasi");

  return isValid;
};

export const isValidatorEmail = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.jabatan, "Jabatan");
  isValid = isValid && validateText(obj.nip, "NIP");
  isValid = isValid && validateArray(obj.peruntukan, "Peruntukan");
  isValid = isValid && validateHTML(obj.reason, "Alasan");

  return isValid;
};

export const isValidatorPengujianCelahKeamanan = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.app, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateText(obj.app_version, "Versi Aplikasi");
  isValid = isValid && validateArray(obj.app_ownership, "Kepemilikan Aplikasi");
  isValid = isValid && validateText(obj.username, "Nama Akun");
  isValid = isValid && validatePassword(obj.password, "Password");
  isValid = isValid && validateText(obj.domain_url, "Domain URL");
  isValid = isValid && validateFile(obj.file_process_bisiness, "Dokumen Proses Bisnis");

  return isValid;
};
