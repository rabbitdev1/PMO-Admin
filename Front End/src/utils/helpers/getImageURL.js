import { useState, useEffect } from "react";
import { storage } from "../../config/Firebase";

const ImageComponent = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const getImageURL = async () => {
      const storageRef = storage.ref();
      const imageRef = storageRef.child(imagePath);
      const url = await imageRef.getDownloadURL();
      setImageUrl(url);
    };

    getImageURL();
  }, [imagePath]);

  return <div>{imageUrl && <img src={imageUrl} alt={imagePath} />}</div>;
};

export default ImageComponent;
