import { validateAddress, validateArray, validateFullname, validateHTML, validatePeriod, validateRadioBottom, validateTelp } from "../../utils/helpers/validateForm";

export const isValidatorRelokasiAlat = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.type_tools, "Jenis Alat yang direlokasikan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateAddress(obj.full_address, "Alamat");
  isValid = isValid && validateRadioBottom(obj.status, 'Status');

  return isValid;
};

export const isValidatorPenambahanAlat = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.type_tools, "Jenis Alat yang dibutuhkan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateAddress(obj.full_address, "Alamat");

  return isValid;
};

export const isValidatorPenambahanBandwith = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.initial_bandwith, "Bandtwith Awal");
  isValid = isValid && validateArray(obj.proposed_bandwidth, "Bandtwith Usulan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateRadioBottom(obj.status_BDO, 'Status BDO');

  if (obj.status_BDO === 'temporary') {
    isValid = isValid && validatePeriod(obj.period, "Periode Jangka Waktu");
  }

  return isValid;
};
