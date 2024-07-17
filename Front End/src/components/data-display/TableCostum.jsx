import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ReactComponent as ShowIcon } from "../../assets/icon/ic_show.svg";
import { ReactComponent as RemoveIcon } from "../../assets/icon/ic_trash.svg";
import DynamicButton from "../common/DynamicButton";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import useTheme from "../context/useTheme";
import { formatDate } from "../../utils/helpers/formatDate";

const TableCostum = ({
  dataHeader,
  data,
  onClickShow,
  onClickRemove,
  showAction,
  loading
}) => {
  const { isDarkMode } = useTheme();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const statusBody = (rowData) => {
    return (
      <div
        className={`${rowData.submission_title === "Rekomendasi Sistem Informasi" ?
          (rowData.submission_status === 1
            ? "bg-[#333333]"
            : rowData.submission_status === 2 || rowData.submission_status === 4 || rowData.submission_status === 6
              ? "bg-[#F5CF08]"
              : rowData.submission_status === 3 || rowData.submission_status === 5 || rowData.submission_status === 7 || rowData.submission_status === 10
                ? "bg-[#FF0000]"
                : rowData.submission_status === 8 || rowData.submission_status === 9
                  ? "bg-[#FFA500]"
                  : rowData.submission_status === 11 || rowData.submission_status === 12
                    ? "bg-[#13C39C]"
                    : null)
          : (rowData.submission_status === 1
            ? "bg-[#333333]"
            : rowData.submission_status === 2 || rowData.submission_status === 4
              ? "bg-[#F5CF08]"
              : rowData.submission_status === 3 || rowData.submission_status === 5 || rowData.submission_status === 8 || rowData.status_account === "Nonaktif"
                ? "bg-[#FF0000]"
                : rowData.submission_status === 6
                  ? "bg-[#FFA500]"
                  : rowData.submission_status === 7 || rowData.status_account === "Aktif"
                    ? "bg-[#13C39C]"
                    : null)
          } p-1 py-2 rounded-md text-xs  text-center text-darkColor`}
      >
        {rowData.submission_title === "Rekomendasi Sistem Informasi" ?
          (rowData.submission_status === 1
            ? "Dalam Antrian"
            : rowData.submission_status === 2
              ? "Validasi Dokumen"
              : rowData.submission_status === 3 || rowData.submission_status === 5 || rowData.submission_status === 7 || rowData.submission_status === 10
                ? "Ditolak"
                : rowData.submission_status === 4
                  ? "Analisis Kelayakan"
                  : rowData.submission_status === 6
                    ? 'Validasi Kelayakan'
                    : rowData.submission_status === 8
                      ? 'Analisis Teknis'
                      : rowData.submission_status === 9
                        ? 'Validasi Teknis'
                        : rowData.submission_status === 11
                          ? 'Proses Surat Rekomendasi'
                          : rowData.submission_status === 12
                            ? 'Pengajuan Selesai'
                            : null) :
          (rowData.submission_status === 1
            ? "Dalam Antrian"
            : rowData.submission_status === 2
              ? "Validasi Dokumen"
              : rowData.submission_status === 3
                ? "Ditolak"
                : rowData.submission_status === 4
                  ? "Validasi Kelengkapan"
                  : rowData.submission_status === 5
                    ? 'Ditolak'
                    : rowData.submission_status === 6
                      ? 'Diproses'
                      : rowData.submission_status === 7
                        ? 'Pengajuan Selesai'
                        : rowData.submission_status === 8
                          ? 'Tidak Menyetujui'
                          : rowData.submission_status) ||
          (rowData.status_account) || null}
      </div>
    );
  };
  const dateBody = (rowData) => {
    return formatDate(rowData?.createdAt);
  };
  const roleBody = (rowData) => {
    return (rowData?.role === "op_pmo" ? "Front Office" :
      rowData?.role === "op_pmo" ? "Front Office" :
        rowData?.role === "kadis" ? "Kepala Dinas" :
          rowData?.role === "perangkat_daerah" ? "Perangkat Daerah" :
            rowData?.role === "kabid_infra" ? "Ketua Bidang Infrastruktur" :
              rowData?.role === "katim_infra" ? "Ketua Tim Infrastruktur" :
                rowData?.role === "teknis_infra" ? "Tim Teknis Infrastruktur" :
                  rowData?.role === "kabid_aplikasi" ? "Ketua Bidang Aplikasi" :
                    rowData?.role === "katim_aplikasi" ? "Ketua Tim Aplikasi" :
                      rowData?.role === "teknis_aplikasi" ? "Tim Teknis Aplikasi" :
                        rowData?.role === "kabid_perencanaan" ? "Ketua Bidang Perencanaan" :
                          rowData?.role === "katim_perencanaan" ? "Ketua Tim Perencanaan" :
                            rowData?.role === "teknis_perencanaan" ? "Tim Teknis Perencanaan" :
                              rowData?.role === "sekretariat" ? "Sekretariat" :
                                rowData?.role === "katim_sekretariat" ? "Ketua Tim Sekretariat" :
                                  rowData?.role === "teknis_sekretariat" ? "Tim Teknis Sekretariat" :
                                    rowData?.role === "kabid_desiminasi" ? "Ketua Bidang Desiminasi" :
                                      rowData?.role === "katim_desiminasi" ? "Ketua Tim Desiminasi" :
                                        rowData?.role === "teknis_desiminasi" ? "Tim Teknis Desiminasi" :
                                          rowData?.role === "kabid_data" ? "Ketua Bidang Data" :
                                            rowData?.role === "katim_data" ? "Ketua Tim Data" :
                                              rowData?.role === "teknis_data" ? "Tim Teknis Data" : rowData?.role);
  };
  const actionBody = (rowData) => {
    return (
      <div className="flex flex-row gap-2">
        {showAction.read && (
          <DynamicButton
            iconLeft={<ShowIcon className="w-4 h-4 " />}
            color={"#ffffff"}
            type="transparent"
            className="bg-[#0185FF] text-darkColor text-xs "
            onClick={() => {
              onClickShow(rowData);
            }}
          />
        )}
        {showAction.remove && (
          <DynamicButton
            iconLeft={<RemoveIcon className="w-4 h-4 " />}
            color={"#ffffff"}
            type="transparent"
            className="bg-[#FB4B4B] text-darkColor text-xs "
            onClick={() => {
              onClickRemove(rowData);
            }}
          />
        )}
      </div>
    );
  };

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const header = (
    <div className="flex flex-row justify-end items-center gap-2">
      <InputText
        value={globalFilterValue}
        onChange={onGlobalFilterChange}
        className="bg-cardLight border-1 border-[#dddddd] dark:border-[#ffffff20] rounded p-2 px-3 text-lightColor text-sm font-normal"
        placeholder="Cari Data"
      />
    </div>
  );

  return (
    <DataTable
      value={data}
      resizableColumns="scroll"
      sortMode="multiple"
      stripedRows
      paginator
      scrollable
      header={header}
      scrollHeight="700px"
      virtualScrollerOptions={{ itemSize: 46 }}
      tableStyle={{ minWidth: "50rem" }}
      rows={10}
      filters={filters}
      rowsPerPageOptions={[10, 25, 50]}
      className="border-1 rounded-lg overflow-hidden border-[#dddddd] dark:border-[#ffffff20]"
      loading={loading}
    >
      {dataHeader?.map((item, index) => {
        return item.field === "submission_status" || item.field === "status_account" ? (
          <Column
            key={index}
            field={item.field}
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header={item.name}
            body={statusBody}
            sortable
          ></Column>
        ) : item.field === "createdAt" ? (
          <Column
            key={index}
            field={item.field}
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header={item.name}
            body={dateBody}
            sortable
          ></Column>
        ) : item.field === "role" ? (
          <Column
            key={index}
            field={item.field}
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header={item.name}
            body={roleBody}
            sortable
          ></Column>
        ) : item.field === "action" ? (
          <Column
            key={index}
            field={item.field}
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header={item.name}
            body={actionBody}
          ></Column>
        ) : (
          <Column
            key={index}
            field={item.field}
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-sm font-normal text-lightColor"}`}
            header={item.name}
            sortable
          ></Column>
        );
      })}
    </DataTable>
  );
};

export default TableCostum;
