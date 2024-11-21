import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import LandingPage from "scenes/LandingPage";
import HomePage from "scenes/homePage";
import AboutUs from "scenes/AboutUs";
import LoginPage from "scenes/loginPage";
import HubPage from "scenes/HubPage";
import ContactUs from "scenes/ContactUs"
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const hub = {
    qubes: [
      { id: 1, name: "Qube 1", zones: [{ id: 1, name: "Zone 1" }, { id: 2, name: "Zone 2" }] },
      { id: 2, name: "Qube 2", zones: [{ id: 3, name: "Zone 3" }, { id: 4, name: "Zone 4" }] },
    ],
  };
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route
              path="/home"
              element={isAuth? <HomePage />:<Navigate to="/login" /> }
            />
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route
              path="/hub/:hubId/:ownerId/:hubname"
              element={isAuth ? <HubPage hub={hub}/> : <Navigate to="/" />}
            />
            <Route path="/contact-us" element={<ContactUs />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
