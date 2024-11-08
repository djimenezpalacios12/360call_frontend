import { Routes, Route, Navigate } from "react-router-dom";

import AuthenticationPage from "@/views/AuthenticationPage";
import LoadFilesPage from "@/views/loadFilesPage/files";
import Navbar from "@/components/navbar/navbar";

// Routing
const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route
          path="/load"
          element={
            <Navbar>
              <LoadFilesPage />
            </Navbar>
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
