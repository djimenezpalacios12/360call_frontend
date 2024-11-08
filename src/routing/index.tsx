import { Routes, Route, Navigate } from "react-router-dom";

import AuthenticationPage from "@/views/AuthenticationPage";
import { NavbarPage } from "@/components/navbar";

// Routing
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route
          path="/chat"
          element={
            <>
              <NavbarPage />
            </>
          }
        />
        <Route
          path="/upload"
          element={
            <>
              <NavbarPage />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <NavbarPage />
            </>
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
