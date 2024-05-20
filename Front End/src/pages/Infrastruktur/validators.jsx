import { validateFullname, validateTelp } from "../../utils/helpers/validateForm";

export const isValidatorRelokasiAlat = (obj) => (
    validateFullname(obj.name_pic) &&
    validateTelp(obj.telp_pic)
  );
  