import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import { validateFile } from "../../../utils/helpers/validateForm";
import { getCelahKeamananFinish, getCelahKeamananProcess, getEmailFinish, getEmailProcess, getIntergasiSIFinish, getIntergasiSIProcess, getModulTTEFinish, getModulTTEProcess, getUserAccountSIFinish, getUserAccountSIProcess } from "../data";
import DynamicDetails from "../DynamicDetails";

const ProcessStatus = ({
    submissionStatus,
    validationDataTechnique,
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

    const IntergasiSIProcess = getIntergasiSIProcess(inputLocal);

    const IntergasiSIFinish = getIntergasiSIFinish(finishData);

    const ModulTTEProcess = getModulTTEProcess(inputLocal);

    const ModulTTEFinish = getModulTTEFinish(finishData);

    const UserAkunSIProcess = getUserAccountSIProcess(inputLocal);

    const UserAkunSIFinish = getUserAccountSIFinish(finishData);

    const EmailProcess = getEmailProcess(inputLocal);

    const EmailFinish = getEmailFinish(finishData);

    const CelahKeamananProcess = getCelahKeamananProcess(inputLocal);

    const CelahKeamananFinish = getCelahKeamananFinish(finishData);

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
                        noted={inputProps.noted}
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
                noted={inputProps.noted}
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
        <>
            {submissionStatus === 6 &&
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                        <div className="flex flex-row gap-2 items-center">
                            <span className="text-lg font-bold">Status Validasi Kelengkapan :</span>
                            <div
                                className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor bg-[#0185FF]`}
                            >
                                <span className="text-base">
                                    Disetujui
                                </span>
                            </div>
                        </div>
                    </div>
                    {(JSON.parse(authProfile)?.role === "teknis_aplikasi" || JSON.parse(authProfile)?.role === "katim_aplikasi" ?
                        <div className="flex flex-col gap-3">
                            {JSON.parse(authProfile)?.role === "katim_aplikasi" && (
                                Object.entries(processData).length === 0 &&
                                <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                    <span className="text-base font-semibold text-center">
                                        Menunggu Laporan dari Anggota Tim Teknis
                                    </span>
                                </div>

                            )}
                            {JSON.parse(authProfile)?.role === "teknis_aplikasi" && (
                                Object.entries(processData).length !== 0 &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Tahapan Proses</span>
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_hasil_integrasi"
                                                        ? "File Dokumen Hasil Integrasi"
                                                        : "upload_dokumen_laporan_modul_tte"
                                                            ? "Surat Pengesahan"
                                                            : "upload_dokumen_laporan_pembuatan_akun"
                                                                ? "Upload Dokumen Laporan Hasil Pembuatan Akun"
                                                                : "upload_surat_pengesahan"
                                                                    ? "Surat Pengesahan"
                                                                    : "upload_hasil_pengujian"
                                                                        ? "Dokumen Laporan Hasil Pengujian"
                                                                        : "upload_hasil_penetrasi"
                                                                            ? "Dokumen Hasil Uji Penetrasi"
                                                                            :
                                                                            key === "file_scema_integration" ? "File Skema Integrasi" : key
                                                }
                                                value={value}
                                                location={"aplikasi"}
                                                type={
                                                    key === "upload_dokumen_hasil_integrasi" || "upload_dokumen_laporan_modul_tte" ||
                                                        "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                                                        "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                                                        ? "pdf"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                        <span className="text-base font-semibold text-center">
                                            Laporan sudah dikirim ke Ketua Tim Teknis
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div className="flex flex-col-reverse lg:flex-row gap-3">
                                <div className="flex flex-1 flex-col gap-3">
                                    <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <div className="flex flex-row gap-2 items-center">
                                            <span className='text-lg font-bold'>Tahapan Validasi Kelengkapan</span>
                                        </div>
                                        {Object.entries(validationDataTechnique).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={key === "team_response" ? "Tanggapan dari Tim Teknis" :
                                                    key === "working_schedule" ? "Jadwal Kerja" :
                                                        key === "file_scema_integration" ? "File Skema Integrasi" :
                                                            key === "dokumen_pembangunan" ? "File Dokumen Pembangunan" :
                                                                key === "dokumen_nda" ? "File Dokumen NDA" :
                                                                    key}
                                                value={value}
                                                location={'aplikasi'}
                                                type={
                                                    key === "file_scema_integration" ||
                                                        key === "dokumen_pembangunan" ||
                                                        key === "dokumen_nda" ? 'pdf' :
                                                        key === "working_schedule" ? "single_date" : 'text'}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <DynamicDetails
                                    location={'aplikasi'}
                                    detailData={detailData}
                                    loading={loading}
                                />
                            </div>
                            {JSON.parse(authProfile)?.role === "teknis_aplikasi" && (
                                Object.entries(processData).length === 0 &&
                                <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                    <span className='text-lg font-bold'>Tahapan Proses</span>
                                    {renderProcessInputs(detailData.submission_title === "Integrasi Sistem Informasi" ?
                                        IntergasiSIProcess :
                                        detailData.submission_title === "Penerapan Modul TTE" ? ModulTTEProcess :
                                            detailData.submission_title === "User Akun Sistem Informasi" ? UserAkunSIProcess :
                                                detailData.submission_title === "Permohonan Email" ? EmailProcess :
                                                    detailData.submission_title === "Permohonan Pengujian Celah Keamanan" ? CelahKeamananProcess :
                                                        []

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

                                                if (detailData.submission_title === "Integrasi Sistem Informasi") {
                                                    isValid = isValid && validateFile(inputLocal.upload_dokumen_hasil_integrasi, "Upload File Dokumen Hasil Integrasi");
                                                }
                                                if (detailData.submission_title === "Penerapan Modul TTE") {
                                                    isValid = isValid && validateFile(inputLocal.upload_dokumen_laporan_modul_tte, "Upload Surat Pengesahan");
                                                }
                                                if (detailData.submission_title === "User Akun Sistem Informasi") {
                                                    isValid = isValid && validateFile(inputLocal.upload_dokumen_laporan_pembuatan_akun, "Upload Dokumen Laporan Hasil Pembuatan Akun");
                                                }
                                                if (detailData.submission_title === "Permohonan Email") {
                                                    isValid = isValid && validateFile(inputLocal.upload_surat_pengesahan, "Upload Surat Pengesahan");
                                                } 
                                                if (detailData.submission_title === "Permohonan Pengujian Celah Keamanan") {
                                                    isValid = isValid && validateFile(inputLocal.upload_hasil_pengujian, "Unggah Dokumen Laporan Hasil Pengujian");
                                                    isValid = isValid && validateFile(inputLocal.upload_hasil_penetrasi, "Unggah Dokumen Hasil Uji Penetrasi");
                                                }
                                                if (isValid) {
                                                    checkingFormData('process', filteredDataResult);
                                                }
                                            }}

                                        />
                                    </div>
                                </div>
                            )}
                            {JSON.parse(authProfile)?.role === "katim_aplikasi" && (
                                Object.entries(processData).length !== 0 &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Tahapan Proses</span>
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_hasil_integrasi"
                                                        ? "File Dokumen Hasil Integrasi"
                                                        : "upload_dokumen_laporan_modul_tte"
                                                            ? "Surat Pengesahan"
                                                            : "upload_dokumen_laporan_pembuatan_akun"
                                                                ? "Upload Dokumen Laporan Hasil Pembuatan Akun"
                                                                : "upload_surat_pengesahan"
                                                                    ? "Surat Pengesahan"
                                                                    : "upload_hasil_pengujian"
                                                                        ? "Dokumen Laporan Hasil Pengujian"
                                                                        : "upload_hasil_penetrasi"
                                                                            ? "Dokumen Hasil Uji Penetrasi"
                                                                            :
                                                                            key === "file_scema_integration" ? "File Skema Integrasi" : key
                                                }
                                                value={value}
                                                location={"aplikasi"}
                                                type={
                                                    key === "upload_dokumen_hasil_integrasi" || "upload_dokumen_laporan_modul_tte" ||
                                                        "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                                                        "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                                                        ? "pdf"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Proses Selesai</span>
                                        {renderFinishInputs(detailData.submission_title === "Integrasi Sistem Informasi" ?
                                            IntergasiSIFinish :
                                            detailData.submission_title === "Penerapan Modul TTE" ? ModulTTEFinish :
                                                detailData.submission_title === "User Akun Sistem Informasi" ? UserAkunSIFinish :
                                                    detailData.submission_title === "Permohonan Email" ? EmailFinish :
                                                        detailData.submission_title === "Permohonan Pengujian Celah Keamanan" ? CelahKeamananFinish :
                                                            []
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
                            )}
                        </div>
                        :
                        <div className='flex flex-col  gap-3'>
                            <DynamicDetails location={"aplikasi"} detailData={detailData} loading={loading} />
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
                                        {Object.entries(validationDataTechnique).map(([key, value]) => (
                                            key === "working_schedule" &&
                                            <DynamicShow
                                                key={key}
                                                label={key === "working_schedule" ? "Jadwal Kerja" : key === "file_scema_integration" ? "File Skema Integrasi" : key}
                                                value={value}
                                                type={"working_schedule" ? "multi_date" : 'text'}
                                            />
                                        ))}
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_hasil_integrasi"
                                                        ? "File Dokumen Hasil Integrasi"
                                                        : "upload_dokumen_laporan_modul_tte"
                                                            ? "Surat Pengesahan"
                                                            : "upload_dokumen_laporan_pembuatan_akun"
                                                                ? "Upload Dokumen Laporan Hasil Pembuatan Akun"
                                                                : "upload_surat_pengesahan"
                                                                    ? "Surat Pengesahan"
                                                                    : "upload_hasil_pengujian"
                                                                        ? "Dokumen Laporan Hasil Pengujian"
                                                                        : "upload_hasil_penetrasi"
                                                                            ? "Dokumen Hasil Uji Penetrasi"
                                                                            :
                                                                            key === "file_scema_integration" ? "File Skema Integrasi" : key
                                                }
                                                value={value}
                                                location={"aplikasi"}
                                                type={
                                                    key === "upload_dokumen_hasil_integrasi" || "upload_dokumen_laporan_modul_tte" ||
                                                        "upload_dokumen_laporan_pembuatan_akun" || "upload_surat_pengesahan" ||
                                                        "upload_hasil_pengujian" || "upload_hasil_penetrasi"
                                                        ? "pdf"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                }
                            </div>
                        </div>
                    )}
                </div>


            }
        </>
    );
};

export default ProcessStatus;
