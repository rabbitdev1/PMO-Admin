import { validateArray, validateFile, validateFullname, validateHTML, validatePeriod1, validateTelp } from "../../utils/helpers/validateForm";


export const isValidatorPendaftaranMagang = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");

  return isValid;
};