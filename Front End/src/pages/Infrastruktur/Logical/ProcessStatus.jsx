import React from 'react';
import DynamicShow from '../../../components/common/DynamicShow';
import DynamicInput from '../../../components/common/DynamicInput';
import DynamicButton from '../../../components/common/DynamicButton';

const ProcessStatus = ({ submissionStatus, authProfile, processData, setProcessData, finishData, setfinishData, checkingFormData }) => {
    const profile = JSON.parse(authProfile);
    const isPerangkatDaerahOrOpPmo = profile?.role === "perangkat_daerah" || profile?.role === "op_pmo";

    return (
        <>
            {submissionStatus === 4 ? isPerangkatDaerahOrOpPmo ?
                Object.entries(processData).length > 0 ?
                    <div
                        className={`flex-1 flex flex-col gap-2`}
                    >
                        <div className="flex flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Proses Pengajuan</span>
                            {Object.entries(processData).map(([key, value]) => (
                                <DynamicShow
                                    key={key}
                                    label={key === "checking_tools" ? "Pengecekan Alat" : key === "working_schedule" ? "Jadwal Kerja" : key}
                                    value={value}
                                    type={"text"}
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
                        {[
                            {
                                label: "Pengecekan Alat",
                                value: processData.checking_tools,
                                type: "textarea",
                                name: 'checking_tools'
                            },
                            {
                                label: "Jadwal Pengerjaan",
                                value: processData.working_schedule,
                                type: "text",
                                name: 'working_schedule'
                            }
                        ].map((inputProps, index) => (
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
                        ))}
                        <DynamicButton
                            initialValue={"Lanjutkan Proses"}
                            type="fill"
                            color={"#ffffff"}
                            className="inline-flex  bg-[#0185FF] text-darkColor"
                            onClick={() => {
                                checkingFormData('process', processData);
                            }}
                        />
                    </div>
                    {processData.checking_tools && processData.working_schedule ?
                        <div className="flex flex-1 flex-col gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
                            <span className='text-lg font-bold'>Proses Selesai</span>
                            {/* {JSON.stringify(processData)} */}

                            {[
                                {
                                    label: "Status Pengajuan",
                                    value: finishData.submission_status,
                                    name: "submission_status",
                                    type: "radio_button",
                                    options: [
                                        { value: "1", label: "Disetujui" },
                                        { value: "0", label: "Ditolak" },
                                    ],
                                },
                                {
                                    label: "Upload File Pengajuan",
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
                            ].map((inputProps, index) => (
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
                            ))}
                            <DynamicButton
                                initialValue={"Pengajuan Selesai"}
                                type="fill"
                                color={"#ffffff"}
                                className="inline-flex  bg-[#0185FF] text-darkColor"
                                onClick={() => {
                                    checkingFormData('finish', finishData);
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
