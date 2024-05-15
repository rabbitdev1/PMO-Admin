import { useState, useEffect } from "react";
import { storage } from "../../config/Firebase";
import ModalContent from "../../components/ui/Modal/ModalContent";
import DynamicButton from "../../components/common/DynamicButton";
import { ReactComponent as DownloadIcon } from "../../assets/icon/ic_download.svg";

const PDFComponent = ({ imagePath }) => {
  const [pdfURL, setPdfURL] = useState("");
  const [isModalImage, setisModalImage] = useState(false);

  useEffect(() => {
    const getPDFURL = async () => {
      try {
        const storageRef = storage.ref();
        const pdfRef = storageRef.child(imagePath);
        const url = await pdfRef.getDownloadURL();
        setPdfURL(url);
      } catch (error) {
        console.error("Error fetching PDF URL:", error);
      }
    };

    getPDFURL();
  }, [imagePath]);

  return (
    <div className="flex flex-1 flex-col items-center">
      {pdfURL ? (
        <>
          <DynamicButton
            initialValue={"Lihat File "}
            color={"#ffffff"}
            type="transparent"
            onClick={() => {
              setisModalImage(true);
            }}
          />
        </>
      ) : (
        <p>Loading PDF...</p>
      )}

      <ModalContent
        className={"sm:max-w-3xl"}
        children={
          <div className="flex flex-col gap-2">
            <object
              data={pdfURL}
              type="application/pdf"
              width="100%"
              height="600px"
              className="cursor-pointer"
              onClick={() => setisModalImage(true)}
            >
              <p>
                Your browser does not support PDFs.{" "}
                <a href={pdfURL}>Download the PDF</a>.
              </p>
            </object>
            <DynamicButton
              initialValue={"Download File "}
              iconLeft={<DownloadIcon className="w-4 h-4 " />}
              color={"#ffffff"}
              type="fill"
              className="bg-[#0185FF] text-darkColor"
             onClick={() => window.open(pdfURL, '_blank')}
            />
          </div>
        }
        active={isModalImage}
        onClose={() => setisModalImage(false)}
      />
    </div>
  );
};

export default PDFComponent;
