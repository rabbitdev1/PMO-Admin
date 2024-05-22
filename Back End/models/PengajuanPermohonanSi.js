import { Sequelize } from "sequelize";
import db from "../config/Database.js";
// import dotenv from "dotenv"

const { DataTypes } = Sequelize;

const PengajuanPermohonanSi = db.define(
  "pengajuanpermohonansi",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    jenis_pengajuan: {
      allowNull: false,
      type: DataTypes.ENUM("Pengembangan", "Pembangunan"),
    },
    nama_aplikasi: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    deskripsi_aplikasi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    tujuan_pembuatan_aplikasi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    kepemilikan: {
      allowNull: false,
      type: DataTypes.ENUM("Pribadi", "Bukan Pribadi"),
    },
    nama_pic: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    nomor_pic: {
      allowNull: false,
      type: DataTypes.STRING(20),
    },
    lama_pengembangan: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sumber_anggaran: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    besar_anggaran: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sumber_dana_lainnya: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    kategori_klaster: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    klaster_lainnya: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    bahasa_pemrograman: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    bahasa_pemrograman_lainnya: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    database: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    database_lainnya: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    jenis_platform: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    media_penyimpanan: {
      allowNull: false,
      type: DataTypes.ENUM(
        "server milik sendiri",
        "server diskominfo",
        "sewa server",
        "cloud",
        "pdn"
      ),
    },
    spesifikasi_ram: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    spesifikasi_cpu: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    spesifikasi_harddisk: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    alasan_pemilihan_media_penyimpanan: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    kebutuhan_media_penyimpanan: {
      allowNull: false,
      type: DataTypes.ENUM(
        "server milik sendiri",
        "server diskominfo",
        "sewa server",
        "cloud",
        "pdn"
      ),
    },
    lokasi_sewa_server: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    lokasi_cloud: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    sumber_data: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    sumber_lokasi_cloud: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    integrasi_dengan_sistem: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    format_penukaran: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    alasan_integrasi: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    domain_yang_diusulkan: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tgl_surat: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    surat_permohonan_skpd: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lampiran_dokumen_kak: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    peta_spbe_opd: {
      allowNull: false,
      type: DataTypes.ENUM("Ya", "Tidak"),
    },
    resiko_spbe: {
      allowNull: false,
      type: DataTypes.ENUM("Ya", "Tidak"),
    },
    rb_tematik: {
      allowNull: false,
      type: DataTypes.ENUM(
        "Penanggulangan Kemiskinan",
        "Peningkatan Investasi",
        "Percepatan Prioritas Aktual Presiden",
        "Digitalisasi Administrasi Pemerintahan"
      ),
    },
  },
  {
    freezeTableName: true,
  }
);

export { PengajuanPermohonanSi };
