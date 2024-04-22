import React from "react";
import LocaleContext from "../contexts/LocaleContext";
import { Link } from "react-router-dom";

function Navigation() {
  const { locale, toggleLocale } = React.useContext(LocaleContext);

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/archives">
            {locale === "id" ? "Terarsip" : "Archived"}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
