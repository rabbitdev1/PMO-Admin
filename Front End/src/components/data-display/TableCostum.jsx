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
}) => {
  const { isDarkMode } = useTheme();

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const statusBody = (rowData) => {
    return (
      <div
        className={`${rowData.submission_status === "Dalam Antrian" ? "bg-[#333333]" : rowData.submission_status === "Diproses" ? "bg-[#F5CF08]" : rowData.submission_status === "Disetujui" ? "bg-[#13C39C]" : rowData.submission_status === "Ditolak" ? "bg-[#FF0000]" : "bg-black"} p-1 py-2 rounded-md text-xs  text-center text-darkColor`}
      >
        {rowData.submission_status}
      </div>
    );
  };
  const dateBody = (rowData) => {
    return formatDate(rowData?.createdAt);
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
              onClickShow(rowData.id);
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
              onClickRemove(rowData.id);
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
        placeholder="Keyword Search"
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
    >
      {dataHeader?.map((item, index) => {
        return item.field === "submission_status" ? (
          <Column
            key={index}
            field="submission_status"
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header="Status"
            body={statusBody}
            sortable
          ></Column>
        ) : item.field === "createdAt" ? (
          <Column
            key={index}
            field="createdAt"
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header="Tanggal"
            body={dateBody}
            sortable
          ></Column>
        ) : item.field === "action" ? (
          <Column
            key={index}
            field="action"
            headerClassName={`bg-[#0185FF] text-darkColor`}
            bodyClassName={`${isDarkMode ? "bg-cardDark text-darkColor text-sm font-normal" : " text-lightColor text-sm font-normal"}`}
            header="Aksi"
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
