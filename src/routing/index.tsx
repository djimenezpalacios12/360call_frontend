import { Routes, Route, Navigate } from "react-router-dom";

import AuthenticationPage from "@/views/AuthenticationPage";
import LoadFilesPage from "@/views/loadFilesPage/files";
import NavbarPage from "@/components/navbar";
import PrivateRoute from "./PrivaterRoute";
import { useAppSelector } from "@/store/hooks";

// Routing
const Routing = () => {
  const rol = useAppSelector((state) => state.app.user.rol);

  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        {/* <Route
          path="/upload-file"
          element={
            <NavbarPage>
              <LoadFilesPage />
            </NavbarPage>
          }
        /> */}

        <Route
          path="/upload-files"
          element={
            <PrivateRoute rol={rol} path="/upload-files">
              <NavbarPage>
                <LoadFilesPage />
              </NavbarPage>
            </PrivateRoute>
          }
        />

        {/* redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default Routing;
