import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import crypto from "crypto";

export const uploadImages = async (req, res) => {
  try {
    const file = req.file;
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

    // Create a hash for the file name
    const hash = crypto.createHash("sha256");
    hash.update(apiKey + file.originalname);
    const encryptedFileName = hash.digest("hex");

    const storage = getStorage();
    const storageRef = ref(storage, `images/${encryptedFileName}`);

    const metadata = {
      contentType: file.mimetype,
    };

    const snapshot = await uploadBytes(storageRef, file.buffer, metadata);
    const downloadURL = await getDownloadURL(snapshot.ref);

    res.status(200).json({
      statusCode: 200,
      msg: "File uploaded successfully",
      data: downloadURL,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ status: "error", msg: "Internal Server Error" });
  }
};
