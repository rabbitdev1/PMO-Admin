import { validateArray, validateFile, validateFullname, validateHTML, validateImage, validatePeriod1, validateRadioBottom, validateTelp, validateText } from "../../utils/helpers/validateForm";



export const isValidatorPendaftaranMagang = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.name_pemohon, "Nama Pemohon");
  isValid = isValid && validateFile(obj.surat_permohonan, "Surat Permohonan");
  isValid = isValid && validatePeriod1(obj.period, "Waktu");
  isValid = isValid && validateFile(obj.surat_ket_mahasiswa, "Surat Keterangan Mahasiswa Aktif");
  isValid = isValid && validateImage(obj.pict_ktp, "Foto KTP");
  isValid = isValid && validateHTML(obj.reason, "Alasan Pengajuan");

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