// import React, { useEffect, useState } from "react";

// import { useDispatch } from "react-redux";
// import TitleHeader from "../../components/layout/TitleHeader";


// function DashboardPages() {
//   const [sliderData, setSliderData] = useState([]);

//   const [sliderLoading, setSliderLoading] = useState(true);


//   const dispatch = useDispatch();

//   useEffect(() => {

//   }, [dispatch]);

//   return (
//     <div className="flex flex-col gap-3 flex-1 p-3">
//     <TitleHeader  link1={"dashboard"}  />
//       <div className="bg-lightColor dark:bg-cardDark p-3 rounded-lg">
//         sdf
//       </div>
//     </div>
//   );
// }

// export default DashboardPages;


import React, { useState } from 'react';

const MultiSelection = () => {
  // State untuk menyimpan daftar pilihan
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Daftar pilihan
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // Function untuk menangani perubahan pilihan
  const handleSelectionChange = (option) => {
    if (selectedOptions.includes(option)) {
      // Jika pilihan sudah dipilih, hapus dari daftar
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      // Jika pilihan belum dipilih, tambahkan ke daftar
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div>
      <h2>Multi Selection</h2>
      {/* Render daftar pilihan */}
      {options.map(option => (
        <label key={option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedOptions.includes(option)}
            onChange={() => handleSelectionChange(option)}
          />
          {option}
        </label>
      ))}
      {/* Tampilkan pilihan yang dipilih */}
      <div>
        <h3>Selected Options:</h3>
        <ul>
          {selectedOptions.map(option => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultiSelection;
