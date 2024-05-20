import { validateAddress, validateArray, validateFullname, validateRadioBottom, validateHTML, validateTelp } from "../../utils/helpers/validateForm";

export const isValidatorRelokasiAlat = (obj) => (
  validateFullname(obj.name_pic,"Nama PIC") &&
  validateTelp(obj.telp_pic,"Nomor PIC") &&
  validateArray(obj.type_tools, "Jenis Alat yang direlokasikan") &&
  validateHTML(obj.reason, "Alasan Pengajuan") &&
  validateAddress(obj.full_address, "Alamat") &&
  validateRadioBottom(obj.status,'Status')
);
