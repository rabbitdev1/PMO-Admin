import crypto from "crypto";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";

// Function untuk mendapatkan ekstensi dari nama file
const getFileExtension = (filename) => {
  return filename.slice(filename.lastIndexOf("."));
};

export const uploadFiles = async (req, res) => {
  try {
    const file = req.file;
    const location = req.body.location;
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    if (!file) {
      return res.status(400).json({ status: "error", msg: "No file uploaded" });
    }

    const hash = crypto.createHash("sha256");
    const randomSalt = crypto.randomBytes(16).toString("hex");
    hash.update(file.originalname + randomSalt);
    const encryptedFileName = apiKey + hash.digest("hex") + getFileExtension(file.originalname);

    const storage = getStorage();
    const storageRef = ref(storage, `files/${location}/${encryptedFileName}`);

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    res.status(200).json({
      statusCode: 200,
      msg: "File uploaded successfully",
      data: snapshot.metadata.name,
    });
  } catch (error) {
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};

export const deleteFiles = async (fileName, location) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `files/${location}/${fileName}`);

    await deleteObject(fileRef);

    return { status: "success", msg: "File deleted successfully" };
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return { status: "error", msg: "File not found" };
    } else {
      throw error;
    }
  }
};