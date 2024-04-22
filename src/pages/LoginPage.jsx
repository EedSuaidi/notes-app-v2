import React from "react";
import LoginInput from "../components/LoginInput";
import { login } from "../utils/network-data";
import PropTypes from "prop-types";

function LoginPage({ loginSuccess }) {
  async function onLogin({ email, password }) {
    const { error, data } = await login({ email, password });

    if (!error) {
      loginSuccess(data);
    }
  }

  const locale = localStorage.getItem("locale");

  return (
    <section className="login-page">
      <h2>
        {locale === "id"
          ? "Yuk, login untuk menggunakan aplikasi."
          : "Login to use app, please."}
      </h2>
      <LoginInput login={onLogin} />
      <p>
        {locale === "id" ? "Belum punya akun? " : "Don't have an account? "}
        <a href="/register">
          {locale === "id" ? "Daftar di sini" : "Register here"}
        </a>
      </p>
    </section>
  );
}

LoginPage.propTypes = {
  loginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
