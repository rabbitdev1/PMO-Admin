import { validateArray, validateFile, validateFullname, validateHTML, validateImage, validatePeriod1, validateTelp, validateText } from "../../utils/helpers/validateForm";



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
