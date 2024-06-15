import { validateArray, validateFile, validateFullname, validateHTML, validatePassword, validatePeriod, validatePeriod1, validateRadioBottom, validateRepeatPassword, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";


export const isValidatorUserAccountSI = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");
  isValid = isValid && validateArray(obj.submission_type_user_account, "Jenis Pengajuan");


  if (obj.submission_type_user_account === 'reset_password') {
    isValid = isValid && validatePassword(obj.password, "Password Lama");
    isValid = isValid && validatePassword(obj.new_password, "Password Lama");
    isValid = isValid && validateRepeatPassword(obj.new_password, obj.repeat_password);
  } else if (obj.submission_type_user_account === 'new_account') {
    isValid = isValid && validateArray(obj.account_type, "Jenis Akun");

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
  isValid = isValid && validateArray(obj.app_name, "Nama Aplikasi");
  isValid = isValid && validateHTML(obj.app_desc, "Deskripsi Aplikasi");
  isValid = isValid && validateHTML(obj.needed_data, "Data Yang di Butuhkan");
  isValid = isValid && validateHTML(obj.integration, "Tujuan Integrasi");

  return isValid;
};

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





