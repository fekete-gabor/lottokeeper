import {
  HomePage,
  ProtectedRoute,
  SharedLayout,
  ErrorPage,
  PlayerSelectPage,
} from "./pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES */}
          <Route path="/select-player" element={<PlayerSelectPage />} />

          {/* PROTECTED ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<SharedLayout />}>
              <Route index path="/" element={<HomePage />} />
            </Route>
          </Route>
          {/* END OF PROTECTED ROUTES */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
