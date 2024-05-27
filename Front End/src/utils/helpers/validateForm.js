import { toast } from "react-toastify";

export const validateFullname = (value, title) => {
  if (!value || value.length < 4) {
    toast.error(title + " minimal 4 Huruf", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateEmail = (value, title) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!value || !emailRegex.test(value)) {
    toast.error(title + "tidak valid", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateAddress = (value, title) => {
  if (!value || value.length < 1) {
    toast.error(title + "Tidak boleh Kosong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};
export const validateText = (value, title) => {
  if (!value || value.length < 1) {
    toast.error(title + " Tidak boleh Kosong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateRole = (value, title) => {
  if (!value || value.length === 0) {
    toast.error(title + " harus dipilih", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateTelp = (value, title) => {
  if (value?.startsWith("+62")) {
    value = "0" + value.slice(3);
  }
  const phoneRegex = /^[0-9]{10,15}$/;
  if (!value || !phoneRegex.test(value)) {
    toast.error(title + " tidak valid, harus antara 10-15 digit", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validatePassword = (value, title) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  if (!value || !passwordRegex.test(value)) {
    toast.error(
      "Password pada " +
        title +
        " harus mengandung minimal 6 karakter, termasuk 1 huruf besar, 1 huruf kecil, 1 angka, dan 1 simbol",
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

export const validateImage = (value, title) => {
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxSizeInBytes = 2 * 1024 * 1024; // 2 MB

  if (!value) {
    toast.error("Gambar pada " + title + " tidak boleh kosong", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }

  if (!validImageTypes.includes(value.type)) {
    toast.error(
      "Tipe file gambar pada " +
        title +
        " tidak valid. Harus JPG, PNG, atau GIF",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return false;
  }

  if (value.size > maxSizeInBytes) {
    toast.error(
      "Ukuran file gambar pada " + title + " tidak boleh lebih dari 2 MB",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return false;
  }

  return true;
};

export const validateArray = (value, title) => {
  if (!value || value.length === 0) {
    toast.error(title + ` tidak boleh kosong`, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateHTML = (value, title) => {
  // Regex untuk memastikan format awal benar
  const regex = /^<p>(.*?)<\/p>\n$/;
  const match = value.match(regex);

  if (match) {
    const content = match[1]; // Ambil konten di dalam tag <p>
    const wordCount = content.trim().split(/\s+/).length; // Hitung jumlah kata
    if (wordCount >= 1) {
      return true;
    } else {
      toast.error(title + " Tidak Boleh Kosong", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return false;
    }
  } else {
    toast.error(
      title + "Invalid format. Reason must be in the format <p>...</p>\\n",
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return false;
  }
};
export const validateRadioBottom = (value, title) => {
  if (!value || value.length < 1) {
    toast.error("Pilih salah satu pada " + title, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};

export const validateTextArea = (value, title) => {
  if (!value || value.length < 4) {
    toast.error(title + " minimal 4 kata", {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  return true;
};
export const validatePeriod = (value, title) => {
  if (!value[0] || !value[1]) {
    toast.error("Mohon isi kedua tanggal untuk " + title, {
      position: toast.POSITION.TOP_RIGHT,
    });
    return false;
  }
  if (value[0] > value[1]) {
    toast.error(
      "Tanggal mulai tidak boleh lebih besar dari tanggal selesai untuk " +
        title,
      {
        position: toast.POSITION.TOP_RIGHT,
      }
    );
    return false;
  }

  return true;
};
