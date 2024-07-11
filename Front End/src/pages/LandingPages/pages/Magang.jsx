import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import DynamicButton from "../../../components/common/DynamicButton";
import useTheme from "../../../components/context/useTheme";
import fetchUploadImages from "../../../utils/api/uploadImages";

import DynamicInput from "../../../components/common/DynamicInput";
import { convertToNameValueObject } from "../../../utils/helpers/convertToNameValueObject";
import { isValidatorPendaftaranMagang } from "../../Layanan Sekretariat/validators";
import fetchUploadFiles from "../../../utils/api/uploadFiles";

function MagangPages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const [formData, setFormData] = useState([
    {
      name: "Pengajuan Layanan Pendaftaran Magang",
      type: "Layanan Sekretariat",
      role: ["op_pmo", "sekretariat", "katim_sekre", "teknis_sekre"],
      fields: [
        {
          name: "name_pemohon",
          label: "Nama Pemohon",
          value: "",
          type: "text",
        },
        {
          name: "surat_permohonan",
          label: "Surat Permohonan",
          value: "",
          type: "file_upload",
          noted: "File berekstensi: pdf, xlsx, docs",
        },
        {
          name: "period",
          label: "Waktu",
          value: "",
          type: "date",
        },
        {
          name: "surat_ket_mahasiswa",
          label: "Surat Keterangan Mahasiswa Aktif",
          value: "",
          type: "file_upload",
          noted: "File berekstensi: pdf, xlsx, docs",
        },
        {
          name: "pict_ktp",
          label: "Foto KTP",
          value: "",
          type: "image_upload",
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
    if (obj.surat_permohonan) {
      const result = await fetchUploadFiles(
        authApiKey,
        authToken,
        obj.surat_permohonan,
        "sekretariat",
        dispatch
      );
      if (result !== null) {
        const fixObject = {
          ...obj,
          surat_permohonan: result,
        };
      } else {
        console.error("Error occurred during image upload.");
      }
    }
    if (obj.surat_ket_mahasiswa) {
      const result = await fetchUploadFiles(
        authApiKey,
        authToken,
        obj.surat_ket_mahasiswa,
        "sekretariat",
        dispatch
      );
      if (result !== null) {
        const fixObject = {
          ...obj,
          surat_ket_mahasiswa: result,
        };
      } else {
        console.error("Error occurred during image upload.");
      }
    }
    if (obj.pict_ktp) {
      const result = await fetchUploadImages(
        authApiKey,
        authToken,
        obj.pict_ktp,
        "sekretariat",
        dispatch
      );
      if (result !== null) {
        const fixObject = {
          ...obj,
          pict_ktp: result,
        };
      } else {
        console.error("Error occurred during image upload.");
      }
    }
    fetchDataCreate(authApiKey, authToken, obj);
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
              PKL adalah kegiatan praktik kerja yang diberikan kepada
              mahasiswa/siswa yang difasilitasi oleh Bank Indonesia.
              ​​​Memberikan kesempatan bagi mahasiswa/sis​wa untuk belajar dan
              mengembangkan diri melalui keterlibatan langsung dalam pelaksanaan
              tugas di Bank Indonesia.
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
