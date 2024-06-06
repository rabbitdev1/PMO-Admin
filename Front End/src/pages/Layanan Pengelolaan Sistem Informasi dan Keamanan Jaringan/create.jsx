import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ReactComponent as PlusIcon } from "../../assets/icon/ic_plus.svg";
import DynamicInput from "../../components/common/DynamicInput";
import useTheme from "../../components/context/useTheme";
import TitleHeader from "../../components/layout/TitleHeader";

function CreateAplikasiPages() {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const authApiKey = Cookies.get("authApiKey");
  const authToken = Cookies.get("authToken");
  const authProfile = Cookies.get("authData");

  const [inputData, setInputData] = useState({});

  const dispatch = useDispatch();
  const dataState = location.state;

  useEffect(() => {
    if (authToken) {
      // Your effect logic here
    }
  }, [dataState, authToken]);

  const handleInputChange = (field, value) => {
    setInputData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className="flex flex-col gap-3 flex-1 p-4">
      <TitleHeader
        title={"Buat Pengajuan Permohonan Sistem Informasi"}
        link1={"dashboard"}
        link2={"Layanan Pengelolaan Sistem Informasi dan Keamanan Jaringan"}
      />
      <section className="flex xl:flex-row flex-col gap-3">
        <div className="flex-1 flex flex-col gap-3">
          <div className="flex flex-col gap-2 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
            <span className="flex text-lg font-semibold">Kebutuhan Perangkat Keras</span>
            <DynamicInput
              label={"Jenis Pengajuan"}
              value={inputData.applicationType || ''}
              type={'selection'}
              options={[
                { label: 'Pembangunan Aplikasi', value: 'Application Development' },
                { label: 'Pengembangan Aplikasi', value: 'Application Enhancement' }
              ]}
              onChange={(value) => handleInputChange('applicationType', value.value)}
              placeholder={"Masukan Pengembangan / Pembangunan"}
            />
            {inputData.applicationType === 'Application Development' ?
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Pembangunan Aplikasi</span>
                <DynamicInput
                  label={"Nama Aplikasi"}
                  value={inputData.applicationName || ''}
                  type={'text'}
                  onChange={(value) => handleInputChange('applicationName', value)}
                  placeholder={"Masukan Deskripsi Pembangunan"}
                />
                <DynamicInput
                  label={"Deskripsi Aplikasi"}
                  value={inputData.applicationDescription || ''}
                  type={'text'}
                  onChange={(value) => handleInputChange('applicationDescription', value)}
                  placeholder={"Masukan Deskripsi Pembangunan"}
                />
              </div>
              :
              <div className="flex flex-col gap-2">
                <span className="flex text-lg font-semibold">Pengembangan Aplikasi</span>
                <DynamicInput
                  label={"Nama Aplikasi"}
                  value={inputData.applicationName || ''}
                  type={'text'}
                  onChange={(value) => handleInputChange('applicationName', value)}
                  placeholder={"Masukan Deskripsi Pembangunan"}
                />
                <DynamicInput
                  label={"Alasan Pengembangan"}
                  value={inputData.enhancementReason || ''}
                  type={'text'}
                  onChange={(value) => handleInputChange('enhancementReason', value)}
                  placeholder={"Masukan Deskripsi Pengembangan"}
                />
              </div>
            }
            <DynamicInput
              label={"Kepemilikan Aplikasi"}
              value={inputData.applicationOwnership || ''}
              type={'selection'}
              options={[
                { label: 'Milik Sendiri', value: 'Own' },
                { label: 'Milik Instansi', value: 'Institutional' }
              ]}
              onChange={(value) => handleInputChange('applicationOwnership', value.value)}
              placeholder={"Pilih Kepemilikan Aplikasi"}
            />
            <span className="flex text-lg font-semibold">OPD</span>
            <DynamicInput
              label={"Nama PIC"}
              type={'text'}
              onChange={(value) => handleInputChange('namePic', value)}
              placeholder={"Masukan Nama PIC"}
            />
            <DynamicInput
              label={"Nomor PIC"}
              type={'tel'}
              onChange={(value) => handleInputChange('numberPic', value)}
              placeholder={"Masukan Nomor PIC"}
            />
            <span className="flex text-lg font-semibold">Teknis Pengembangan</span>
            <DynamicInput
              label={"Hal yang Dikembangkan"}
              type={'textarea'}
              onChange={(value) => handleInputChange('developmentAspect', value)}
              placeholder={"Masukan Hal yang Dikembangkan"}
            />
            <DynamicInput
              label={"Nama Aplikasi"}
              type={'text'}
              onChange={(value) => handleInputChange('applicationName', value)}
              placeholder={"Masukan Nama Aplikasi"}
            />
            <DynamicInput
              label={"Deskripsi Aplikasi"}
              type={'textarea'}
              onChange={(value) => handleInputChange('applicationDescription', value)}
              placeholder={"Masukan Deskripsi Aplikasi"}
            />
            <DynamicInput
              label={"Tujuan Pengembangan Aplikasi"}
              type={'textarea'}
              onChange={(value) => handleInputChange('developmentGoal', value)}
              placeholder={"Masukan Tujuan Pengembangan Aplikasi"}
            />
            <DynamicInput
              label={"Kepemilikan"}
              value={inputData.ownership || ''}
              type={'selection'}
              options={[
                { label: 'Milik Sendiri', value: 'Own' },
                { label: 'Milik Instansi', value: 'Institutional' }
              ]}
              onChange={(value) => handleInputChange('ownership', value.value)}
              placeholder={"Pilih Kepemilikan"}
            />
            <div className="flex md:flex-row flex-col gap-2">
              <DynamicInput
                label={"Nama PIC"}
                type={'text'}
                onChange={(value) => handleInputChange('namePic', value)}
                placeholder={"Masukan Nama PIC"}
              />
              <DynamicInput
                label={"Nomor PIC"}
                type={'text'}
                onChange={(value) => handleInputChange('numberPic', value)}
                placeholder={"Masukan Nomor PIC"}
              />
            </div>
            <DynamicInput
              label={"Teknis Pengembangan"}
              value={inputData.developmentTechnique || ''}
              type={'selection'}
              options={[
                { label: 'Pihak Ke-3', value: 'Third Party' },
                { label: 'Dikembangkan Tenaga Ahli', value: 'Developed by Experts' },
                { label: 'Didampingi Diskominfo', value: 'Accompanied by Diskominfo' },
                { label: 'Dikembangkan Mandiri', value: 'Self-developed' }
              ]}
              onChange={(value) => handleInputChange('developmentTechnique', value.value)}
              placeholder={"Pilih Teknis Pengembangan"}
            />
            <div className="flex md:flex-row flex-col gap-2">
              <DynamicInput
                label={"Nama Pengembang 1 (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('developerName1', value)}
                placeholder={"Masukan Nama Pengembang 1"}
              />
              <DynamicInput
                label={"Nama Pengembang 2 (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('developerName2', value)}
                placeholder={"Masukan Nama Pengembang 2"}
              />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <DynamicInput
                label={"Lama Pengembangan"}
                value={inputData.developmentDuration || ''}
                type={'selection'}
                options={[
                  { label: '1 Bulan', value: '1 Month' },
                  { label: '2 Bulan', value: '2 Months' },
                  { label: '3 Bulan', value: '3 Months' },
                  { label: '4 Bulan', value: '4 Months' },
                  { label: '5 Bulan', value: '5 Months' },
                  { label: '6 Bulan', value: '6 Months' },
                  { label: '7 Bulan', value: '7 Months' },
                  { label: '8 Bulan', value: '8 Months' },
                  { label: '9 Bulan', value: '9 Months' },
                  { label: '10 Bulan', value: '10 Months' },
                  { label: '11 Bulan', value: '11 Months' },
                  { label: '12 Bulan', value: '12 Months' }
                ]}
                onChange={(value) => handleInputChange('developmentDuration', value.value)}
                placeholder={"Pilih Lama Pengembangan"}
              />
              <DynamicInput
                label={"Sumber Anggaran"}
                value={inputData.fundingSource || ''}
                type={'selection'}
                options={[
                  { label: 'APBN', value: 'APBN' },
                  { label: 'APBD', value: 'APBD' }
                ]}
                onChange={(value) => handleInputChange('fundingSource', value.value)}
                placeholder={"Pilih Sumber Anggaran"}
              />
              <DynamicInput
                label={"Besar Anggaran (Rp)"}
                type={'text'}
                onChange={(value) => handleInputChange('budgetAmount', value)}
                placeholder={"Masukan Besar Anggaran"}
              />
              <DynamicInput
                label={"Sumber Dana Lainnya (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('otherFundingSource', value)}
                placeholder={"Masukan Sumber Dana Lainnya"}
              />
              <DynamicInput
                label={"Kategori Klaster"}
                value={inputData.clusterCategory || ''}
                type={'selection'}
                options={[
                  { label: 'Pengelolaan Aset', value: 'Asset Management' }
                  // Add other options here
                ]}
                onChange={(value) => handleInputChange('clusterCategory', value.value)}
                placeholder={"Pilih Kategori Klaster"}
              />
              <DynamicInput
                label={"Klaster Lainnya (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('otherCluster', value)}
                placeholder={"Masukan Klaster Lainnya"}
              />
              <DynamicInput
                label={"Bahasa Pemrograman"}
                value={inputData.programmingLanguage || ''}
                type={'selection'}
                options={[
                  { label: 'PHP', value: 'PHP' },
                  { label: 'JavaScript', value: 'JavaScript' },
                  { label: 'Python', value: 'Python' },
                  { label: 'Java', value: 'Java' }
                  // Add other programming languages here
                ]}
                onChange={(value) => handleInputChange('programmingLanguage', value.value)}
                placeholder={"Pilih Bahasa Pemrograman"}
              />
              <DynamicInput
                label={"Bahasa Pemrograman Lainnya (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('otherProgrammingLanguage', value)}
                placeholder={"Masukan Bahasa Pemrograman Lainnya"}
              />
            </div>

            <DynamicInput
              label={"Database Lainnya (opsional)"}
              type={'text'}
              onChange={(value) => handleInputChange('databaseLainnya', value)}
              placeholder={"Masukan Database Lainnya"}
            />
            <span className="flex text-lg font-semibold">Kebutuhan Perangkat Keras</span>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <DynamicInput
                label={"Media Penyimpanan"}
                value={inputData.storageMedia || ''}
                type={'selection'}
                options={[
                  { label: 'Server Milik', value: 'Owned Server' },
                  { label: 'Server Diskominfo', value: 'Diskominfo Server' },
                  { label: 'Sewa Server', value: 'Server Rental' },
                  { label: 'Cloud', value: 'Cloud' },
                  { label: 'PDN', value: 'PDN' }
                ]}
                onChange={(value) => handleInputChange('storageMedia', value.value)}
                placeholder={"Pilih Media Penyimpanan"}
              />
              <DynamicInput
                label={"Lokasi Sewa Server (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('serverRentalLocation', value)}
                placeholder={"Masukan Lokasi Sewa Server"}
              />
              <DynamicInput
                label={"Lokasi Cloud (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('cloudLocation', value)}
                placeholder={"Masukan Lokasi Cloud"}
              />
              <DynamicInput
                label={"Alasan Pemilihan Media Penyimpanan"}
                type={'text'}
                onChange={(value) => handleInputChange('reasonForChoosingStorageMedia', value)}
                placeholder={"Masukan Alasan Pemilihan Media Penyimpanan"}
              />
              <DynamicInput
                label={"Spesifikasi CPU (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('cpuSpecifications', value)}
                placeholder={"Masukan Spesifikasi CPU"}
              />
              <DynamicInput
                label={"Spesifikasi RAM (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('ramSpecifications', value)}
                placeholder={"Masukan Spesifikasi RAM"}
              />
              <DynamicInput
                label={"Spesifikasi Hardisk/Memory (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('hardDiskSpecifications', value)}
                placeholder={"Masukan Spesifikasi Hardisk/Memory"}
              />
            </div>
            <span className="flex text-lg font-semibold">Data</span>
            <DynamicInput
              label={"Sumber Data"}
              type={'text'}
              onChange={(value) => handleInputChange('dataSource', value)}
              placeholder={"Masukan Sumber Data"}
            />
            <span className="flex text-lg font-semibold">Integrasi</span>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
              <DynamicInput
                label={"Integrasi Dengan Sistem (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('integrationWithSystem', value)}
                placeholder={"Masukan Integrasi Dengan Sistem"}
              />
              <DynamicInput
                label={"Alasan Integrasi (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('reasonForIntegration', value)}
                placeholder={"Masukan Alasan Integrasi"}
              />
              <DynamicInput
                label={"Domain yang Diusulkan (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('proposedDomain', value)}
                placeholder={"Masukan Domain yang Diusulkan"}
              />
              <DynamicInput
                label={"Format Penukaran (opsional)"}
                type={'text'}
                onChange={(value) => handleInputChange('exchangeFormat', value)}
                placeholder={"Masukan Format Penukaran"}
              />
            </div>
            <span className="flex text-lg font-semibold">Lampiran</span>
            <DynamicInput
              label={"Nomor Surat"}
              type={'text'}
              onChange={(value) => handleInputChange('letterNumber', value)}
              placeholder={"Masukan Nomor Surat"}
            />
            <DynamicInput
              label={"Tanggal Surat"}
              type={'date'}
              onChange={(value) => handleInputChange('letterDate', value)}
              placeholder={"Masukan Tanggal Surat"}
            />
            <DynamicInput
              label={"Surat Permohonan SKPD"}
              type={'file'}
              onChange={(value) => handleInputChange('skpdRequestLetter', value)}
              placeholder={"Upload Surat Permohonan SKPD"}
            />
            <DynamicInput
              label={"Lampiran KAK"}
              type={'file'}
              onChange={(value) => handleInputChange('kakAttachment', value)}
              placeholder={"Upload Lampiran KAK"}
            />
            <DynamicInput
              label={"Apakah pembangunan aplikasi terdapat dalam PETA Rencana SPBE OPD?"}
              value={inputData.spbePlan || ''}
              type={'radio_button'}
              options={[
                { label: 'Ya', value: 'Yes' },
                { label: 'Tidak', value: 'No' }
              ]}
              onChange={(value) => handleInputChange('spbePlan', value)}
              placeholder={"Pilih Ya atau Tidak"}
            />
            <DynamicInput
              label={"Apakah sudah dilaksanakan manajemen risiko SPBE?"}
              value={inputData.riskManagement || ''}
              type={'radio_button'}
              options={[
                { label: 'Ya', value: 'Yes' },
                { label: 'Tidak', value: 'No' }
              ]}
              onChange={(value) => handleInputChange('riskManagement', value)}
              placeholder={"Pilih Ya atau Tidak"}
            />
            <DynamicInput
              label={"Pembangunan aplikasi termasuk dalam Reformasi Birokrasi (RB) Tematik?"}
              value={inputData.reformasiBirokrasi || ''}
              type={'selection'}
              options={[
                { label: 'Penanggulangan Kemiskinan', value: 'Poverty Alleviation' },
                { label: 'Peningkatan Investasi', value: 'Investment Improvement' },
                { label: 'Percepatan Prioritas Aktual Presiden', value: 'Presidential Priority Acceleration' },
                { label: 'Digitalisasi Administrasi Pemerintahan', value: 'Government Administration Digitalization' }
              ]}
              onChange={(value) => handleInputChange('reformasiBirokrasi', value.value)}
              placeholder={"Pilih Kategori Reformasi Birokrasi"}
            />

          </div>
          {JSON.stringify(inputData)}
        </div>
      </section>
    </div>
  );
}

export default CreateAplikasiPages;
