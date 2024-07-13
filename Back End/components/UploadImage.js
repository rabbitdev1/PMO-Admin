import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import crypto from "crypto";

export const uploadImages = async (req, res) => {
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
    const encryptedFileName = apiKey + hash.digest("hex");

    const storage = getStorage();
    const storageRef = ref(storage, `images/${location}/${encryptedFileName}`);

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

export const deleteImage = async (fileName, location) => {
  try {
    const storage = getStorage();
    const imageRef = ref(storage, `images/${location}/${fileName}`);

    await deleteObject(imageRef);

    return { status: "success", msg: "Image deleted successfully" };
  } catch (error) {
    if (error.code === "storage/object-not-found") {
      return { status: "error", msg: "Image not found" };
    } else {
      throw error;
    }
  }
};
