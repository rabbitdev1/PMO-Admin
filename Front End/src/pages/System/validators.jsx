import { validateAddress, validateEmail, validateFullname, validateImage, validateNIP, validatePassword, validateRepeatPassword, validateRole, validateTelp, validateText } from "../../utils/helpers/validateForm";

export const isValidatorListApps = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.name_apps, "Nama Aplikasi");

  return isValid;
};


export const isValidatorCreateProfile = (obj) => {
  let isValid = true;
  isValid = isValid && validateFullname(obj.fullname, "Nama Lengkap");
  isValid = isValid && validateNIP(obj.nip, "Nomor Induk Pegawai");
  isValid = isValid && validateEmail(obj.email, "Email");
  isValid = isValid && validateAddress(obj.address, "Alamat Lengkap");
  isValid = isValid && validateRole(obj.role, "Role");
  isValid = isValid && validateText(obj.instansi, "Instansi");
  isValid = isValid && validateImage(obj.image,  "Foto Profil");
  isValid = isValid && validateTelp(obj.telp, "Nomor Telepon");
  isValid = isValid && validatePassword(obj.password, "Password");
  isValid = isValid && validateRepeatPassword(obj.password, obj.repeat_password)

  return isValid;
};

export const isValidatorEditPengguna = (obj) => {
  let isValid = true;
  isValid = isValid && validateText(obj.fullname, "Nama Lengkap");
  isValid = isValid && validateNIP(obj.nip, "Nomor Induk Pegawai");
  isValid = isValid && validateEmail(obj.email, "Email Pengguna");
  isValid = isValid && validateAddress(obj.address, "Alamat Lengkap");
  isValid = isValid && validateTelp(obj.telp, "Nomor Telepon");
  return isValid;
};

