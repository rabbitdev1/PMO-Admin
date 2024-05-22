import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import TitleHeader from "../../components/layout/TitleHeader";


function DashboardPages() {
  const [sliderData, setSliderData] = useState([]);

  const [sliderLoading, setSliderLoading] = useState(true);


  const dispatch = useDispatch();

  useEffect(() => {

  }, [dispatch]);

  return (
    <div className="flex flex-col gap-3 flex-1 p-3">
    <TitleHeader  link1={"dashboard"}  />
      <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg">
        sdf
      </div>
    </div>
  );
}

export default DashboardPages;

