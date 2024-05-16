import express from "express";

import { storeData, getAllData, getDetailData, editData, deleteData } from "../controllers/PengajuanPermohonanSI.js";
import { storeDataIntegrasisi, getDataIntegrasisi, getDetailDataIntegrasisi, updateDataIntegrasisi, deleteDataIntegrasisi} from "../controllers/IntegrasiSi.js";
import {
  deleteHelpDesk,
  editProcessHelpDesk,
  getDetailHelpDesk,
  getFaq,
  getListHelpDesk,
  setHelpDesk,
} from "../controllers/HelpDesk.js";
import {
  getListUser,
  getUser,
  //   Register,
  Login,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { uploadImages } from "../components/UploadImage.js";

import upload from "../components/UploadFile.js";

import validateImage from "../middleware/Multer.js";
const router = express.Router();

router.post("/helpdesk_faq", getFaq);
router.post("/helpdesk", verifyToken, getListHelpDesk);
router.post("/helpdesk/detail",verifyToken, getDetailHelpDesk);
router.post("/helpdesk/create",verifyToken, setHelpDesk);
router.post("/helpdesk/set_process",verifyToken, editProcessHelpDesk);
router.post("/helpdesk/delete",verifyToken, deleteHelpDesk);

router.post("/me", verifyToken, getUser);
router.post("/list_user", verifyToken, getListUser);
// router.post("/users/create", verifyToken, createUsers);
// router.get("/users/:id", verifyToken, getUserById);
// router.put("/users/:id", verifyToken, updateUsers);
// router.delete("/users/:id", deleteUsers);

// router.post("/users", Register);
// router.post("/verify", Verify);
router.post("/login", Login);
// router.delete("/logout", Logout);

router.post(
  "/upload_images",
  verifyToken,
  validateImage.single("file"),
  uploadImages
);

//Permohonan Si
router.post("/aplikasi/storeData", storeData)
router.get("/aplikasi/getAllData", getAllData)
router.get("/aplikasi/getDetailData/:id", getDetailData)
router.put("/aplikasi/editData/:id", editData)
router.delete("/aplikasi/deleteData/:id", deleteData)

//Integrasi Si
router.post('/aplikasi/storeDataIntegrasisi', upload, storeDataIntegrasisi)
router.get('/aplikasi/getDataIntegrasisi', getDataIntegrasisi)
router.get('/aplikasi/getDetailDataIntegrasisi/:id', getDetailDataIntegrasisi)
router.put('/aplikasi/editDataIntegrasisi/:id', upload, updateDataIntegrasisi)
router.delete('/aplikasi/deleteDataIntegrasisi/:id', deleteDataIntegrasisi)


export default router;
