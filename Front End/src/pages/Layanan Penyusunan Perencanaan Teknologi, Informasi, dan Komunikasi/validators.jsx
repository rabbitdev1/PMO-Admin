import { validateArray, validateFile, validateFullname, validateHTML, validateTelp, validateText } from "../../utils/helpers/validateForm";

export const isValidatorSuratKeputusan = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.needed_data, "Data yang dibutuhkan");
  isValid = isValid && validateHTML(obj.integration, "Tujuan Integrasi");

  return isValid;
};
export const isValidatorPerwalKepwal = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.bidang, "Bidang");
  isValid = isValid && validateArray(obj.jenis_kebijakan, "Jenis Kebijakan");
  isValid = isValid && validateHTML(obj.ruang_lingkup, "Ruang Lingkup");
  isValid = isValid && validateFile(obj.draft_perwal, "Draft Perwal");
  isValid = isValid && validateHTML(obj.reason, "Alasan dibutuhkan");

  return isValid;
};
