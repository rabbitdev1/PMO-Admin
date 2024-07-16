import express from "express";
import { uploadFiles } from "../components/UploadFile.js";
import { uploadImages } from "../components/UploadImage.js";
import { deleteDataAplikasi } from "../controllers/Aplikasi/delete.js";
import { getDetailDataAplikasi } from "../controllers/Aplikasi/detail.js";
import { editDataAplikasi } from "../controllers/Aplikasi/edit.js";
import {
  editProcessDataAplikasi,
  setStatusDataAplikasi,
} from "../controllers/Aplikasi/index.js";
import { getListDataAplikasi } from "../controllers/Aplikasi/list.js";
import {
  checkRoleUser,
  createUsers,
  deleteUsers,
  getListUser,
  getUser,
  getUserById,
  Login,
  Logout,
} from "../controllers/Admin/Users.js";
import validateImage from "../middleware/Multer.js";
import validatePDF from "../middleware/Multer2.js";
import { verifyToken } from "../middleware/VerifyToken.js";

import { deleteDataInfrastruktur } from "../controllers/Infrastruktur/delete.js";
import { getDetailDataInfrastruktur } from "../controllers/Infrastruktur/detail.js";
import { editDataInfrastruktur } from "../controllers/Infrastruktur/edit.js";
import {
  editProcessDataInfrastruktur,
  setStatusDataInfrastruktur,
} from "../controllers/Infrastruktur/index.js";
import { getListDataInfrastruktur } from "../controllers/Infrastruktur/list.js";
import { deleteListDataTools, editListDataTools, getListDataTools, getListDataToolsbyArray, setListDataTools } from "../controllers/Infrastruktur/list_tools.js";
import { deleteDataSekretariat } from "../controllers/Sekretariat/delete.js";
import { getDetailDataSekretariat } from "../controllers/Sekretariat/detail.js";
import { editDataSekretariat } from "../controllers/Sekretariat/edit.js";
import {
  createDataGuest,
  editProcessDataSekretariat,
  setStatusDataSekretariat,
} from "../controllers/Sekretariat/index.js";
import { getListDataSekretariat } from "../controllers/Sekretariat/list.js";

import { deleteDataLayananData } from "../controllers/Layanan Data/delete.js";
import { getDetailDataLayananData } from "../controllers/Layanan Data/detail.js";
import { editDataLayananData } from "../controllers/Layanan Data/edit.js";
import {
  editProcessDataLayananData,
  setStatusDataLayananData,
} from "../controllers/Layanan Data/index.js";
import { getListDataLayananData } from "../controllers/Layanan Data/list.js";
import { deleteDataPerencanaanTIK } from "../controllers/PerencanaanTIK/delete.js";
import { getDetailDataPerencanaanTIK } from "../controllers/PerencanaanTIK/detail.js";
import { editDataPerencanaanTIK } from "../controllers/PerencanaanTIK/edit.js";
import {
  editProcessDataPerencanaanTIK,
  setStatusDataPerencanaanTIK,
} from "../controllers/PerencanaanTIK/index.js";
import { getListDataPerencanaanTIK } from "../controllers/PerencanaanTIK/list.js";

import { deleteDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/delete.js";
import { getDetailDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/detail.js";
import { editDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/edit.js";
import {
  editProcessDataSistemVirtual,
  setStatusDataSistemVirtual,
} from "../controllers/Layanan Sistem Virtual/index.js";
import { getListDataSistemVirtual } from "../controllers/Layanan Sistem Virtual/list.js";
import { deleteDataPermohonanSI } from "../controllers/PermohonanSI/delete.js";
import { getDetailDataPermohonanSI } from "../controllers/PermohonanSI/detail.js";
import { editDataPermohonanSI } from "../controllers/PermohonanSI/edit.js";
import {
  editProcessDataPermohonanSI,
  setStatusDataPermohonanSI,
} from "../controllers/PermohonanSI/index.js";
import { getListDataPermohonanSI } from "../controllers/PermohonanSI/list.js";
import { deleteListDataApps, editListDataApps, getListDataApps, getListDataAppsbyArray, setListDataApps } from "../controllers/PerangkatDaerah/list_apps.js";


const router = express.Router();

// Infrastruktur routes
router.post("/infrastruktur", verifyToken, getListDataInfrastruktur);
router.post("/infrastruktur/detail", verifyToken, getDetailDataInfrastruktur);
router.post("/infrastruktur/create", verifyToken, setStatusDataInfrastruktur);
router.post("/infrastruktur/set_process", verifyToken, editProcessDataInfrastruktur);
router.post("/infrastruktur/edit", verifyToken, editDataInfrastruktur);
router.post("/infrastruktur/delete", verifyToken, deleteDataInfrastruktur);
router.post("/infrastruktur/tools", verifyToken, getListDataTools);
router.post("/infrastruktur/set_tools", verifyToken, setListDataTools);
router.post("/infrastruktur/delete_tools", verifyToken, deleteListDataTools);
router.post("/infrastruktur/edit_tools", verifyToken, editListDataTools);
router.post("/infrastruktur/list_tools", verifyToken, getListDataToolsbyArray);

// Sekretariat routes
router.post("/sekretariat", verifyToken, getListDataSekretariat);
router.post("/sekretariat/detail", verifyToken, getDetailDataSekretariat);
router.post("/sekretariat/create", verifyToken, setStatusDataSekretariat);
router.post("/sekretariat/set_process", verifyToken, editProcessDataSekretariat);
router.post("/sekretariat/edit", verifyToken, editDataSekretariat);
router.post("/sekretariat/delete", verifyToken, deleteDataSekretariat);

router.post("/pendaftaran-magang/create",  createDataGuest);

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

router.post("/perangkat-daerah/apps", verifyToken, getListDataApps);
router.post("/perangkat-daerah/list_apps", verifyToken, getListDataAppsbyArray);
router.post("/perangkat-daerah/set_apps", verifyToken, setListDataApps);
router.post("/perangkat-daerah/delete_apps", verifyToken, deleteListDataApps);
router.post("/perangkat-daerah/edit_apps", verifyToken, editListDataApps);


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