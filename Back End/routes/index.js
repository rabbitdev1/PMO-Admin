import express from "express";
import { storeData, getAllData, getDetailData, editData, deleteData } from "../controllers/PengajuanPermohonanSI.js";
import {
  deleteHelpDesk,
  editHelpDesk,
  editProcessHelpDesk,
  getDetailHelpDesk,
  getFaq,
  getListHelpDesk,
  setHelpDesk,
} from "../controllers/HelpDesk.js";
import {
  checkRoleUser,
  createUsers,
  deleteUsers,
  getListUser,
  getUser,
  getUserById,
  //   Register,
  Login,
} from "../controllers/Users.js";

import {
  createListSecurityTesting,
  getListSecurityTesting,
  getDetailDataListSecurityTesting,
  updateListSecurityTesting,
  deleteListSecurityTesting
} from "../controllers/PengajuanKeamanan.js";

import { verifyToken } from "../middleware/VerifyToken.js";
import { uploadImages } from "../components/UploadImage.js";
import validateImage from "../middleware/Multer.js";
import validatePDF from "../middleware/Multer2.js";
import { uploadFiles } from "../components/UploadFile.js";
import {
  deleteInfrastruktur,
  editInfrastruktur,
  editProcessInfrastruktur,
  getDetailInfrastruktur,
  getListInfrastruktur,
  setInfrastruktur,
} from "../controllers/Infrastruktur.js";
const router = express.Router();

router.post("/helpdesk_faq", getFaq);
router.post("/helpdesk", verifyToken, getListHelpDesk);
router.post("/helpdesk/detail", verifyToken, getDetailHelpDesk);
router.post("/helpdesk/create", verifyToken, setHelpDesk);
router.post("/helpdesk/set_process", verifyToken, editProcessHelpDesk);

router.post("/helpdesk/edit", verifyToken, editHelpDesk);
router.post("/helpdesk/delete", verifyToken, deleteHelpDesk);



router.post("/infrastruktur", verifyToken, getListInfrastruktur);
router.post("/infrastruktur/detail", verifyToken, getDetailInfrastruktur);
router.post("/infrastruktur/create", verifyToken, setInfrastruktur);
router.post("/infrastruktur/set_process", verifyToken, editProcessInfrastruktur);
router.post("/infrastruktur/edit", verifyToken, editInfrastruktur);
router.post("/infrastruktur/delete", verifyToken, deleteInfrastruktur);

router.post("/helpdesk/delete", verifyToken, deleteHelpDesk);


router.post("/me", verifyToken, getUser);
router.post("/list_users", verifyToken, getListUser);
router.post("/user/check_role", verifyToken, checkRoleUser);
router.post("/users/create", verifyToken, createUsers);
router.post("/users/delete", verifyToken, deleteUsers);
router.post("/users/detail", verifyToken, getUserById);
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

router.post(
  "/upload_files",
  verifyToken,
  validatePDF.single("file"),
  uploadFiles
);
router.post("/Pengujian/createData", createListSecurityTesting)
router.get("/Pengujian/getAllData", getListSecurityTesting)
router.get("/Pengujian/getDetailData/:id", getDetailDataListSecurityTesting)
router.post("/Pengujian/editData/:id", updateListSecurityTesting)
router.delete("/Pengujian/deleteData/:id", deleteListSecurityTesting)

router.post("/aplikasi/storeData", storeData)
router.get("/aplikasi/getAllData", getAllData)
router.get("/aplikasi/getDetailData/:id", getDetailData)
router.post("/aplikasi/editData/:id", editData)
router.delete("/aplikasi/deleteData/:id", deleteData)

export default router;
