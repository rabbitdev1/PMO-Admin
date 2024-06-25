import { validateArray, validateFile, validateFullname, validatePeriod, validateRadioBottom, validateTelp, validateText, validateTextArea } from "../../utils/helpers/validateForm";

export const isValidatorPermohonanSI = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.name_pic, "Nama PIC");
  isValid = isValid && validateTelp(obj.telp_pic, "Nomor PIC");
  isValid = isValid && validateText(obj.title_kak, "Judul KAK");
  isValid = isValid && validateFullname(obj.name_PPK, "Nama PPK");
  isValid = isValid && validateText(obj.besaran_anggaran, "Besaran Anggaran");
  isValid = isValid && validateText(obj.anggaran_attachment, "Sumber Anggaran");
  isValid = isValid && validateText(obj.lingkup_job, "Lingkup Pekerjaan");
  isValid = isValid && validateText(obj.number_of_people_required, "Jumlah Tenaga yang dibutuhkan");
  isValid = isValid && validateText(obj.skpd_request_letter, "SKPD");

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
  isValid = isValid && validateText(obj.dataSource, "Sumber Data");
  isValid = isValid && validateText(obj.cloudLocation, "Lokasi Cloud");

  return isValid;
};

export const isValidatorStepper3 = (obj) => {
  let isValid = true;
  isValid = isValid && validateArray(obj.programmingLanguage, "Bahasa Pemrograman");
  isValid = isValid && validateArray(obj.database, "Database");
  isValid = isValid && validateArray(obj.type_platform, "Jenis Platform");
  isValid = isValid && validateArray(obj.storage, "Media Penyimpanan");
  isValid = isValid && validateArray(obj.ramSpecifications, "RAM");
  isValid = isValid && validateArray(obj.cpuSpecifications, "CPU");
  isValid = isValid && validateArray(obj.hardDiskSpecifications, "HARDISK");
  isValid = isValid && validateTextArea(obj.reasonForChoosingStorage, "Alasan Pemilihan Media Penyimpanan");
  isValid = isValid && validateArray(obj.storageMedia, "Media Penyimpanan");
  isValid = isValid && validateArray(obj.serverRentalLocation, "Lokasi Sewa Server");
  isValid = isValid && validateArray(obj.cloudLocation, "Lokasi Cloud");

  return isValid;
};


export const isValidatorStepper4 = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.integrationWithSystem, "Integrasi Dengan Sistem");
  isValid = isValid && validateText(obj.exchangeFormat, "Format Penukaran");
  isValid = isValid && validateTextArea(obj.reasonForIntegration, "Alasan Integrasi");
  isValid = isValid && validateText(obj.proposedDomain, "Domain Usulan");

  return isValid;
};

export const isValidatorStepper5 = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.title, "Judul");
  isValid = isValid && validateText(obj.namePPK, "Nama PPK");
  isValid = isValid && validateText(obj.linkupJob, "Linkup Pekerjaan");
  isValid = isValid && validateText(obj.numberOfPeopleRequired, "Jumlah Tenaga Yang Dibutuhkan");

  isValid = isValid && validatePeriod(obj.letterDate, "Tanggal Surat");
  isValid = isValid && validateFile(obj.technicalRecommendationLetter, "Surat Rekomendasi Teknis");
  isValid = isValid && validateFile(obj.anggaranAttachment, "Lampiran Dokumen Pelaksanaan Anggaran");
  isValid = isValid && validateRadioBottom(obj.spbePlan, "PETA Rencana SPBE OPD");
  isValid = isValid && validateRadioBottom(obj.riskManagement, "manajemen risiko SPBE");
  isValid = isValid && validateArray(obj.reformasiBirokrasi, "Reformasi Birokrasi (RB) Tematik");

  return isValid;
};





