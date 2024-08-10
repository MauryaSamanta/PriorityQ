import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import HubPage from "scenes/HubPage";
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
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth? <HomePage />:<Navigate to="/" /> }
            />
            <Route
              path="/hub/:hubId/:ownerId/:hubname"
              element={isAuth ? <HubPage hub={hub}/> : <Navigate to="/" />}
            />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
