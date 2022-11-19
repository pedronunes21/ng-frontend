import Button from "../components/Button";
import { Helmet } from "react-helmet";
import React, { useEffect, useState } from "react";
import api from "../services/api";

import ReactLoading from "react-loading";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    error: "",
  });

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    api
      .post("login", {
        username: form.username,
        password: form.password,
      })
      .then((res) => {
        window.sessionStorage.setItem("ng.token", res.data.token);
        window.sessionStorage.setItem("ng.username", res.data.username);

        window.location.assign("/transacao");
      })
      .catch((err) => setForm({ ...form, error: err.response.data.message }))
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Helmet>
        <title>Login | Ng cash</title>
      </Helmet>
      <div
        style={{ backgroundImage: "url('/background.png')" }}
        className="w-screen h-full lg:h-screen bg-cover bg-no-repeat px-[20px] min-h-screen flex items-center"
      >
        <div className="flex items-center justify-center h-full w-full mx-auto max-w-[1280px] my-auto flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-[50%] h-full">
            <div className="w-full max-w-[400px] mx-auto h-full flex items-start justify-center flex-col">
              <h1 className="title">Bem-vindo(a) de volta!</h1>
              <h2 className="subtitle">
                Informe seu usuário e senha para entrar
              </h2>

              <form
                onSubmit={login}
                className="flex items-start flex-col gap-[30px] py-[30px] w-full"
              >
                <div className="flex items-start flex-col w-full">
                  <label>Usuário</label>
                  <input
                    type="text"
                    value={form.username}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        username: e.target.value,
                        error: "",
                      })
                    }
                  />
                </div>
                <div className="flex items-start flex-col w-full">
                  <label>Senha</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        password: e.target.value,
                        error: "",
                      })
                    }
                  />
                </div>
                {form.error && <span className="text-red">{form.error}</span>}
                <button className="button" disabled={loading}>
                  {loading ? (
                    <ReactLoading
                      color="#000"
                      type="spin"
                      height={20}
                      width={20}
                    />
                  ) : (
                    "Enviar"
                  )}
                </button>
              </form>

              <div className="w-full pt-[30px] lg:pt-[100px]">
                <span className="small text-center w-full block">
                  Ainda não tem uma conta?{" "}
                  <a className="text-white font-medium" href="/registro">
                    Registre-se
                  </a>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%]">
            <img className="mx-auto" src="/logo.svg" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
