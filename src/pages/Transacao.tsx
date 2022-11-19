import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Button from "../components/Button";
import api from "../services/api";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from "react-toastify";

export default function Transacao() {
  const [token, setToken] = useState(window.sessionStorage.getItem("ng.token"));
  const [balance, setBalance] = useState({
    value: 0,
    loading: true,
    show: false,
  });
  const [transaction, setTransaction] = useState({
    creditedUser: "",
    value: "",
    error: "",
    loading: false,
  });

  async function getUserBalance() {
    try {
      const res = await api.get(`/balance?token=${token}`);

      setBalance({ ...balance, value: res.data.balance, loading: false });
    } catch (err) {}
  }
  useEffect(() => {
    getUserBalance();
  }, []);

  async function handleTransaction(e: React.FormEvent) {
    e.preventDefault();
    setTransaction({ ...transaction, loading: true });

    let error = "";
    let creditedUser = transaction.creditedUser;
    let value = transaction.value;

    try {
      const res = await api.post(`/transaction?token=${token}`, {
        creditedUsername: transaction.creditedUser,
        value: parseInt(value),
      });

      setBalance({
        ...balance,
        value: balance.value - parseInt(value),
      });

      creditedUser = "";
      value = "";

      toast.success("Transação realizada com sucesso!");
    } catch (err: any) {
      error = err.response.data.message;
    } finally {
      setTransaction({
        ...transaction,
        loading: false,
        error: error,
        creditedUser,
        value,
      });
    }
  }

  return (
    <>
      <Header />
      <ToastContainer position="bottom-right" />
      <div className="w-screen h-screen bg-black px-[20px]">
        <div className="flex items-center justify-center flex-col lg:flex-row h-full max-w-[1280px] w-full mx-auto">
          <div className="w-full lg:w-[50%] h-full flex items-center">
            <div className="max-w-[450px] w-full mx-auto">
              <h1 className="title text-center lg:text-left">
                Bom ver você por aqui,{" "}
                {window.sessionStorage.getItem("ng.username")}
              </h1>
              <div className="flex items-center lg:items-start flex-col">
                <h2 className="subtitle">Seu saldo:</h2>
                <div className="flex items-center justify-start">
                  <span className="text-white text-[24px] flex">
                    R$
                    <span
                      style={{
                        width: `${
                          (balance.value.toString().length + 3) * 17
                        }px`,
                      }}
                      className="px-[5px] tracking-[2px] block"
                    >
                      {balance.loading
                        ? " - - - -"
                        : balance.show
                        ? balance.value + ",00"
                        : Array.from(
                            { length: balance.value.toString().length + 3 },
                            (v, i) => "-"
                          ).map((v) => v)}
                    </span>
                  </span>
                  <button
                    onClick={() =>
                      setBalance({ ...balance, show: !balance.show })
                    }
                    className="mt-[7px] ml-[5px]  "
                  >
                    {balance.show ? (
                      <AiOutlineEye size={35} color="white" />
                    ) : (
                      <AiOutlineEyeInvisible size={35} color="white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] h-full">
            <div className="w-full max-w-[400px] mx-auto h-full flex items-start justify-center flex-col">
              <h1 className="title text-center lg:text-left w-full">
                Fazer transação
              </h1>
              <h2 className="subtitle text-center lg:text-left w-full">
                Informe o usuário e o valor
              </h2>

              <form
                onSubmit={(e) => handleTransaction(e)}
                className="flex items-start flex-col gap-[30px] py-[30px] w-full"
              >
                <div className="flex items-start flex-col w-full">
                  <label>Usuário</label>
                  <input
                    type="text"
                    value={transaction.creditedUser}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        error: "",
                        creditedUser: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex items-start flex-col w-full">
                  <label>Valor</label>
                  <input
                    type="number"
                    value={transaction.value}
                    onChange={(e) =>
                      setTransaction({
                        ...transaction,
                        error: "",
                        value: e.target.value,
                      })
                    }
                  />
                </div>
                {transaction.error && (
                  <span className="text-red">{transaction.error}</span>
                )}
                <button className="button" disabled={transaction.loading}>
                  {transaction.loading ? (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
