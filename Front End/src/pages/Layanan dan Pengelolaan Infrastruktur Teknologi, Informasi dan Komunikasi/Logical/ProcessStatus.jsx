import React, { useState } from "react";
import { toast } from "react-toastify";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import DynamicDetails from "../../../components/ui/DynamicDetails";
import { apiClient } from "../../../utils/api/apiClient";
import { validateImage } from "../../../utils/helpers/validateForm";
import { getPenambahanAlatFinish, getPenambahanAlatProcess, getPenambahanBandwidthFinish, getPenambahanBandwidthProcess, getRelokasiAlatFinish, getRelokasiAlatProcess, getTroubleshotingProcess, getTroubleshotingFinish } from "../data";

const ProcessStatus = ({
    submissionStatus,
    validationData,
    processData,
    authProfile,
    slug,
    setisModalVerif,
    checkingFormData,
    detailData,
    loading,
    finishData, setfinishData,
}) => {

    const [inputLocal, setInputLocal] = useState({});

    const RelokasiAlatProcess = getRelokasiAlatProcess(inputLocal);
    const PenambahanAlatProcess = getPenambahanAlatProcess(inputLocal);
    const PenambahanBandwidthProcess = getPenambahanBandwidthProcess(inputLocal);
    const TroubleshotingProcess = getTroubleshotingProcess(inputLocal);

    const RelokasiAlatFinish = getRelokasiAlatFinish(finishData);
    const PenambahanBandwidthFinish = getPenambahanBandwidthFinish(finishData);
    const PenambahanAlatFinish = getPenambahanAlatFinish(finishData);
    const TroubleshotingFinish = getTroubleshotingFinish(finishData);

    const fetchSetProgress = async (api_key, token, status) => {
        const params = new URLSearchParams();
        params.append("id", slug);
        params.append("status", status);

        try {
            const response = await apiClient({
                baseurl: "infrastruktur/set_process",
                method: "POST",
                body: params,
                apiKey: api_key,
                token: token,
            });
            if (response?.statusCode === 200) {
                setisModalVerif({
                    data: {
                        title: 'infrastruktur Berhasil diupdate',
                        msg: 'Selamat, Pengajuan infrastruktur sudah diupdate',
                        icon: PengajuanBerahasilIcon,
                        color: '#13C39C'
                    },
                    status: true
                })
            } else {
                toast.error(response.result.msg, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const renderProcessInputs = (inputs) => {
        return inputs.map((inputProps, index) => (
            <div className="flex flex-row gap-2" key={index}>
                <div className="flex flex-1">
                    <DynamicInput
                        key={index}
                        label={inputProps.label}
                        value={inputProps.value}
                        type={inputProps.type}
                        options={inputProps.options}
                        onChange={(value) => {
                            setInputLocal(prevState => ({
                                ...prevState,
                                [inputProps.name]: value
                            }));
                        }}
                    />
                </div>
            </div>
        ));
    };

    const renderFinishInputs = (inputs) => {
        return inputs.map((inputProps, index) => (
            <DynamicInput
                key={index}
                label={inputProps.label}
                value={inputProps.value}
                type={inputProps.type}
                options={inputProps.options}
                onChange={(value) => {
                    setfinishData(prevState => ({
                        ...prevState,
                        [inputProps.name]: value
                    }));
                }}
            />
        ));
    };
    return (
        submissionStatus === 6 && (JSON.parse(authProfile)?.role === "teknis_infra" || JSON.parse(authProfile)?.role === "katim_infra" ?
            <div className="flex flex-col gap-3">
                {JSON.parse(authProfile)?.role === "teknis_infra" && (
                    Object.entries(processData).length === 0 ?
                        <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Tahapan Proses</span>
                            {Object.entries(validationData).map(([key, value]) => (
                                key === "working_schedule" &&
                                <DynamicShow
                                    key={key}
                                    label={key === "working_schedule" ? "Jadwal Kerja" : key}
                                    value={value}
                                    type={"working_schedule" ? "multidate" : 'text'}
                                />
                            ))}
                            {renderProcessInputs(detailData.submission_title === "Relokasi Alat" ?
                                RelokasiAlatProcess :
                                detailData.submission_title === "Penambahan Alat" ?
                                    PenambahanAlatProcess : detailData.submission_title === "Penambahan Bandwidth" ?
                                        PenambahanBandwidthProcess : detailData.submission_title === "Troubleshooting Aplikasi dan Jaringan" ?
                                        TroubleshotingProcess : detailData.submission_title === "Hosting" ?
                                                [] : detailData.submission_title === "Domain" ?
                                                    []
                                                    : []
                            )}
                            <div className='flex sm:flex-row flex-col gap-2'>
                                <DynamicButton
                                    initialValue={"Lapor Proses Teknis ke Ketua Tim Teknis"}
                                    type="fill"
                                    color={"#ffffff"}
                                    className="inline-flex  bg-[#0185FF] text-darkColor"
                                    onClick={() => {
                                        const result = {
                                            ...inputLocal,
                                        };

                                        const filteredDataResult = Object.fromEntries(
                                            Object.entries(result).filter(([_, value]) => {
                                                return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
                                            })
                                        );

                                        let isValid = true;

                                        if (detailData.submission_title === "Relokasi Alat") {
                                            isValid = isValid && validateImage(inputLocal.upload_foto_alat_sebelum_di_relokasi, "Upload Foto Alat Sebelum di Relokasi");
                                            isValid = isValid && validateImage(inputLocal.upload_foto_alat_sesudah_di_relokasi, "Upload Foto Alat Sesudah di Relokasi");
                                        } else if (detailData.submission_title === "Penambahan Alat") {
                                            isValid = isValid && validateImage(inputLocal.upload_foto_alat_sebelum_di_tambahkan, "Upload Foto Alat Sebelum di Tambahkan");
                                            isValid = isValid && validateImage(inputLocal.upload_foto_alat_sesudah_di_tambahkan, "Upload Foto Alat Sesudah di Tambahkan");
                                        } else if (detailData.submission_title === "Penambahan Bandwidth") {
                                            isValid = isValid && validateImage(inputLocal.upload_foto_kegiatan, "Upload Foto Kegiatan");
                                        } else if (detailData.submission_title === "Troubleshooting Aplikasi dan Jaringan") {
                                            // Tidak ada validasi tambahan untuk "Troubleshooting"
                                        } else if (detailData.submission_title === "Hosting") {
                                            // Tidak ada validasi tambahan untuk "Troubleshooting"
                                        } else if (detailData.submission_title === "Domain") {
                                            // Tidak ada validasi tambahan untuk "Troubleshooting"
                                        }
                                        if (isValid) {
                                            checkingFormData('process', filteredDataResult);
                                        }
                                    }}

                                />
                            </div>
                        </div> :
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                <span className="text-base font-semibold text-center">
                                    Laporan sudah dikirimn ke Ketua Tim Teknis
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                <span className='text-lg font-bold'>Tahapan Proses</span>
                                {Object.entries(validationData).map(([key, value]) => (
                                    key === "working_schedule" &&
                                    <DynamicShow
                                        key={key}
                                        label={key === "working_schedule" ? "Jadwal Kerja" : key}
                                        value={value}
                                        type={"working_schedule" ? "multidate" : 'text'}
                                    />
                                ))}
                                {Object.entries(processData).map(([key, value]) => (
                                    <DynamicShow
                                        key={key}
                                        label={
                                            key === "upload_foto_alat_sebelum_di_relokasi"
                                                ? "Foto Alat Sebelum Di Relokasikan"
                                                : key === "upload_foto_alat_sesudah_di_relokasi"
                                                    ? "Foto Alat Sesudah Di Relokasikan"
                                                    : key === "upload_foto_alat_sebelum_di_tambahkan"
                                                        ? "Foto Alat Sebelum Di Tambahkan"
                                                        : key === "upload_foto_alat_sesudah_di_tambahkan"
                                                            ? "Foto Alat Sesudah Di Tambahkan"
                                                            : key === "upload_foto_kegiatan"
                                                                ? "Foto Kegiatan"
                                                                : key
                                        }
                                        value={value}
                                        location={"infrastruktur"}
                                        type={
                                            key === "upload_foto_alat_sebelum_di_relokasi" || key === "upload_foto_alat_sesudah_di_relokasi" || key === "upload_foto_alat_sebelum_di_tambahkan" || key === "upload_foto_alat_sesudah_di_tambahkan" || key === "upload_foto_kegiatan"
                                                ? "images"
                                                : "text"
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                )}
                {JSON.parse(authProfile)?.role === "katim_infra" && (
                    Object.entries(processData).length !== 0 ?
                        <div className="flex flex-col gap-3">
                            <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                <span className='text-lg font-bold'>Tahapan Proses</span>
                                {Object.entries(validationData).map(([key, value]) => (
                                    key === "working_schedule" &&
                                    <DynamicShow
                                        key={key}
                                        label={key === "working_schedule" ? "Jadwal Kerja" : key}
                                        value={value}
                                        type={"working_schedule" ? "multidate" : 'text'}
                                    />
                                ))}
                                {Object.entries(processData).map(([key, value]) => (
                                    <DynamicShow
                                        key={key}
                                        label={
                                            key === "upload_foto_alat_sebelum_di_relokasi"
                                                ? "Foto Alat Sebelum Di Relokasikan"
                                                : key === "upload_foto_alat_sesudah_di_relokasi"
                                                    ? "Foto Alat Sesudah Di Relokasikan"
                                                    : key === "upload_foto_alat_sebelum_di_tambahkan"
                                                        ? "Foto Alat Sebelum Di Tambahkan"
                                                        : key === "upload_foto_alat_sesudah_di_tambahkan"
                                                            ? "Foto Alat Sesudah Di Tambahkan"
                                                            : key === "upload_foto_kegiatan"
                                                                ? "Foto Kegiatan"
                                                                : key
                                        }
                                        value={value}
                                        location={"infrastruktur"}
                                        type={
                                            key === "upload_foto_alat_sebelum_di_relokasi" || key === "upload_foto_alat_sesudah_di_relokasi" || key === "upload_foto_alat_sebelum_di_tambahkan" || key === "upload_foto_alat_sesudah_di_tambahkan" || key === "upload_foto_kegiatan"
                                                ? "images"
                                                : "text"
                                        }
                                    />
                                ))}
                            </div>
                            <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                <span className='text-lg font-bold'>Proses Selesai</span>
                                {renderFinishInputs(detailData.submission_title === "Relokasi Alat" ?
                                    RelokasiAlatFinish
                                    : detailData.submission_title === "Penambahan Alat" ?
                                        PenambahanAlatFinish : detailData.submission_title === "Penambahan Bandwidth" ?
                                            PenambahanBandwidthFinish : detailData.submission_title === "Troubleshooting Aplikasi dan Jaringan" ?
                                            TroubleshotingFinish : detailData.submission_title === "Hosting" ?
                                                    [] : detailData.submission_title === "Domain" ?
                                                        []
                                                        : []
                                )}
                                <DynamicButton
                                    initialValue={"Pengajuan Selesai"}
                                    type="fill"
                                    color={"#ffffff"}
                                    className="inline-flex  bg-[#0185FF] text-darkColor"
                                    onClick={() => {
                                        if (finishData?.response === undefined) {
                                            toast.error('Wajib masukan Tanggapan', {
                                                position: toast.POSITION.TOP_RIGHT,
                                            });
                                        } else {
                                            checkingFormData('finish', finishData);
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        :
                        <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                            <span className="text-base font-semibold text-center">
                                Menunggu Laporan dari Anggota Tim Teknis
                            </span>
                        </div>

                )}
                <DynamicDetails
                    detailData={detailData}
                    loading={loading}
                />
            </div>
            :
            <div className='flex flex-col lg:flex-row gap-3'>
                <div className="flex flex-col flex-1 gap-3">
                    {Object.entries(processData).length === 0 ?
                        <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
                            <img
                                src={require('../../../assets/image/process.gif')}
                                alt={'processing'}
                                className="object-contain flex w-[20%] min-w-[200px] aspect-square"
                                effect="blur"
                            />
                            <span className="text-base text-center">
                                Pengajuan Sedang <b>Di Proses</b> Perbaikan
                            </span>
                        </div>
                        :
                        <div className="flex  flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Tahapan Proses</span>
                            {Object.entries(validationData).map(([key, value]) => (
                                key === "working_schedule" &&
                                <DynamicShow
                                    key={key}
                                    label={key === "working_schedule" ? "Jadwal Kerja" : key}
                                    value={value}
                                    type={"working_schedule" ? "multidate" : 'text'}
                                />
                            ))}
                            {Object.entries(processData).map(([key, value]) => (
                                <DynamicShow
                                    key={key}
                                    label={
                                        key === "upload_foto_alat_sebelum_di_relokasi"
                                            ? "Foto Alat Sebelum Di Relokasikan"
                                            : key === "upload_foto_alat_sesudah_di_relokasi"
                                                ? "Foto Alat Sesudah Di Relokasikan"
                                                : key === "upload_foto_alat_sebelum_di_tambahkan"
                                                    ? "Foto Alat Sebelum Di Tambahkan"
                                                    : key === "upload_foto_alat_sesudah_di_tambahkan"
                                                        ? "Foto Alat Sesudah Di Tambahkan"
                                                        : key === "upload_foto_kegiatan"
                                                            ? "Foto Kegiatan"
                                                            : key
                                    }
                                    value={value}
                                    location={"infrastruktur"}
                                    type={
                                        key === "upload_foto_alat_sebelum_di_relokasi" || key === "upload_foto_alat_sesudah_di_relokasi" || key === "upload_foto_alat_sebelum_di_tambahkan" || key === "upload_foto_alat_sesudah_di_tambahkan" || key === "upload_foto_kegiatan"
                                            ? "images"
                                            : "text"
                                    }
                                />
                            ))}
                        </div>
                    }
                </div>
                <DynamicDetails location={"infrastruktur"} detailData={detailData} loading={loading} />
            </div>
        )
    );
};

export default ProcessStatus;
