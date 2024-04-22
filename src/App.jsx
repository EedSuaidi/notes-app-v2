import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import ToggleTheme from "./components/ToggleTheme";
import LogoutButton from "./components/LogoutButton";
import HomePage from "./pages/HomePage";
import ArchievesPage from "./pages/ArchievesPage";
import DetailPage from "./pages/DetailPage";
import AddPage from "./pages/AddPage";
import NotFound from "./pages/NotFound";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ThemeContext from "./contexts/ThemeContext";
import LocaleContext from "./contexts/LocaleContext";
import ToggleLocale from "./components/ToggleLocale";
import {
  getUserLogged,
  putAccessToken,
  deleteNote,
} from "./utils/network-data";

function App() {
  const [theme, setTheme] = React.useState(localStorage.getItem("data-theme"));
  const [locale, setLocale] = React.useState(localStorage.getItem("locale"));
  const [authedUser, setAuthedUser] = React.useState(null);
  const [initializing, setInitializing] = React.useState(true);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem("data-theme", newTheme);
      return prevTheme === "light" ? "dark" : "light";
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === "id" ? "en" : "id";
      localStorage.setItem("locale", newLocale);
      return prevLocale === "id" ? "en" : "id";
    });
  };

  const themeContextValue = React.useMemo(() => {
    return {
      theme,
      toggleTheme,
    };
  }, [theme]);

  const localeContextValue = React.useMemo(() => {
    return {
      locale,
      toggleLocale,
    };
  }, [locale]);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserLogged();
        setAuthedUser(data);
        setInitializing(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken("");
  };

  if (initializing) {
    return <div className="app-container loading">Loading ...</div>;
  }

  if (authedUser === null) {
    return (
      <div className="app-container">
        <ThemeContext.Provider value={themeContextValue}>
          <LocaleContext.Provider value={localeContextValue}>
            <header>
              <h1>
                <Link to="/">
                  {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
                </Link>
              </h1>
              <ToggleLocale />
              <ToggleTheme />
            </header>
            <main>
              <Routes>
                <Route
                  path="/*"
                  element={<LoginPage loginSuccess={onLoginSuccess} />}
                ></Route>
                <Route path="/register" element={<RegisterPage />}></Route>
              </Routes>
            </main>
          </LocaleContext.Provider>
        </ThemeContext.Provider>
      </div>
    );
  }

  return (
    <div className="app-container">
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <header>
            <h1>
              <Link to="/">
                {locale === "id" ? "Aplikasi Catatan" : "Notes App"}
              </Link>
            </h1>
            <Navigation />
            <ToggleLocale />
            <ToggleTheme />
            <LogoutButton logout={onLogout} name={authedUser.name} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<HomePage />}></Route>
              <Route path="/notes/:id" element={<DetailPage />}></Route>
              <Route path="/notes/new" element={<AddPage />}></Route>
              <Route path="/archives" element={<ArchievesPage />}></Route>
              <Route path="*" element={<NotFound />}></Route>
            </Routes>
          </main>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;
