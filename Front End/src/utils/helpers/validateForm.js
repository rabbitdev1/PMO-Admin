import { toast } from "react-toastify";

export const validateFullname = (fullname) => {
  if (!fullname || fullname.length < 4) {
    toast.error("Nama Lengkap minimal 4 Huruf", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    toast.error("Email tidak valid", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateAddress = (address) => {
  if (!address || address.length < 10) {
    toast.error("Alamat minimal 10 karakter", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateRole = (role) => {
  if (!role || role.length === 0) {
    toast.error("Peran harus dipilih", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateTelp = (telp) => {
  if (telp?.startsWith("+62")) {
    telp = "0" + telp.slice(3);
  }
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!telp || !phoneRegex.test(telp)) {
    toast.error("Nomor telepon tidak valid, harus antara 10-15 digit", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!password || !passwordRegex.test(password)) {
    toast.error(
      "Password harus mengandung minimal 6 karakter, termasuk 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return false;
  }
  return true;
};

export const validateRepeatPassword = (password, repeatPassword) => {
  if (password !== repeatPassword) {
    toast.error("Password tidak cocok", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateImage = (image) => {
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

  if (!image) {
    toast.error("Gambar tidak boleh kosong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }

  if (!validImageTypes.includes(image.type)) {
    toast.error("Tipe file gambar tidak valid. Harus JPG, PNG, atau GIF", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }

  if (image.size > maxSizeInBytes) {
    toast.error("Ukuran file gambar tidak boleh lebih dari 2 MB", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }

  return true;
};


export const validateTypeTools = (type_tools,name) => {
  if (!type_tools || type_tools.length === 0) {
    toast.error(`${name} tidak boleh kosong`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};