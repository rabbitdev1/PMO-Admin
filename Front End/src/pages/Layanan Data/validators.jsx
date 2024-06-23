import { validateFile, validateFullname, validateHTML, validateTelp, validateText } from "../../utils/helpers/validateForm";


export const isValidatorPendampinganPengolahandanAnalisisData = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateFile(obj.file_data, "File Data");
  isValid = isValid && validateFile(obj.surat_permohonan, "Surat Permohonan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  
  return isValid;
};
export const isValidatorProduksiDataSitusWeb = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateFile(obj.surat_permohonan, "Surat Permohonan");
  isValid = isValid && validateText(obj.alamat_website, "Alamat Website");
  isValid = isValid && validateHTML(obj.needed_data, "Data yang dibutuhkan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  
  return isValid;
};