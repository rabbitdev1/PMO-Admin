import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import Breadcrumb from "../../components/layout/Breadcrumb";


function DashboardPages() {
  const [sliderData, setSliderData] = useState([]);

  const [sliderLoading, setSliderLoading] = useState(true);


  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
      <Breadcrumb link1={"dashboard"} />
      <div className="flex flex-1 gap-3 flex-row">
        <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1">
          Belum Tersedia
        </div>
        <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1">
          Belum Tersedia
        </div>
      </div>
      <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        Belum Tersedia
      </div>
      <div className="flex flex-1 gap-3 flex-row">
        <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1">
          Belum Tersedia
        </div>
        <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg flex-1">
          Belum Tersedia
        </div>
      </div>
      <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        Belum Tersedia
      </div>
    </div>
  );
}

export default DashboardPages;

