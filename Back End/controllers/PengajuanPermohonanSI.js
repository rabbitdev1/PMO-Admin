import { PengajuanPermohonanSi } from "../models/PengajuanPermohonanSi.js";

// Create
export const storeData = async (req, res) => {
  try {
    const newData = await PengajuanPermohonanSi.create({
      jenis_pengajuan: req.body.jenis_pengajuan,
      nama_aplikasi: req.body.nama_aplikasi,
      deskripsi_aplikasi: req.body.deskripsi_aplikasi,
      tujuan_pembuatan_aplikasi: req.body.tujuan_pembuatan_aplikasi,
      kepemilikan: req.body.kepemilikan,
      nama_pic: req.body.nama_pic,
      nomor_pic: req.body.nomor_pic,
      lama_pengembangan: req.body.lama_pengembangan,
      sumber_anggaran: req.body.sumber_anggaran,
      besar_anggaran: req.body.besar_anggaran,
      sumber_dana_lainnya: req.body.sumber_dana_lainnya,
      kategori_klaster: req.body.kategori_klaster,
      klaster_lainnya: req.body.klaster_lainnya,
      bahasa_pemrograman: req.body.bahasa_pemrograman,
      bahasa_pemrograman_lainnya: req.body.bahasa_pemrograman_lainnya,
      database: req.body.database,
      jenis_platform: req.body.jenis_platform,
      media_penyimpanan: req.body.media_penyimpanan,
      spesifikasi_ram: req.body.spesifikasi_ram,
      spesifikasi_cpu: req.body.spesifikasi_cpu,
      spesifikasi_harddisk: req.body.spesifikasi_harddisk,
      alasan_pemilihan_media_penyimpanan:
        req.body.alasan_pemilihan_media_penyimpanan,
      kebutuhan_media_penyimpanan: req.body.kebutuhan_media_penyimpanan,
      lokasi_sewa_server: req.body.lokasi_sewa_server,
      lokasi_cloud: req.body.lokasi_cloud,
      sumber_data: req.body.sumber_data,
      sumber_lokasi_cloud: req.body.sumber_lokasi_cloud,
      integrasi_dengan_sistem: req.body.integrasi_dengan_sistem,
      format_penukaran: req.body.format_penukaran,
      alasan_integrasi: req.body.alasan_integrasi,
      domain_yang_diusulkan: req.body.domain_yang_diusulkan,
      tgl_surat: req.body.tgl_surat,
      surat_permohonan_skpd: req.body.surat_permohonan_skpd,
      lampiran_dokumen_kak: req.body.lampiran_dokumen_kak,
      peta_spbe_opd: req.body.peta_spbe_opd,
      resiko_spbe: req.body.resiko_spbe,
      rb_tematik: req.body.rb_tematik,
    });

    return res.status(201).json({
      message: "Pengajuan Permohonan SI berhasil disubmit!",
      status: "ok",
      data: newData,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Fail",
      error: error.message,
    });
  }
};

export const getAllData = async (req, res) => {
  try {
    const allData = await PengajuanPermohonanSi.findAll();
    return res.status(200).json({
      status: "ok",
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error: error.message,
    });
  }
};

export const getDetailData = async (req, res) => {
  try {
    const id = req.params.id;
    const detailData = await PengajuanPermohonanSi.findByPk(id);
    console.log(detailData);

    if (!detailData) {
      return res.status(404).json({
        status: "Fail",
        error: "Validasi error",
        message: `Data dengan id ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: detailData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error: error.message,
    });
  }
};

export const editData = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      jenis_pengajuan,
      nama_aplikasi,
      deskripsi_aplikasi,
      tujuan_pembuatan_aplikasi,
      nama_pic,
      nomor_pic,
      lama_pengembangan,
      sumber_anggaran,
      besar_anggaran,
      sumber_dana_lainnya,
      kategori_klaster,
      klaster_lainnya,
      bahasa_pemrograman,
      bahasa_pemrograman_lainnya,
      database,
      jenis_platform,
      media_penyimpanan,
      spesifikasi_ram,
      spesifikasi_cpu,
      spesifikasi_harddisk,
      alasan_pemilihan_media_penyimpanan,
      kebutuhan_media_penyimpanan,
      lokasi_sewa_server,
      lokasi_cloud,
      sumber_data,
      sumber_lokasi_cloud,
      integrasi_dengan_sistem,
      format_penukaran,
      alasan_integrasi,
      domain_yang_diusulkan,
      tgl_surat,
      surat_permohonan_skpd,
      lampiran_dokumen_kak,
      peta_spbe_opd,
      resiko_spbe,
      rb_tematik,
    } = req.body;

    await PengajuanPermohonanSi.update(
      {
        jenis_pengajuan,
        nama_aplikasi,
        deskripsi_aplikasi,
        tujuan_pembuatan_aplikasi,
        nama_pic,
        nomor_pic,
        lama_pengembangan,
        sumber_anggaran,
        besar_anggaran,
        sumber_dana_lainnya,
        kategori_klaster,
        klaster_lainnya,
        bahasa_pemrograman,
        bahasa_pemrograman_lainnya,
        database,
        jenis_platform,
        media_penyimpanan,
        spesifikasi_ram,
        spesifikasi_cpu,
        spesifikasi_harddisk,
        alasan_pemilihan_media_penyimpanan,
        kebutuhan_media_penyimpanan,
        lokasi_sewa_server,
        lokasi_cloud,
        sumber_data,
        sumber_lokasi_cloud,
        integrasi_dengan_sistem,
        format_penukaran,
        alasan_integrasi,
        domain_yang_diusulkan,
        tgl_surat,
        surat_permohonan_skpd,
        lampiran_dokumen_kak,
        peta_spbe_opd,
        resiko_spbe,
        rb_tematik,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const existingData = await PengajuanPermohonanSi.findByPk(id);
    if (!existingData) {
      return res.status(404).json({
        status: "Fail",
        error: "Validasi error",
        message: `Data dengan id ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data berhasil diupdate",
      data: existingData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Fail",
      error: error.message,
    });
  }
};

export const deleteData = async (req, res) => {
  const id = req.params.id;
  const idData = await PengajuanPermohonanSi.findByPk(id);

  if (!idData) {
    return res.status(404).json({
      status: "fail",
      error: "Validasi error",
      message: `data dengan id ${id} tidak ada`,
    });
  }

  await PengajuanPermohonanSi.destroy({
    where: {
      id: id,
    },
  });

  return res.status(200).json({
    status: "success",
    message: `data dengan id ${id} berhasil dihapus`,
  });
};
