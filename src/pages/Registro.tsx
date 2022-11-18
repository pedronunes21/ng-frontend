import Button from "../components/Button";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import api from "../services/api";

export default function Registro() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: {
      value: "",
      message: "",
    },
    password: {
      value: "",
      message: "",
    },
  });

  useEffect(() => {
    api
      .post("/login", {
        username: "pedropedro1",
        password: "Senha123",
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response.data.message));
  });

  return (
    <>
      <Helmet>
        <title>Registro | Ng cash</title>
      </Helmet>
      <div
        style={{ backgroundImage: "url('/background.png')" }}
        className="w-screen h-full lg:h-screen bg-cover bg-no-repeat px-[20px] min-h-screen flex items-center"
      >
        <div className="flex items-center justify-center h-full w-full mx-auto max-w-[1280px] my-auto flex-col-reverse lg:flex-row">
          <div className="w-full lg:w-[50%] h-full">
            <div className="w-full max-w-[400px] mx-auto h-full flex items-start justify-center flex-col">
              <h1 className="title">Seja bem vindo(a)!</h1>
              <h2 className="subtitle">
                Informe seu usuário e senha para registrar-se
              </h2>

              <form className="flex items-start flex-col gap-[30px] py-[30px] w-full">
                <div className="flex items-start flex-col w-full">
                  <label>Usuário</label>
                  <input
                    type="text"
                    value={form.username.value}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        username: {
                          message: "",
                          value: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex items-start flex-col w-full">
                  <label>Senha</label>
                  <input type="password" />
                </div>
                <Button>Registrar</Button>
              </form>

              <div className="w-full pt-[30px] lg:pt-[100px]">
                <span className="small text-center w-full block">
                  Já tem uma conta?{" "}
                  <a className="text-white font-medium" href="/login">
                    Entrar
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
