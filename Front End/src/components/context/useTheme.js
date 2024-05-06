import { useEffect, useState } from "react";
const useTheme = () => {
  const initialMode = () => {
    const savedMode = localStorage.getItem("isDarkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  };

  const [isDarkMode, setIsDarkMode] = useState(initialMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    // Observer untuk mengawasi perubahan kelas pada elemen <html>
    const observer = new MutationObserver(() => {
      const htmlElement = document.documentElement;
      const hasDarkClass = htmlElement.classList.contains("dark");
      setIsDarkMode(hasDarkClass);
    });

    observer.observe(document.documentElement, { attributes: true });

    // Cleanup observer saat komponen unmount
    return () => observer.disconnect();
  }, []); // Removed isDarkMode from dependency array

  // Fungsi untuk mengganti mode
  const toggleTheme = () => {
    const htmlElement = document.documentElement;
    const newMode = !isDarkMode;
    htmlElement.classList.toggle("dark", newMode);
  };

  return { isDarkMode, toggleTheme };
};

export default useTheme;
