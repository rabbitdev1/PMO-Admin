import express from "express";
import {
  checkRoleUser,
  createUsers,
  deleteUsers,
  getListUser,
  getUser,
  getUserById,
  Login,
  Logout,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { uploadImages } from "../components/UploadImage.js";
import validateImage from "../middleware/Multer.js";
import validatePDF from "../middleware/Multer2.js";
import { uploadFiles } from "../components/UploadFile.js";
import { getListDataAplikasi } from "../controllers/Aplikasi/list.js";
import { getDetailDataAplikasi } from "../controllers/Aplikasi/detail.js";
import {
  editProcessDataAplikasi,
  setStatusDataAplikasi,
} from "../controllers/Aplikasi/index.js";
import { editDataAplikasi } from "../controllers/Aplikasi/edit.js";
import { deleteDataAplikasi } from "../controllers/Aplikasi/delete.js";

import { getListDataInfrastruktur } from "../controllers/Infrastruktur/list.js";
import { getDetailDataInfrastruktur } from "../controllers/Infrastruktur/detail.js";
import {
  editProcessDataInfrastruktur,
  setStatusDataInfrastruktur,
} from "../controllers/Infrastruktur/index.js";
import { editDataInfrastruktur } from "../controllers/Infrastruktur/edit.js";
import { deleteDataInfrastruktur } from "../controllers/Infrastruktur/delete.js";
import { getListDataTools, getListDataToolsbyArray } from "../controllers/Infrastruktur/list_tools.js";
import { getListDataSekretariat } from "../controllers/Sekretariat/list.js";
import { getDetailDataSekretariat } from "../controllers/Sekretariat/detail.js";
import {
  editProcessDataSekretariat,
  setStatusDataSekretariat,
} from "../controllers/Sekretariat/index.js";
import { editDataSekretariat } from "../controllers/Sekretariat/edit.js";
import { deleteDataSekretariat } from "../controllers/Sekretariat/delete.js";

import { getListDataLayananData } from "../controllers/Layanan Data/list.js";
import { getListDataPerencanaanTIK } from "../controllers/PerencanaanTIK/list.js";
import { getDetailDataPerencanaanTIK } from "../controllers/PerencanaanTIK/detail.js";
import {
  editProcessDataPerencanaanTIK,
  setStatusDataPerencanaanTIK,
} from "../controllers/PerencanaanTIK/index.js";
import { editDataPerencanaanTIK } from "../controllers/PerencanaanTIK/edit.js";
import { deleteDataPerencanaanTIK } from "../controllers/PerencanaanTIK/delete.js";
import { getDetailDataLayananData } from "../controllers/Layanan Data/detail.js";
import {
  editProcessDataLayananData,
  setStatusDataLayananData,
} from "../controllers/Layanan Data/index.js";
import { editDataLayananData } from "../controllers/Layanan Data/edit.js";
import { deleteDataLayananData } from "../controllers/Layanan Data/delete.js";

import { getListDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/list.js";
import { getDetailDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/detail.js";
import {
  editProcessDataSistemVirtual,
  setStatusDataSistemVirtual,
} from "../controllers/Layanan Sistem Virtual/index.js";
import { editDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/edit.js";
import { deleteDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/delete.js";
import { getListDataPermohonanSI } from "../controllers/PermohonanSI/list.js";
import { getDetailDataPermohonanSI } from "../controllers/PermohonanSI/detail.js";
import {
  editProcessDataPermohonanSI,
  setStatusDataPermohonanSI,
} from "../controllers/PermohonanSI/index.js";
import { editDataPermohonanSI } from "../controllers/PermohonanSI/edit.js";
import { deleteDataPermohonanSI } from "../controllers/PermohonanSI/delete.js";

const router = express.Router();

// Infrastruktur routes
router.post("/infrastruktur", verifyToken, getListDataInfrastruktur);
router.post("/infrastruktur/detail", verifyToken, getDetailDataInfrastruktur);
router.post("/infrastruktur/create", verifyToken, setStatusDataInfrastruktur);
router.post("/infrastruktur/set_process", verifyToken, editProcessDataInfrastruktur);
router.post("/infrastruktur/edit", verifyToken, editDataInfrastruktur);
router.post("/infrastruktur/delete", verifyToken, deleteDataInfrastruktur);
router.post("/infrastruktur/list_tools", verifyToken, getListDataToolsbyArray);

// Sekretariat routes
router.post("/sekretariat", verifyToken, getListDataSekretariat);
router.post("/sekretariat/detail", verifyToken, getDetailDataSekretariat);
router.post("/sekretariat/create", verifyToken, setStatusDataSekretariat);
router.post("/sekretariat/set_process", verifyToken, editProcessDataSekretariat);
router.post("/sekretariat/edit", verifyToken, editDataSekretariat);
router.post("/sekretariat/delete", verifyToken, deleteDataSekretariat);

// PerencanaanTIK routes
router.post("/perencanaantik", verifyToken, getListDataPerencanaanTIK);
router.post("/perencanaantik/detail", verifyToken, getDetailDataPerencanaanTIK);
router.post("/perencanaantik/create", verifyToken, setStatusDataPerencanaanTIK);
router.post("/perencanaantik/set_process", verifyToken, editProcessDataPerencanaanTIK);
router.post("/perencanaantik/edit", verifyToken, editDataPerencanaanTIK);
router.post("/perencanaantik/delete", verifyToken, deleteDataPerencanaanTIK);

// LayananData routes
router.post("/layanan-data", verifyToken, getListDataLayananData);
router.post("/layanan-data/detail", verifyToken, getDetailDataLayananData);
router.post("/layanan-data/create", verifyToken, setStatusDataLayananData);
router.post("/layanan-data/set_process", verifyToken, editProcessDataLayananData);
router.post("/layanan-data/edit", verifyToken, editDataLayananData);
router.post("/layanan-data/delete", verifyToken, deleteDataLayananData);

// Teknologi SI routes
router.post("/sistem-virtual", verifyToken, getListDataSistemVirtual);
router.post("/sistem-virtual/detail", verifyToken, getDetailDataSistemVirtual);
router.post("/sistem-virtual/create", verifyToken, setStatusDataSistemVirtual);
router.post("/sistem-virtual/set_process", verifyToken, editProcessDataSistemVirtual);
router.post("/sistem-virtual/edit", verifyToken, editDataSistemVirtual);
router.post("/sistem-virtual/delete", verifyToken, deleteDataSistemVirtual);

// Aplikasi routes
router.post("/aplikasi", verifyToken, getListDataAplikasi);
router.post("/aplikasi/detail", verifyToken, getDetailDataAplikasi);
router.post("/aplikasi/create", verifyToken, setStatusDataAplikasi);
router.post("/aplikasi/set_process", verifyToken, editProcessDataAplikasi);
router.post("/aplikasi/edit", verifyToken, editDataAplikasi);
router.post("/aplikasi/delete", verifyToken, deleteDataAplikasi);

// PErmohonan SI routes
router.post("/permohonan-sistem-informasi", verifyToken, getListDataPermohonanSI);
router.post("/permohonan-sistem-informasi/detail", verifyToken, getDetailDataPermohonanSI);
router.post("/permohonan-sistem-informasi/create", verifyToken, setStatusDataPermohonanSI);
router.post("/permohonan-sistem-informasi/set_process", verifyToken, editProcessDataPermohonanSI);
router.post("/permohonan-sistem-informasi/edit", verifyToken, editDataPermohonanSI);
router.post("/permohonan-sistem-informasi/delete", verifyToken, deleteDataPermohonanSI);

// User routes
router.post("/me", verifyToken, getUser);
router.post("/list_users", verifyToken, getListUser);
router.post("/user/check_role", verifyToken, checkRoleUser);
router.post("/users/create", verifyToken, createUsers);
router.post("/users/delete", verifyToken, deleteUsers);
router.post("/users/detail", verifyToken, getUserById);
router.post("/login", Login);
router.post("/logout", Logout);

// Upload routes
router.post("/upload_images",
  verifyToken, validateImage.single("file"), uploadImages);
router.post("/upload_files", verifyToken, validatePDF.single("file"), uploadFiles);

export default router;