import { useEffect } from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CustomNavbar } from "./CustomNavbar";
import { Front } from "./Front";

export const MainPage = () => {

  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    setCategoryList(categoryList);
  }, [categoryList])

  return (
    <div>
      <CustomNavbar
        setCategoryList={(data) => {
          setCategoryList(data);
        }}
      />
      <Routes>
        <Route path="/" element={<Front data={categoryList} />} />
      </Routes>
    </div>

  )
}