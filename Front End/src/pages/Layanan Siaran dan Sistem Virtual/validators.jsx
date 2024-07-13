import { validateFile, validateFullname, validateHTML, validatePeriod1, validateRadioBottom, validateTelp, validateText } from "../../utils/helpers/validateForm";


export const isValidatorZoom = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateFile(obj.file_pengajuan_zoom, "Dokumen Peminjaman Zoom");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};
export const isValidatorPermohonanLiputan = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.type_activity, "Jenis Kegiatan");
  isValid = isValid && validateHTML(obj.location_implementation, "Tempat Pelaksanaan");
  isValid = isValid && validateRadioBottom(obj.live_streaming, "Siaran Langsung");
  isValid = isValid && validatePeriod1(obj.period, "Waktu");
  isValid = isValid && validateHTML(obj.needed_tools, "Kebutuhan Alat");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};

export const isValidatorPermohonanPodcast = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateHTML(obj.location_implementation, "Tempat Pelaksanaan");
  isValid = isValid && validatePeriod1(obj.period, "Waktu");
  isValid = isValid && validateHTML(obj.needed_tools, "Kebutuhan Alat");
  isValid = isValid && validateText(obj.speaker, "Narasumber/Pembicara");
  isValid = isValid && validateText(obj.topic, "Tema/Topik");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

  return isValid;
};