import express from "express";
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
  createUsers,
  deleteUsers,
  getListUser,
  getUser,
  //   Register,
  Login,
} from "../controllers/Users.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { uploadImages } from "../components/UploadImage.js";
import validateImage from "../middleware/Multer.js";
const router = express.Router();

router.post("/helpdesk_faq", getFaq);
router.post("/helpdesk", verifyToken, getListHelpDesk);
router.post("/helpdesk/detail",verifyToken, getDetailHelpDesk);
router.post("/helpdesk/create",verifyToken, setHelpDesk);
router.post("/helpdesk/set_process",verifyToken, editProcessHelpDesk);
router.post("/helpdesk/edit",verifyToken, editHelpDesk);
router.post("/helpdesk/delete",verifyToken, deleteHelpDesk);

router.post("/me", verifyToken, getUser);
router.post("/list_user", verifyToken, getListUser);
router.post("/users/create", verifyToken, createUsers);
router.post("/users/delete", verifyToken, deleteUsers);
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

export default router;
