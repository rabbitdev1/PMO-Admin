import { validateArray, validateFile, validateFullname, validateHTML, validateImage, validateIPAddress, validatePeriod1, validateRadioBottom, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorPenyusunaKebijakan = (obj) => {
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
export const isValidatorPendataanAhli = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.nama_ahli, "Nama Ahli");
  isValid = isValid && validateArray(obj.bidang_keahlian, "Bidang Keahlian");
  isValid = isValid && validateHTML(obj.pengalaman, "Pengalaman");
  isValid = isValid && validateHTML(obj.job_desk, "Job Desk");
  isValid = isValid && validatePeriod1(obj.timeline_kontrak, "Timeline Kontrak");
  isValid = isValid && validateRadioBottom(obj.terdaftar_lpse, "Terdaftar di LPSE");
  isValid = isValid && validateFile(obj.nilai_kontrak, "Nilai Kontrak");

  return isValid;
};
