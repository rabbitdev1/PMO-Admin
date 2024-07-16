import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useLocation } from "react-router";
import { toast } from "react-toastify";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicShow from "../../../components/common/DynamicShow";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import { apiClient } from "../../../utils/api/apiClient";
import { ReactComponent as PengajuanBerahasilIcon } from "../../../assets/icon/ic_pengajuan_berhasil.svg";
import DynamicDetails from "../DynamicDetails";
import { isPending } from "../../../components/store/actions/todoActions";
import { useDispatch } from "react-redux";

function DetailsAccountPages() {
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');
  const location = useLocation();
  const dispatch = useDispatch();
  const slug = location?.state?.slug || "";

  const [accountLoading, setAccountLoading] = useState(true);
  const [detailData, setDetailData] = useState([]);


  const [isModalVerif, setisModalVerif] = useState({
    status: false,
    data: {},
  });


  useEffect(() => {
    if (authToken) {
      fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
    }
  }, [authToken, authApiKey, authProfile]);

  const fetchDataAccount = async (api_key, token, role) => {
    setAccountLoading(true);
    const params = new URLSearchParams();
    params.append("id", slug.id);
    params.append("role", role);
    try {
      const response = await apiClient({
        baseurl: "users/detail",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      setAccountLoading(false);
      if (response?.statusCode === 200) {
        setDetailData(response.result.data);
      } else {
        setDetailData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchEditUserStatus = async (api_key, token, id, newStatus) => {
    console.log(api_key, token, id, newStatus);
    dispatch(isPending(true));
    const params = new URLSearchParams();
    params.append("id", id);
    params.append("status_account", newStatus);

    try {
      const response = await apiClient({
        baseurl: "users/user_status",
        method: "POST",
        body: params,
        apiKey: api_key,
        token: token,
      });
      dispatch(isPending(false));
      if (response?.statusCode === 200) {
        setisModalVerif({
          data: {
            title: "Pembaruan Status Pengguna Berhasil",
            msg: "Status pengguna berhasil diperbarui.",
            icon: PengajuanBerahasilIcon,
            color: "#13C39C",
          },
          status: true,
        });
        fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
      } else {
        toast.error(response.data.msg || "Gagal memperbarui status pengguna.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Gagal memperbarui status pengguna. Silakan coba lagi nanti.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };


  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <Breadcrumb
        title={`Detail Pengguna`}
        link1={"dashboard"}
        link2={"Account"}
      />
      <section className="flex flex-col gap-3">
        <div className="flex md:flex-row flex-col flex-1 gap-3">
          <div className="flex flex-col flex-1 gap-3 md:max-w-xs">
            <div className="flex flex-col  gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">
              {detailData && detailData?.image &&
                <DynamicShow
                  value={detailData?.image}
                  location={'users'}
                  type={"images"}
                />
              }
              <div className="flex flex-col">
                <span className="text-xl font-bold">{detailData?.fullname}</span>
                <span className="text-base">{detailData?.role === "op_pmo" ? "Front Office" :
                  detailData?.role === "op_pmo" ? "Front Office" :
                    detailData?.role === "kadis" ? "Kepala Dinas" :
                      detailData?.role === "perangkat_daerah" ? "Perangkat Daerah" :
                        detailData?.role === "kabid_infra" ? "Ketua Bidang Infrastruktur" :
                          detailData?.role === "katim_infra" ? "Ketua Tim Infrastruktur" :
                            detailData?.role === "teknis_infra" ? "Tim Teknis Infrastruktur" :
                              detailData?.role === "kabid_aplikasi" ? "Ketua Bidang Aplikasi" :
                                detailData?.role === "katim_aplikasi" ? "Ketua Tim Aplikasi" :
                                  detailData?.role === "teknis_aplikasi" ? "Tim Teknis Aplikasi" :
                                    detailData?.role === "kabid_perencanaan" ? "Ketua Bidang Perencanaan" :
                                      detailData?.role === "katim_perencanaan" ? "Ketua Tim Perencanaan" :
                                        detailData?.role === "teknis_perencanaan" ? "Tim Teknis Perencanaan" :
                                          detailData?.role === "kabid_sekretariat" ? "Ketua Bidang Sekretariat" :
                                            detailData?.role === "katim_sekretariat" ? "Ketua Tim Sekretariat" :
                                              detailData?.role === "teknis_sekretariat" ? "Tim Teknis Sekretariat" :
                                                detailData?.role === "kabid_desiminasi" ? "Ketua Bidang Desiminasi" :
                                                  detailData?.role === "katim_desiminasi" ? "Ketua Tim Desiminasi" :
                                                    detailData?.role === "teknis_desiminasi" ? "Tim Teknis Desiminasi" : detailData?.role}</span>
              </div>
            </div>
            <div className="flex flex-col  gap-3 bg-lightColor dark:bg-cardDark p-3 rounded-lg">

              <div className="flex flex-row gap-2 items-center justify-between">
                <span className="text-md font-bold">
                  Status Akun :
                </span>
                <div
                  className={`flex flex-row gap-2 p-1 px-3 rounded-md text-darkColor ${detailData?.status_account === "Aktif" ? "bg-[#13C39C]" : "bg-[#FF0000]"}`}
                >
                  <span className="text-base">
                    {detailData?.status_account}
                  </span>
                </div>
              </div>
              {detailData.role !== "op_pmo" &&
                <div className="flex flex-row items-end justify-end">
                  <DynamicButton
                    initialValue={detailData?.status_account === "Aktif" ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                    color={"#ffffff"}
                    type="transparent"
                    className={`${detailData?.status_account === "Aktif" ? 'text-[#FB4B4B]' : 'text-[#13C39C]'}  text-xs `}
                    onClick={() => {
                      fetchEditUserStatus(authApiKey, authToken, slug.id, (detailData?.status_account === "Aktif" ? "Nonaktif" : "Aktif"))
                    }}
                  />
                </div>}
            </div>
          </div>
          <div className="flex flex-1 flex-col ">
            <DynamicDetails location={"users"} detailData={detailData} loading={accountLoading} />
          </div>
        </div>

      </section>

      <ModalContent
        className={"sm:max-w-xl"}
        children={
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center justify-center ">
              {isModalVerif.data?.icon &&
                <isModalVerif.data.icon
                  className={`flex flex-col flex-1 max-w-[150%] aspect-square bg-[${isModalVerif.data.color}] rounded-full`}
                />}
            </div>
            <div className="flex  flex-col items-center justify-center ">
              <span className="text-lg font-bold">{isModalVerif.data?.title}</span>
              <span className="text-sm font-light opacity-70">{isModalVerif.data?.msg}</span>
            </div>
            <div className="flex flex-col gap-2 ">
              <DynamicButton
                initialValue={"Kembali"}
                type="fill"
                color={"#ffffff"}
                className={`inline-flex flex-1 bg-[${isModalVerif.data.color}] text-darkColor`}
                onClick={() => {
                  setisModalVerif({ data: {}, status: false })
                  fetchDataAccount(authApiKey, authToken, JSON.parse(authProfile)?.role)
                }}
              />
            </div>
          </div>
        }
        active={isModalVerif.status}
      />
    </div>
  );
}

export default DetailsAccountPages;
