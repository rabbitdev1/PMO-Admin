import express from "express";
import {
  deleteHelpDesk,
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

const router = express.Router();

// Menu Admin Authentikasi
router.post("/helpdesk_faq", getFaq);
router.post("/helpdesk",verifyToken, getListHelpDesk);
router.post("/helpdesk/detail", getDetailHelpDesk);
router.post("/helpdesk/create", setHelpDesk);
router.post("/helpdesk/delete", deleteHelpDesk);
// router.post("/helpdesk_faq", verifyToken, getHetUsers);

// Menu Admin Kelola Users
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

export default router;
