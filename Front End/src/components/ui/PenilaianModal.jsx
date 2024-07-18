import DynamicInput from "../common/DynamicInput";
import ModalContent from "./Modal/ModalContent";
import { ReactComponent as CloseIcon } from "../../assets/icon/ic_close.svg";
import { ReactComponent as StarIcon } from "../../assets/icon/ic_star.svg";
import DynamicButton from "../../components/common/DynamicButton";
import { toast } from "react-toastify";
import useTheme from "../context/useTheme";

const PenilaianModal = ({ isModalPenilaian, setIsModalPenilaian, penilaian, setPenilaian, fetchSetReview, authApiKey, authToken, slug, detailData }) => {
    const { isDarkMode } = useTheme();
    return (
        <ModalContent
            className={"sm:max-w-xl"}
            children={
                <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between gap-3">
                        <span className="text-lg font-bold font-gilroy">
                            Penilaian Perangkat Daerah
                        </span>
                        <DynamicButton
                            iconLeft={<CloseIcon className="w-4 h-4 " />}
                            color={isDarkMode ? "#ffffff" : "#212121"}
                            type="transparent"
                            className="inline-flex p-2"
                            onClick={() => {
                                setIsModalPenilaian({ data: {}, status: false });
                            }}
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-sm">
                                Rating :
                            </span>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <StarIcon key={star} className="w-10 h-10 cursor-pointer" fill={star <= penilaian.rating ? '#ED8A19' : '#f3f3f3'} onClick={() => setPenilaian({ ...penilaian, rating: star })} />
                            ))}
                        </div>
                        <DynamicInput
                            label={"Komentar"}
                            value={penilaian.comment}
                            className={"mb-2"}
                            onChange={(value) =>
                                setPenilaian({ ...penilaian, comment: value })
                            }
                            type={'textarea'}
                            placeholder={"Masukan Penilaian Perangkat Daerah"}
                        />
                    </div>

                    <div className="flex flex-row gap-2 justify-end">
                        <DynamicButton
                            initialValue={"Batal"}
                            type="fill"
                            color={"#ffffff"}
                            className="inline-flex bg-cardLight dark:bg-cardDark text-cardDark dark:text-cardLight"
                            onClick={() => {
                                setIsModalPenilaian({ data: {}, status: false });
                            }}
                        />
                        <DynamicButton
                            initialValue={"Kirim Penilaian"}
                            type="fill"
                            color={"#ffffff"}
                            className="inline-flex  bg-[#0185FF] text-darkColor"
                            onClick={() => {
                                if (!penilaian.rating) {
                                    toast.error("Rating harus diisi");
                                    return;
                                }
                                else if (!penilaian.comment) {
                                    toast.error("Komentar harus diisi");
                                }
                                else {
                                    const combinedObject = {
                                        ...penilaian,
                                        id_submission: slug,
                                        submission_title: detailData.submission_title,
                                        submission_type: detailData.submission_type,
                                        name_pic: detailData.name_pic,
                                    }
                                    fetchSetReview(authApiKey, authToken, combinedObject);
                                }
                            }}
                        />
                    </div>
                </div>
            }
            onClose={() => { setIsModalPenilaian({ data: {}, status: false }); }}
            active={isModalPenilaian.status}
        />
    )
}
export default PenilaianModal;
