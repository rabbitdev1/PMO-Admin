import { validateArray, validateFile, validateFullname, validateHTML, validatePeriod1, validateTelp } from "../../utils/helpers/validateForm";


export const isValidatorPendaftaranMagang = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.needed_data, "Data yang dibutuhkan");
  isValid = isValid && validateHTML(obj.integration, "Tujuan Integrasi");

  return isValid;
};