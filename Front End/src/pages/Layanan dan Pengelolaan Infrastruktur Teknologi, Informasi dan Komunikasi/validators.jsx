import { validateArray, validateFullname, validateHTML, validateImage, validateIPAddress, validatePeriod1, validateRadioBottom, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorRelokasiAlat = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.type_tools, "Jenis Alat yang direlokasikan");
  isValid = isValid && validateText(obj.distance_estimation, "Estimati Jarak");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateRadioBottom(obj.status, 'Status');

  return isValid;
};

export const isValidatorPenambahanAlat = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.type_tools, "Jenis Alat yang dibutuhkan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};

export const isValidatorPenambahanBandwith = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.initial_bandwith, "Bandtwith Awal");
  isValid = isValid && validateArray(obj.proposed_bandwidth, "Bandtwith Usulan");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  // if (obj.status_BDO === 'temporary') {
  //   isValid = isValid && validatePeriod(obj.period, "Periode Jangka Waktu");
  // }

  return isValid;
};

export const isValidatorTroubleShooting = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.incident, "Waktu Kejadian");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateImage(obj.image_screenshoot, "Screenshot");

  return isValid;
};

export const isValidatorHosting = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app, "Nama Aplikasi");
  isValid = isValid && validateTextArea(obj.other_requirements, "Requirement Lainnya");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};

export const isValidatorDomain = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.app, "Nama Aplikasi");
  isValid = isValid && validateText(obj.domain_name, "Usulan Domain");
  isValid = isValid && validateIPAddress(obj.ip_address, "IP Address");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};


