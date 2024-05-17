import { useState, useEffect } from "react";
import { storage } from "../../config/Firebase";
import ModalContent from "../../components/ui/Modal/ModalContent";

const ImageComponent = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [isModalImage, setisModalImage] = useState(false);

  useEffect(() => {
    const getImageURL = async () => {
      try {
        const storageRef = storage.ref();
        const imageRef = storageRef.child(imagePath);
        const url = await imageRef.getDownloadURL();
        setImageUrl(url);
      } catch (error) {
        if (error.code === 'storage/object-not-found') {
          console.log(`Firebase Storage: Object '${imagePath}' does not exist.`);
        } else {
          console.error('Error fetching image URL:', error);
        }
      }
    };
    getImageURL();
  }, [imagePath]);

  return (
    <div className="flex flex-1" >
      <img
          className="flex flex-1 max-h-96 object-contain cursor-pointer"
          src={imageUrl || require('../../assets/image/image_not_found.jpg')}
          alt={imagePath}
          onClick={() => setisModalImage(true)}
        />
      <ModalContent
        className={"sm:max-w-3xl"}
        children={
          <div className="flex flex-col gap-2">
            {imageUrl && (
              <img
                className="flex flex-1 max-h-full object-contain"
                src={imageUrl}
                alt={imagePath}
              />
            )}
          </div>
        }
        active={isModalImage}
        onClose={() => setisModalImage(false)}
      />
    </div>
  );
};

export default ImageComponent;
