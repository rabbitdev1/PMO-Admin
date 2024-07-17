import React, { useState } from "react";
import { useDispatch } from "react-redux";

import DynamicButton from "../../../components/common/DynamicButton";
import useTheme from "../../../components/context/useTheme";

import DynamicInput from "../../../components/common/DynamicInput";
import { convertToNameValueObject } from "../../../utils/helpers/convertToNameValueObject";
import { isValidatorPendaftaranMagang } from "../../Layanan Sekretariat/validators";

import { toast } from "react-toastify";
import { isPending } from "../../../components/store/actions/todoActions";
import { apiClient } from "../../../utils/api/apiClient";

function MagangPages() {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState([
    {
      name: "Pengajuan Layanan Pendaftaran Magang",
      type: "Layanan Sekretariat",
      role: ["op_pmo", "kadis", "sekretariat", "katim_sekretariat", "teknis_sekretariat"],
      fields: [
        {
          name: "name_pic",
          label: "Nama Pemohon",
          value: "",
          type: "text",
        },
        { name: "telp_pic", label: "Nomor Pemohon", value: "", type: "tel" },
        {
          name: "period",
          label: "Jangka Waktu Magang",
          value: "",
          type: "multi_date",
        },
        {
          name: "nik",
          label: "Nomor NIK / SIM",
          value: "",
          type: "text",
        },
        {
          name: "surat_ket_mahasiswa",
          label: "Surat Keterangan Mahasiswa Aktif",
          value: "",
          type: "text",
          noted: "Bentuk Berupa Link Google Drive",
        },
        {
          name: "pict_ktp",
          label: "KTP",
          value: "",
          type: "text",
          noted: "Bentuk Berupa Link Google Drive",
        },
      ],
    },
  ]);

  const handleInputChange = (fieldName, value, sectionIndex) => {
    const updatedFormData = [...formData];
    const currentSection = updatedFormData[sectionIndex];
    const fieldToUpdateIndex = currentSection.fields.findIndex(
      (field) => field.name === fieldName
    );
    updatedFormData[sectionIndex].fields[fieldToUpdateIndex].value = value;

    setFormData(updatedFormData);
  };

  const checkingFormData = async () => {
    const { result: nameValueObject, newObject: newObjectFromConversion } =
      convertToNameValueObject(formData[0]);
    const nameValueObject2 = {
      submission_type: "Layanan Sekretariat",
      role: formData[0].role,
      submission_title: "Layanan Pendaftaran Magang",
    };
    const combinedObject = {
      ...nameValueObject,
      ...nameValueObject2,
      ...newObjectFromConversion.reduce(
        (acc, cur) => ({ ...acc, [cur.name]: cur.value }),
        {}
      ),
    };
    console.log(JSON.stringify(combinedObject));
    if (combinedObject?.submission_title === "Layanan Pendaftaran Magang") {
      if (isValidatorPendaftaranMagang(combinedObject)) {
        await handleImageUploadAndFetch(combinedObject);
      } else {
        return false;
      }
    }
  };
  const handleImageUploadAndFetch = async (obj) => {
    fetchDataCreate(obj);
  };
  const fetchDataCreate = async (data) => {
    dispatch(isPending(true));
    const raw = JSON.stringify(data);
    try {
      const response = await apiClient({
        baseurl: "pendaftaran-magang/create",
        method: "POST",
        customHeaders: { "Content-Type": "application/json" },
        body: raw,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        toast.success(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setFormData([
          {
            name: "Pengajuan Layanan Pendaftaran Magang",
            type: "Layanan Sekretariat",
            role: ["op_pmo", "kadis", "sekretariat", "katim_sekretariat", "teknis_sekretariat"],
            fields: [
              {
                name: "name_pic",
                label: "Nama Pemohon",
                value: "",
                type: "text",
              },
              { name: "telp_pic", label: "Nomor Pemohon", value: "", type: "tel" },
              {
                name: "period",
                label: "Jangka Waktu Magang",
                value: "",
                type: "multi_date",
              },
              {
                name: "nik",
                label: "Nomor NIK / SIM",
                value: "",
                type: "text",
              },
              {
                name: "surat_ket_mahasiswa",
                label: "Surat Keterangan Mahasiswa Aktif",
                value: "",
                type: "text",
                noted: "Bentuk Berupa Link Google Drive",
              },
              {
                name: "pict_ktp",
                label: "KTP",
                value: "",
                type: "text",
                noted: "Bentuk Berupa Link Google Drive",
              },
            ],
          },
        ])
      } else {
        toast.error(response.result.msg, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div className="flex flex-col min-h-screen bg-cardLight dark:bg-cardDark text-lightColor dark:text-darkColor font-gilroy">
      <main className="flex-grow flex flex-col ">
        <div className="flex flex-col gap-3 bg-[#0f5498]">
          <div className="lg:container lg:mx-auto xl:max-w-screen-xl flex flex-col p-3 gap-3  min-h-[200px] text-darkColor">
            <div className="flex flex-col justify-center flex-1">
              <h2 className="font-bold">Program Magang</h2>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 bg-lightColor dark:bg-darkColor">
          <div className="lg:container lg:mx-auto xl:max-w-screen-xl flex flex-col p-3 gap-3">
            <h3>​Pengantar</h3>
            <p className="flex text-base">
              PKL adalah kegiatan praktik kerja yang diberikan kepada mahasiswa/siswa yang difasilitasi oleh Diskominfo Kota Bandung. Memberikan kesempatan bagi mahasiswa/siswa untuk belajar dan mengembangkan diri melalui keterlibatan langsung dalam pelaksanaan tugas di Diskominfo Kota Bandung.
            </p>
            <h3>​Persyaratan Umum Akademis</h3>
            <p>
              a. Jenjang pendidikan: <br />
              - Peserta PKL: D3/D4/S1/S2 <br />
              - Peserta PKL: Sekolah Menengah Kejuruan (SMK) ​ <br />
              b. Tingkat pendidikan: <br />
              - Peserta PKL, minimal semester 6 <br />
            </p>
            <h3>Pendaftaran Magang</h3>
            <div className="flex flex-col gap-3">
              {formData.map((section, sectionIndex) => (
                <div key={sectionIndex} className="flex flex-col gap-3">
                  {section.fields.map((item, index) => (
                    <div key={index} className="flex flex-col gap-2">
                      {item.visible !== false && (
                        <DynamicInput
                          name={item.name}
                          label={item.label}
                          noted={item.noted}
                          value={item.value}
                          options={item.options}
                          onChange={(value) =>
                            handleInputChange(item.name, value, sectionIndex)
                          }
                          type={item.type}
                          placeholder={"Masukan " + item.label}
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex flex-row gap-2 justify-end">
                <DynamicButton
                  initialValue="Ajukan Permohonan"
                  type="fill"
                  color="#ffffff"
                  className="inline-flex bg-[#0185FF] text-darkColor"
                  onClick={checkingFormData}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default MagangPages;
