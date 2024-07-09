// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
// import DynamicButton from "../../../components/common/DynamicButton";
// import DynamicInput from "../../../components/common/DynamicInput";
// import DynamicShow from "../../../components/common/DynamicShow";
// import DynamicDetails from "../../../components/ui/DynamicDetails";
// import { apiClient } from "../../../utils/api/apiClient";
// import { validateFile, validateImage } from "../../../utils/helpers/validateForm";
// import { getAhliFinish, getAhliProcess, getPenyusunanKebijakanFinish, getPenyusunanKebijakanProcess, getPerwalFinish, getPerwalProcess } from "../data";

// const ProcessStatus = ({
//     submissionStatus,
//     validationData,
//     processData,
//     authProfile,
//     slug,
//     setisModalVerif,
//     checkingFormData,
//     detailData,
//     loading,
//     finishData, setfinishData,
// }) => {

//     const [inputLocal, setInputLocal] = useState({});

//     const PenyusunanKebijakanProcess = getPenyusunanKebijakanProcess(inputLocal);

//     const PenyusunanKebijakanFinish = getPenyusunanKebijakanFinish(finishData);

//     const PerkepProcess = getPerwalProcess(inputLocal);

//     const PerkepFinish = getPerwalFinish(finishData);

//     const AhliProcess = getAhliProcess(inputLocal);

//     const AhliFinish = getAhliFinish(finishData);

//     const fetchSetProgress = async (api_key, token, status) => {
//         const params = new URLSearchParams();
//         params.append("id", slug);
//         params.append("status", status);

//         try {
//             const response = await apiClient({
//                 baseurl: "perencanaantik/set_process",
//                 method: "POST",
//                 body: params,
//                 apiKey: api_key,
//                 token: token,
//             });
//             if (response?.statusCode === 200) {
//                 setisModalVerif({
//                     data: {
//                         title: 'perencanaantik Berhasil diupdate',
//                         msg: 'Selamat, Pengajuan perencanaantik sudah diupdate',
//                         icon: PengajuanBerahasilIcon,
//                         color: '#13C39C'
//                     },
//                     status: true
//                 })
//             } else {
//                 toast.error(response.result.msg, {
//                     position: toast.POSITION.TOP_RIGHT,
//                 });
//             }
//         } catch (error) {
//             console.error("Error fetching data:", error);
//         }
//     };

//     const renderProcessInputs = (inputs) => {
//         return inputs.map((inputProps, index) => (
//             <div className="flex flex-row gap-2" key={index}>
//                 <div className="flex flex-1">
//                     <DynamicInput
//                         key={index}
//                         label={inputProps.label}
//                         value={inputProps.value}
//                         type={inputProps.type}
//                         options={inputProps.options}
//                         onChange={(value) => {
//                             setInputLocal(prevState => ({
//                                 ...prevState,
//                                 [inputProps.name]: value
//                             }));
//                         }}
//                     />
//                 </div>
//             </div>
//         ));
//     };

//     const renderFinishInputs = (inputs) => {
//         return inputs.map((inputProps, index) => (
//             <DynamicInput
//                 key={index}
//                 label={inputProps.label}
//                 value={inputProps.value}
//                 type={inputProps.type}
//                 options={inputProps.options}
//                 onChange={(value) => {
//                     setfinishData(prevState => ({
//                         ...prevState,
//                         [inputProps.name]: value
//                     }));
//                 }}
//             />
//         ));
//     };
//     return (
//         submissionStatus === 6 && (JSON.parse(authProfile)?.role === "teknis_aplikasi" || JSON.parse(authProfile)?.role === "katim_aplikasi" ?
//             <div className="flex flex-col gap-3">
//                 {JSON.parse(authProfile)?.role === "teknis_aplikasi" && (
//                     Object.entries(processData).length === 0 ?
//                         <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//                             <span className='text-lg font-bold'>Tahapan Proses</span>
//                             {Object.entries(validationData).map(([key, value]) => (
//                                 key === "working_schedule" &&
//                                 <DynamicShow
//                                     key={key}
//                                     label={key === "working_schedule" ? "Jadwal Kerja" : key}
//                                     value={value}
//                                     type={"working_schedule" ? "multi_date" : 'text'}
//                                 />
//                             ))}
//                             {renderProcessInputs(detailData.submission_title === "Surat Keputusan" ?
//                                 PenyusunanKebijakanProcess : 
//                                 detailData.submission_title === "Permohonan Perwal dan Kepwal TIK" ? PerkepProcess : 
//                                 detailData.submission_title === "Pendataan Tenaga Ahli" ? AhliProcess :
//                                 []

//                             )}
//                             <div className='flex sm:flex-row flex-col gap-2'>
//                                 <DynamicButton
//                                     initialValue={"Lapor Proses Teknis ke Ketua Tim Teknis"}
//                                     type="fill"
//                                     color={"#ffffff"}
//                                     className="inline-flex  bg-[#0185FF] text-darkColor"
//                                     onClick={() => {
//                                         const result = {
//                                             ...inputLocal,
//                                         };

//                                         const filteredDataResult = Object.fromEntries(
//                                             Object.entries(result).filter(([_, value]) => {
//                                                 return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
//                                             })
//                                         );

//                                         let isValid = true;

//                                         if (detailData.submission_title === "Surat Keputusan") {
//                                             isValid = isValid && validateFile(inputLocal.upload_dokumen_kebijakan, "Upload Dokumen Kebijakan");
//                                         }
//                                         if (detailData.submission_title === "Permohonan Perwal dan Kepwal TIK") {
//                                             isValid = isValid && validateFile(inputLocal.upload_dokumen_laporan_perkep, "Upload Dokumen Laporan Permohonan Perwal dan Kepwal");
//                                         }
//                                         if (detailData.submission_title === "Pendataan Tenaga Ahli") {
//                                             isValid = isValid && validateFile(inputLocal.upload_dokumen_ahli, "Upload Dokumen Pendataan Tenaga Ahli");
//                                         }
//                                         if (isValid) {
//                                             checkingFormData('process', filteredDataResult);
//                                         }
//                                     }}

//                                 />
//                             </div>
//                         </div> :
//                         <div className="flex flex-col gap-3">
//                             <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
//                                 <span className="text-base font-semibold text-center">
//                                     Laporan sudah dikirim ke Ketua Tim Teknis
//                                 </span>
//                             </div>
//                             <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//                                 <span className='text-lg font-bold'>Tahapan Proses</span>
//                                 {Object.entries(validationData).map(([key, value]) => (
//                                     key === "working_schedule" &&
//                                     <DynamicShow
//                                         key={key}
//                                         label={key === "working_schedule" ? "Jadwal Kerja" : key }
//                                         value={value}
//                                         type={"working_schedule" ? "multi_date" : 'text'}
//                                     />
//                                 ))}
//                                 {Object.entries(processData).map(([key, value]) => (
//                                     <DynamicShow
//                                         key={key}
//                                         label={
//                                             key === "upload_dokumen_hasil_analisa"
//                                                 ? "Dokumen Laporan Hasil Pengolahan dan Analisa Data"
//                                                 : "upload_dokumen_laporan_perkep"
//                                                 ? "Dokumen Laporan Permohonan Perwal dan Kepwal"
//                                                 : "upload_dokumen_ahli"
//                                                 ? "Dokumen Pendataan Tenaga Ahli"
//                                                 :
//                                                 key
//                                         }
//                                         value={value}
//                                         location={"perencanaantik"}
//                                         type={
//                                             key === "upload_dokumen_hasil_analisa" || "upload_dokumen_laporan_perkep" || "upload_dokumen_ahli"
//                                                 ? "pdf"
//                                                 : "text"
//                                         }
//                                     />
//                                 ))}
//                             </div>
//                         </div>
//                 )}
//                 {JSON.parse(authProfile)?.role === "katim_aplikasi" && (
//                     Object.entries(processData).length !== 0 ?
//                         <div className="flex flex-col gap-3">
//                             <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//                                 <span className='text-lg font-bold'>Tahapan Proses</span>
//                                 {Object.entries(validationData).map(([key, value]) => (
//                                     key === "working_schedule" &&
//                                     <DynamicShow
//                                         key={key}
//                                         label={key === "working_schedule" ? "Jadwal Kerja" : key}
//                                         value={value}
//                                         type={"working_schedule" ? "multi_date" : 'text'}
//                                     />
//                                 ))}
//                                 {Object.entries(processData).map(([key, value]) => (
//                                     <DynamicShow
//                                         key={key}
//                                         label={
//                                             key === "upload_dokumen_hasil_analisa"
//                                                 ? "Dokumen Laporan Hasil Pengolahan dan Analisa Data"
//                                                 : "upload_dokumen_laporan_perkep"
//                                                 ? "Dokumen Laporan Permohonan Perwal dan Kepwal"
//                                                 : "upload_dokumen_ahli"
//                                                 ? "Dokumen Pendataan Tenaga Ahli"
//                                                 :
//                                                 key
//                                         }
//                                         value={value}
//                                         location={"perencanaantik"}   
//                                         type={
//                                             key === "upload_dokumen_hasil_analisa" || "upload_dokumen_laporan_perkep" || "upload_dokumen_ahli"
//                                                 ? "pdf"
//                                                 : "text"
//                                         }
//                                     />
//                                 ))}
//                             </div>
//                             <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//                                 <span className='text-lg font-bold'>Proses Selesai</span>
//                                 {renderFinishInputs(detailData.submission_title === "Surat Keputusan" ?
//                                 PenyusunanKebijakanFinish : 
//                                 detailData.submission_title === "Permohonan Perwal dan Kepwal TIK" ? PerkepFinish: 
//                                 detailData.submission_title === "Pendataan Tenaga Ahli" ? AhliFinish :
//                                 []
//                                 )}
//                                 <DynamicButton
//                                     initialValue={"Pengajuan Selesai"}
//                                     type="fill"
//                                     color={"#ffffff"}
//                                     className="inline-flex  bg-[#0185FF] text-darkColor"
//                                     onClick={() => {
//                                         if (finishData?.response === undefined) {
//                                             toast.error('Wajib masukan Tanggapan', {
//                                                 position: toast.POSITION.TOP_RIGHT,
//                                             });
//                                         } else {
//                                             checkingFormData('finish', finishData);
//                                         }
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                         :
//                         <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
//                             <span className="text-base font-semibold text-center">
//                                 Menunggu Laporan dari Anggota Tim Teknis
//                             </span>
//                         </div>

//                 )}
//                 <DynamicDetails
//                     location={'perencanaantik'}
//                     detailData={detailData}
//                     loading={loading}
//                 />
//             </div>
//             :
//             <div className='flex flex-col lg:flex-row gap-3'>
//                 <div className="flex flex-col flex-1 gap-3">
//                     {Object.entries(processData).length === 0 ?
//                         <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
//                             <img
//                                 src={require('../../../assets/image/process.gif')}
//                                 alt={'processing'}
//                                 className="object-contain flex w-[20%] min-w-[200px] aspect-square"
//                                 effect="blur"
//                             />
//                             <span className="text-base text-center">
//                                 Pengajuan Sedang <b>Di Proses</b> Perbaikan
//                             </span>
//                         </div>
//                         :
//                         <div className="flex  flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//                             <span className='text-lg font-bold'>Tahapan Proses</span>
//                             {Object.entries(validationData).map(([key, value]) => (
//                                 key === "working_schedule" &&
//                                 <DynamicShow
//                                     key={key}
//                                     label={key === "working_schedule" ? "Jadwal Kerja" : key}
//                                     value={value}
//                                     type={"working_schedule" ? "multi_date" : 'text'}
//                                 />
//                             ))}
//                             {Object.entries(processData).map(([key, value]) => (
//                                 <DynamicShow
//                                     key={key}
//                                     label={
//                                         key === "upload_dokumen_hasil_analisa"
//                                         ? "File Dokumen Hasil Integrasi"
//                                         : "upload_dokumen_laporan_perkep"
//                                         ? "Dokumen Laporan Permohonan Perwal dan Kepwal"
//                                         : "upload_dokumen_ahli"
//                                         ? "Dokumen Pendataan Tenaga Ahli"
//                                         :
//                                         key
//                                     }
//                                     value={value}
//                                     location={"perencanaantik"}
//                                     type={
//                                         key === "upload_dokumen_hasil_analisa" || "upload_dokumen_laporan_perkep" || "upload_dokumen_ahli"
//                                             ? "pdf"
//                                             : "text"
//                                     }
//                                 />
//                             ))}
//                         </div>
//                     }
//                 </div>
//                 <DynamicDetails location={"perencanaantik"} detailData={detailData} loading={loading} />
//             </div>
//         )
//     );
// };

// export default ProcessStatus;


import React, { useState } from "react";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicInput from "../../../components/common/DynamicInput";
import DynamicShow from "../../../components/common/DynamicShow";
import { validateImage } from "../../../utils/helpers/validateForm";
import DynamicDetails from "../DynamicDetails";
import { getPenyusunanKebijakanFinish, getPenyusunanKebijakanProcess, getPerwalFinish, getPerwalProcess } from "../data";

const ProcessStatus = ({
    submissionStatus,
    validationDataTechnique,
    processData,
    authProfile,
    checkingFormData,
    detailData,
    loading,
    finishData, setfinishData,
}) => {

    const [inputLocal, setInputLocal] = useState({});
    const PenyusunanKebijakanProcess = getPenyusunanKebijakanProcess(inputLocal);
    const PenyusunanKebijakanFinish = getPenyusunanKebijakanFinish(finishData);
    const PerkepProcess = getPerwalProcess(inputLocal);
    const PerkepFinish = getPerwalFinish(finishData);

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
                    {(JSON.parse(authProfile)?.role === "teknis_perencanaan" || JSON.parse(authProfile)?.role === "katim_perencanaan" ?
                        <div className="flex flex-col gap-3">
                            {JSON.parse(authProfile)?.role === "katim_perencanaan" && (
                                Object.entries(processData).length === 0 &&
                                <div className="flex flex-col bg-[#0185FF]/10 border-1 border-[#0185FF] text-[#0185FF] p-3 gap-3 items-center rounded-lg">
                                    <span className="text-base font-semibold text-center">
                                        Menunggu Laporan dari Anggota Tim Teknis
                                    </span>
                                </div>

                            )}
                            {JSON.parse(authProfile)?.role === "teknis_perencanaan" && (
                                Object.entries(processData).length !== 0 &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Tahapan Proses</span>
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_kebijakan"
                                                        ? "Dokument Hasil"
                                                        : key === "upload_dokumen_laporan_perkep"
                                                            ? "Dokument Laporan PerKep"
                                                            : key
                                                }
                                                value={value}
                                                location={"perencanaantik"}
                                                type={
                                                    key === "upload_dokumen_kebijakan" || key === "upload_dokumen_laporan_perkep"
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
                                                label={
                                                    key === "working_schedule"
                                                        ? "Jadwal Kerja"
                                                        : key === "team_response"
                                                            ? "Respon dari Tim Teknis"
                                                            : key
                                                }
                                                value={value}
                                                location={"perencanaantik"}
                                                type={
                                                    key === "working_schedule"
                                                        ? "multi_date"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                                <DynamicDetails
                                    location={'perencanaantik'}
                                    detailData={detailData}
                                    loading={loading}
                                />
                            </div>
                            {JSON.parse(authProfile)?.role === "teknis_perencanaan" && (
                                Object.entries(processData).length === 0 &&
                                <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                    <span className='text-lg font-bold'>Tahapan Proses</span>
                                    {renderProcessInputs(detailData.submission_title === "Surat Keputusan" ?
                                        PenyusunanKebijakanProcess :
                                        detailData.submission_title === "Permohonan Perwal dan Kepwal TIK" ? PerkepProcess :
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

                                                if (detailData.submission_title === "Relokasi Alat") {
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_alat_sebelum_di_relokasi, "Upload Foto Alat Sebelum di Relokasi");
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_alat_sesudah_di_relokasi, "Upload Foto Alat Sesudah di Relokasi");
                                                } else if (detailData.submission_title === "Penambahan Alat") {
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_alat_sebelum_di_tambahkan, "Upload Foto Alat Sebelum di Tambahkan");
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_alat_sesudah_di_tambahkan, "Upload Foto Alat Sesudah di Tambahkan");
                                                } else if (detailData.submission_title === "Penambahan Bandwidth") {
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_kegiatan, "Upload Foto Kegiatan");
                                                } else if (detailData.submission_title === "Troubleshooting Aplikasi dan Jaringan") {
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_kegiatan, "Upload Foto Kegiatan");
                                                } else if (detailData.submission_title === "Hosting") {
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_kegiatan, "Upload Foto Kegiatan");
                                                } else if (detailData.submission_title === "Domain") {
                                                    isValid = isValid && validateImage(inputLocal.upload_foto_kegiatan, "Upload Foto Kegiatan");
                                                }
                                                if (isValid) {
                                                    checkingFormData('process', filteredDataResult);
                                                }
                                            }}

                                        />
                                    </div>
                                </div>
                            )}
                            {JSON.parse(authProfile)?.role === "katim_perencanaan" && (
                                Object.entries(processData).length !== 0 &&
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Tahapan Proses</span>
                                        {Object.entries(processData).map(([key, value]) => (
                                            <DynamicShow
                                                key={key}
                                                label={
                                                    key === "upload_dokumen_kebijakan"
                                                        ? "Dokument Hasil"
                                                        : key === "upload_dokumen_laporan_perkep"
                                                            ? "Dokument Laporan PerKep"
                                                            : key
                                                }
                                                value={value}
                                                location={"perencanaantik"}
                                                type={
                                                    key === "upload_dokumen_kebijakan" || key === "upload_dokumen_laporan_perkep"
                                                        ? "pdf"
                                                        : "text"
                                                }
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                                        <span className='text-lg font-bold'>Proses Selesai</span>
                                        {renderFinishInputs(detailData.submission_title === "Surat Keputusan" ?
                                            PenyusunanKebijakanFinish :
                                            detailData.submission_title === "Permohonan Perwal dan Kepwal TIK" ? PerkepFinish :
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
                            <DynamicDetails location={"perencanaantik"} detailData={detailData} loading={loading} />
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
                                                location={"perencanaantik"}
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
                        </div>
                    )}
                </div>


            }
        </>
    );
};

export default ProcessStatus;
