import { useEffect, useState } from "react";
import { ReactComponent as DownloadIcon } from "../../assets/icon/ic_download.svg";
import DynamicButton from "../../components/common/DynamicButton";
import ModalContent from "../../components/ui/Modal/ModalContent";
import { storage } from "../../config/Firebase";

const PDFComponent = ({ imagePath }) => {
  const [pdfURL, setPdfURL] = useState("");
  const [contentType, setContentType] = useState("");
  const [isModalImage, setIsModalImage] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPDFURL = async () => {
      try {
        const storageRef = storage.ref();
        const pdfRef = storageRef.child(imagePath);

        // Dapatkan metadata file
        const metadata = await pdfRef.getMetadata();
        const contentType = metadata.contentType;
        setContentType(contentType);

        // Dapatkan URL download PDF
        const url = await pdfRef.getDownloadURL();
        setPdfURL(url);
        setLoading(false);

      } catch (error) {
        console.error("Error fetching PDF URL:", error);
        setLoading(false);
      }
    };
    getPDFURL();
  }, [imagePath]);

  return (
    <div className="flex flex-1 flex-col items-center">
      {loading ? (
        <p>Loading PDF...</p>
      ) : (
        <>
          <DynamicButton
            initialValue={"Lihat File "}
            color={"#ffffff"}
            type="transparent"
            onClick={() => {
              setIsModalImage(true);
            }}
          />
          <ModalContent
            className={"sm:max-w-3xl"}
            children={
              <div className="flex flex-col gap-2 justify-end">
                {contentType === "application/pdf" ?
                  <object
                    data={pdfURL}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                    className="cursor-pointer"
                    onClick={() => setIsModalImage(true)}
                  >
                    <p>
                      Your browser does not support PDFs.{" "}
                      <a href={pdfURL}>Download the PDF</a>.
                    </p>
                  </object> :
                  <div className="flex flex-col items-center justify-center gap-2">
                    <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(pdfURL)}`} className="w-full h-96" frameBorder="0"
                      title="Office Document Viewer" ></iframe>;
                  </div>
                }
                <div className="flex flex-col flex-1 items-end">
                  <DynamicButton
                    initialValue={"Download File "}
                    iconLeft={<DownloadIcon className="w-4 h-4 " />}
                    color={"#ffffff"}
                    type="fill"
                    className="bg-[#0185FF] text-darkColor"
                    onClick={() => window.open(pdfURL, '_blank')}
                  />
                </div>
              </div>
            }
            active={isModalImage}
            onClose={() => setIsModalImage(false)}
          />
        </>
      )}
    </div>
  );
};

export default PDFComponent;
