import { validateArray, validateFile, validateFullname, validatePeriod, validateRadioBottom, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorPembangunan = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.applicationType, "Jenis Pengajuan");
  isValid = isValid && validateText(obj.applicationName, "Nama Aplikasi");
  isValid = isValid && validateTextArea(obj.applicationDescription, "Deskripsi Aplikasi");
  isValid = isValid && validateArray(obj.applicationOwnership, "Kepemilikan Aplikasi");

  return isValid;
};

export const isValidatorPengembangan = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.applicationType, "Jenis Pengajuan");
  isValid = isValid && validateArray(obj.applicationName, "Nama Aplikasi");
  isValid = isValid && validateTextArea(obj.developmentAspect, "Hal yang dikembangkan");
  isValid = isValid && validateArray(obj.developmentGoal, "Tujuan Pengembangan");
  isValid = isValid && validateArray(obj.applicationOwnership, "Kepemilikan Aplikasi");

  return isValid;
};

export const isValidatorStepper2 = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateArray(obj.developmentTechnique, "Teknik Pengembangan");
  isValid = isValid && validateArray(obj.developmentDuration, "Lama Pengembangan");
  isValid = isValid && validateArray(obj.fundingSource, "Sumber Anggaran");
  isValid = isValid && validateText(obj.budgetAmount, "Besar Anggaran");
  isValid = isValid && validateArray(obj.clusterCategory, "Kategori Klaster");
  isValid = isValid && validateArray(obj.programmingLanguage, "Bahasa Pemrograman");

  return isValid;
};

export const isValidatorStepper3 = (obj) => {
  let isValid = true;
  isValid = isValid && validateArray(obj.storageMedia, "Media Penyimpanan");
  isValid = isValid && validateTextArea(obj.reasonForChoosingStorageMedia, "Alasan Pemilihan Media Penyimpanan");
  isValid = isValid && validateText(obj.dataSource, "Sumber Data");

  return isValid;
};


export const isValidatorStepper4 = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.letterNumber, "Nomor Surat");
  isValid = isValid && validatePeriod(obj.letterDate, "Tanggal Surat");
  isValid = isValid && validateFile(obj.skpdRequestLetter, "Surat Permohonan SKPD");
  isValid = isValid && validateFile(obj.kakAttachment, "Lampiran KAK");
  isValid = isValid && validateRadioBottom(obj.spbePlan, "PETA Rencana SPBE OPD");
  isValid = isValid && validateRadioBottom(obj.riskManagement, "manajemen risiko SPBE");
  isValid = isValid && validateArray(obj.reformasiBirokrasi, "Reformasi Birokrasi (RB) Tematik");

  return isValid;
};





