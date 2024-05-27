import React, { useState } from 'react';
import { toast } from 'react-toastify';
import DynamicButton from '../../../components/common/DynamicButton';
import DynamicInput from '../../../components/common/DynamicInput';
import DynamicShow from '../../../components/common/DynamicShow';

const ProcessStatus = ({ submissionStatus, authProfile, processData, setProcessData, finishData, setfinishData, checkingFormData, detailData }) => {
    const profile = JSON.parse(authProfile);
    const isPerangkatDaerahOrOpPmo = profile?.role === "perangkat_daerah" || profile?.role === "op_pmo";
    const [showProcessFinish, setShowProcessFinish] = useState(false);

    const RelokasiAlatProcess = [
        {
            label: "Pengecekan Alat",
            value: processData.checking_tools,
            type: "textarea",
            name: 'checking_tools'
        },
        {
            label: "Jadwal Pengerjaan",
            value: processData.working_schedule,
            type: "date",
            name: 'working_schedule'
        }
    ];
    const PenambahanAlatProcess = [
        {
            label: "Pengecekan Alat",
            value: processData.checking_tools,
            type: "textarea",
            name: 'checking_tools'
        }
    ];
    const PenambahanBandwidthProcess = [
        {
            label: "Konfigurasi",
            value: processData.config,
            type: "textarea",
            name: 'config'
        }
    ];
    const TroubleshootingProcess = [
        {
            label: "Penjadwalan",
            value: processData.working_schedule,
            type: "date",
            name: 'working_schedule'
        }
    ];

    const RelokasiAlatFinish = [
        {
            label: "Status Pengajuan",
            value: finishData.submission_status,
            name: "submission_status",
            type: "radio_button",
            options: [
                { value: "1", label: "Menyetujui" },
                { value: "0", label: "Tidak Menyetujui" },
            ],
        },
        {
            label: "Upload Surat Pemberitahuan untuk OPD",
            value: finishData.file_submission,
            name: 'file_submission',
            type: "file_upload",
        },
        {
            label: "Tanggapan",
            value: finishData.response || null,
            type: "textarea",
            name: 'response'
        }
    ];
    const PenambahanAlatFinish = [
        {
            label: "Status Pengajuan",
            value: finishData.submission_status,
            name: "submission_status",
            type: "radio_button",
            options: [
                { value: "1", label: "Menyetujui" },
                { value: "0", label: "Tidak Menyetujui" },
            ],
        },
        {
            label: "Upload Surat Pemberitahuan untuk OPD",
            value: finishData.file_submission,
            name: 'file_submission',
            type: "file_upload",
        },
        {
            label: "Tanggapan",
            value: finishData.response || null,
            type: "textarea",
            name: 'response'
        }
    ];
    const PenambahanBandwidthFinish = [
        {
            label: "Status Pengajuan",
            value: finishData.submission_status,
            name: "submission_status",
            type: "radio_button",
            options: [
                { value: "1", label: "Menyetujui" },
                { value: "0", label: "Tidak Menyetujui" },
            ],
        },
        {
            label: "Upload Surat Pemberitahuan untuk OPD",
            value: finishData.file_submission,
            name: 'file_submission',
            type: "file_upload",
        },
        {
            label: "Tanggapan",
            value: finishData.response || null,
            type: "textarea",
            name: 'response'
        }
    ];
    const TroubleshootingFinish = [
        {
            label: "Status Pengajuan",
            value: finishData.submission_status,
            name: "submission_status",
            type: "radio_button",
            options: [
                { value: "1", label: "Menyetujui" },
                { value: "0", label: "Tidak Menyetujui" },
            ],
        },
        {
            label: "Upload Surat Pemberitahuan untuk OPD",
            value: finishData.file_submission,
            name: 'file_submission',
            type: "file_upload",
        },
        {
            label: "Tanggapan",
            value: finishData.response || null,
            type: "textarea",
            name: 'response'
        }
    ];

    const renderProcessInputs = (inputs) => {
        return inputs.map((inputProps, index) => (
            <DynamicInput
                key={index}
                label={inputProps.label}
                value={inputProps.value}
                type={inputProps.type}
                options={inputProps.options}
                onChange={(value) => {
                    setProcessData(prevState => ({
                        ...prevState,
                        [inputProps.name]: value
                    }));
                }}
            />
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
            {submissionStatus === 4 ? isPerangkatDaerahOrOpPmo ?
                Object.entries(processData).length > 0 ?
                    <div className="flex-1 flex flex-col gap-2">
                        <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Proses Pengajuan</span>
                            {Object.entries(processData).map(([key, value]) => (
                                <DynamicShow
                                    key={key}
                                    label={key === "checking_tools" ? "Pengecekan Alat" : key === "working_schedule" ? "Jadwal Kerja" : key}
                                    value={value}
                                    type={key === "checking_tools" ? 'text' : key === "working_schedule" ? "multidate" : 'text'}
                                />
                            ))}
                        </div>
                    </div>
                    :
                    <div className="flex flex-col flex-1">
                        <div className="flex flex-col bg-lightColor dark:bg-cardDark p-5 gap-3 items-center rounded-lg">
                            <img
                                src={require('../../../assets/image/process.gif')}
                                alt={'processing'}
                                className=" object-contain flex w-[20%] min-w-[200px] aspect-square "
                                effect="blur"
                            />
                            <span className="text-base text-center">Pengajuan Anda Sedang <b>Di Proses</b> Oleh pihak DISKOMINFO Kota Bandung</span>
                        </div>
                    </div>
                :
                <div className="flex flex-col gap-3">
                    <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                        <span className='text-lg font-bold'>Proses Pengajuan</span>
                        {renderProcessInputs(detailData.submission_title === "Relokasi Alat" ?
                            RelokasiAlatProcess : detailData.submission_title === "Penambahan Alat" ?
                                PenambahanAlatProcess : detailData.submission_title === "Penambahan Bandwidth" ?
                                    PenambahanBandwidthProcess : detailData.submission_title === "Troubleshooting Aplikasi dan Jaringan" ?
                                        TroubleshootingProcess : []


                        )}
                        <div className='flex sm:flex-row flex-col gap-2'>
                            <DynamicButton
                                initialValue={"Update Proses ke Operator daerah"}
                                type="fill"
                                color={"#ffffff"}
                                className="inline-flex  bg-[#0185FF] text-darkColor"
                                onClick={() => {
                                    if (processData?.working_schedule) {
                                        const { startDate, endDate } = processData.working_schedule;
                                        const workingScheduleArray = [startDate, endDate];
                                        const result = {
                                            working_schedule: workingScheduleArray,
                                            checking_tools: processData?.checking_tools
                                        };
                                        const filteredDataResult = Object.fromEntries(
                                            Object.entries(result).filter(([_, value]) => {
                                                return value !== undefined && value !== null && value !== '' && !(Array.isArray(value) && value.length === 0);
                                            })
                                        );
                                        checkingFormData('process', filteredDataResult);
                                    } else {
                                        checkingFormData('process', processData);
                                    }

                                }}
                            />
                            <DynamicButton
                                initialValue={"Langsung ke Proses Selesai"}
                                type="fill"
                                color={"#ffffff"}
                                className="inline-flex  bg-[#0185FF] text-darkColor"
                                onClick={() => {
                                    setShowProcessFinish(!showProcessFinish);
                                }}
                            />
                        </div>
                    </div>
                    {showProcessFinish ?
                        <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Proses Selesai</span>
                            {renderFinishInputs(detailData.submission_title === "Relokasi Alat" ?
                                RelokasiAlatFinish : detailData.submission_title === "Penambahan Alat" ?
                                    PenambahanAlatFinish : detailData.submission_title === "Penambahan Bandwidth" ?
                                        PenambahanBandwidthFinish : detailData.submission_title === "Troubleshooting Aplikasi dan Jaringan" ?
                                        TroubleshootingFinish : [])}
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
                        </div> : null
                    }
                </div>
                : null
            }
        </>
    );
};

export default ProcessStatus;
