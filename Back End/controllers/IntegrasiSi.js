import { IntegrasiSi } from "../models/IntegrasiSi.js";
import fs from "fs";

//Create
export const storeDataIntegrasisi = async (req, res) => {
  try {
    // Ambil data dari body permintaan
    let {
      nama_pic,
      nomor_pic,
      nama_aplikasi,
      deskripsi_aplikasi,
      tujuan_integrasi,
    } = req.body;

    // Ambil file dari permintaan
    const files = req.files;

    // Validasi apakah file-file yang diperlukan ada
    if (!files || !files["dokumen_splp"] || !files["dokumen_splp_nasional"]) {
      return res.status(400).json({
        status: "Fail",
        error: "Validasi error",
        message: "File Dokumen SPLP dan Dokumen SPLP Nasional harus diinput!",
      });
    }

    // Ambil nama file Dokumen SPLP dan Dokumen SPLP Nasional
    const dokumenSplp = files["dokumen_splp"][0].filename;
    const dokumenSplpNasional = files["dokumen_splp_nasional"][0].filename;

    // Buat data baru IntegrasiSi dengan data yang diterima
    const newData = await IntegrasiSi.create({
      nama_pic,
      nomor_pic,
      nama_aplikasi,
      deskripsi_aplikasi,
      tujuan_integrasi,
      dokumen_splp: dokumenSplp,
      dokumen_splp_nasional: dokumenSplpNasional,
    });

    // Kirim respons berhasil dengan data yang baru dibuat
    res.status(200).json({
      status: "ok",
      data: newData,
    });
  } catch (error) {
    // Tangani kesalahan server dan kirim respons dengan status 500
    res.status(500).json({
      status: "Fail",
      error: "Server error",
      message: error.message,
    });
  }
};


// Read
export const getDataIntegrasisi = async (req, res) => {
  try {
    // Mengambil semua data integrasi dari database
    const allData = await IntegrasiSi.findAll();

    // Mengirim respons berhasil dengan status 200 dan data yang ditemukan
    return res.status(200).json({
      status: "ok",
      data: allData,
    });
  } catch (error) {
    // Tangani kesalahan server dan kirim respons dengan status 500
    return res.status(500).json({
      status: "Fail",
      error: "Server error",
      message: error.message,
    });
  }
};


// Get Detail Data
export const getDetailDataIntegrasisi = async (req, res) => {
  try {
    // Ambil ID dari parameter URL
    const id = req.params.id;

    // Cari data integrasi berdasarkan ID
    const detailData = await IntegrasiSi.findByPk(id);

    // Jika data tidak ditemukan, kirim respons dengan status 404
    if (!detailData) {
      return res.status(404).json({
        status: "Fail",
        error: "Validasi error",
        message: `Data dengan id ${id} tidak ditemukan`,
      });
    }

    // Jika data ditemukan, kirim respons dengan status 200 dan data detail
    return res.status(200).json({
      status: "ok",
      data: detailData,
    });
  } catch (error) {
    // Tangani kesalahan server dan kirim respons dengan status 500
    return res.status(500).json({
      status: "Fail",
      error: "Server error",
      message: error.message,
    });
  }
};



// Update
export const updateDataIntegrasisi = async (req, res) => {
  try {
    const id = req.params.id; // Ambil id dari parameter URL
    let {
      nama_pic,
      nomor_pic,
      nama_aplikasi,
      deskripsi_aplikasi,
      tujuan_integrasi,
    } = req.body; // Ambil data baru dari body permintaan

    // Cari data integrasi berdasarkan id
    const existingDataIntegrasi = await IntegrasiSi.findByPk(id);

    // Jika data integrasi tidak ditemukan, kembalikan respons dengan status 404
    if (!existingDataIntegrasi) {
      return res.status(404).json({
        status: "Fail",
        error: "Validasi error",
        message: "Data integrasi tidak ditemukan",
      });
    }

    // Menghapus file lama jika ada file yang baru diunggah
    if (req.files) {
      const dokumenSplpPath = existingDataIntegrasi.dokumen_splp;
      const dokumenSplpNasionalPath = existingDataIntegrasi.dokumen_splp_nasional;
      
      // Membuat path lengkap ke file
      const dokumenSplpFullPath = `./public/dokumen/${dokumenSplpPath}`;
      const dokumenSplpNasionalFullPath = `./public/dokumen/${dokumenSplpNasionalPath}`;

      // Menghapus file lama jika ada file yang diunggah
      if (req.files["dokumen_splp"] && req.files["dokumen_splp"][0]) {
        fs.unlink(dokumenSplpFullPath, (err) => {
          if (err) {
            console.error("Error deleting old dokumen_splp file:", err);
          }
        });
      }

      if (req.files["dokumen_splp_nasional"] && req.files["dokumen_splp_nasional"][0]) {
        fs.unlink(dokumenSplpNasionalFullPath, (err) => {
          if (err) {
            console.error("Error deleting old dokumen_splp_nasional file:", err);
          }
        });
      }
    }

    // Lakukan pembaruan data integrasi
    existingDataIntegrasi.nama_pic = nama_pic;
    existingDataIntegrasi.nomor_pic = nomor_pic;
    existingDataIntegrasi.nama_aplikasi = nama_aplikasi;
    existingDataIntegrasi.deskripsi_aplikasi = deskripsi_aplikasi;
    existingDataIntegrasi.tujuan_integrasi = tujuan_integrasi;

    // Memperbarui file jika ada file baru yang dikirim dalam permintaan
    if (req.files && req.files["dokumen_splp"] && req.files["dokumen_splp_nasional"]) {
      existingDataIntegrasi.dokumen_splp = req.files["dokumen_splp"][0].filename;
      existingDataIntegrasi.dokumen_splp_nasional = req.files["dokumen_splp_nasional"][0].filename;
    }

    // Simpan perubahan ke dalam database
    await existingDataIntegrasi.save();

    // Kembalikan respons dengan data yang telah diperbarui
    return res.status(200).json({
      status: "ok",
      data: existingDataIntegrasi,
    });
  } catch (error) {
    // Tangani kesalahan server dengan mengembalikan respons dengan status 500
    return res.status(500).json({
      status: "Fail",
      error: "Server error",
      message: error.message,
    });
  }
};

//Delete
export const deleteDataIntegrasisi = async (req, res) => {
  try {
    const id = req.params.id; // Ambil id dari parameter URL

    // Cari data integrasi berdasarkan id
    const existingDataIntegrasi = await IntegrasiSi.findByPk(id);

    // Jika data integrasi tidak ditemukan, kembalikan respons dengan status 404
    if (!existingDataIntegrasi) {
      return res.status(404).json({
        status: "Fail",
        error: "Validasi error",
        message: "Data integrasi tidak ditemukan",
      });
    }

    // Hapus file yang terkait dengan data integrasi
    const dokumenSplpPath = existingDataIntegrasi.dokumen_splp;
    const dokumenSplpNasionalPath = existingDataIntegrasi.dokumen_splp_nasional;
    
    // Membuat path lengkap ke file
    const dokumenSplpFullPath = `./public/dokumen/${dokumenSplpPath}`;
    const dokumenSplpNasionalFullPath = `./public/dokumen/${dokumenSplpNasionalPath}`;

    // Hapus file
    fs.unlink(dokumenSplpFullPath, (err) => {
      if (err) {
        console.error("Error deleting dokumen_splp file:", err);
      }
    });

    fs.unlink(dokumenSplpNasionalFullPath, (err) => {
      if (err) {
        console.error("Error deleting dokumen_splp_nasional file:", err);
      }
    });

    // Hapus data integrasi dari database
    await existingDataIntegrasi.destroy();

    // Kembalikan respons berhasil
    return res.status(200).json({
      status: "ok",
      message: "Data berhasil dihapus",
    });
  } catch (error) {
    // mengembalikan respons dengan status 500
    return res.status(500).json({
      status: "Fail",
      error: "Server error",
      message: error.message,
    });
  }
};

