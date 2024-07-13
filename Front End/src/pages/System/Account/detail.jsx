import React, { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { useLocation } from "react-router";
import DynamicButton from "../../../components/common/DynamicButton";
import DynamicShow from "../../../components/common/DynamicShow";
import TitleHeader from "../../../components/layout/TitleHeader";
import ModalContent from "../../../components/ui/Modal/ModalContent";
import { apiClient } from "../../../utils/api/apiClient";
import DynamicDetails from "../DynamicDetails";

function DetailsAccountPages() {
  const authApiKey = Cookies.get('authApiKey');
  const authToken = Cookies.get('authToken');
  const authProfile = Cookies.get('authData');
  const location = useLocation();
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
  }, [authToken,authApiKey,authProfile]);

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

  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <TitleHeader
        title={`Detail Pengguna`}
        link1={"dashboard"}
        link2={"Account"}
      />
      <section className="flex flex-col gap-3">
        <div className="flex md:flex-row flex-col flex-1 gap-3">
          <div className="flex flex-col flex-1 md:max-w-sm">
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
                <span className="text-base">{detailData?.role}</span>
              </div>
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
