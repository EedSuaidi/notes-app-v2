import React from "react";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/network-data";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const navigate = useNavigate();

  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  const locale = localStorage.getItem("locale");

  return (
    <section className="regsiter-page">
      <h2>
        {locale === "id"
          ? "Isi form untuk mendaftar akun."
          : "Fill the form to register account."}
      </h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        {locale === "id" ? "Sudah punya akun? " : "Already have an account? "}
        <a href="/">{locale === "id" ? "Login di sini" : "Login here"}</a>
      </p>
    </section>
  );
}

export default RegisterPage;
