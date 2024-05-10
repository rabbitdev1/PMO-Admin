import express from "express";
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
const router = express.Router();

router.post("/helpdesk_faq", getFaq);
router.post("/helpdesk", verifyToken, getListHelpDesk);
router.post("/helpdesk/detail", verifyToken, getDetailHelpDesk);
router.post("/helpdesk/create", verifyToken, setHelpDesk);
router.post("/helpdesk/set_process", verifyToken, editProcessHelpDesk);
router.post("/helpdesk/delete", verifyToken, deleteHelpDesk);

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

router.post("/Pengujian/createData", createListSecurityTesting)
router.get("/Pengujian/getAllData", getListSecurityTesting)
router.get("/Pengujian/getDetailData/:id", getDetailDataListSecurityTesting)
router.post("/Pengujian/editData/:id", updateListSecurityTesting)
router.delete("/Pengujian/deleteData/:id", deleteListSecurityTesting)

export default router;
