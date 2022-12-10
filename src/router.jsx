// import { useRecoilValue } from "recoil";
// import { isRoleSelector } from "@/stores/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "@/pages";
import { Layout } from "@/components";

export const Router = () => {
  // const { isAdmin } = useRecoilValue(isRoleSelector);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
