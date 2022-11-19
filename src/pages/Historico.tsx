import React, { useState, useEffect } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Header from "../components/Header";
import Button from "../components/Button";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import moment from "moment";
import ReactLoading from "react-loading";

import "moment/locale/pt-br";
import api from "../services/api";

export default function Historico() {
  const [token, setToken] = useState(window.sessionStorage.getItem("ng.token"));
  const [username, setUsername] = useState(
    window.sessionStorage.getItem("ng.username")
  );
  const [date, setDate] = useState<moment.Moment | null>(null);
  const [type, setType] = useState("todos");

  const [history, setHistory] = useState<
    | {
        createdAt: string;
        value: number;
        creditedAccount: { username: string };
        debitedAccount: { username: string };
      }[]
    | []
  >([]);
  const [historyStatus, setHistoryStatus] = useState({
    error: "",
    loading: true,
  });

  async function getHistory() {
    let d = date?.toDate();
    let error = "";
    try {
      const res = await api.get(
        `/transactions?token=${token}&filter=${type}&date=${d}`
      );
      setHistory(res.data);
    } catch (err: any) {
      error = err.response.data.message;
    } finally {
      setHistoryStatus({
        ...historyStatus,
        loading: false,
        error: error,
      });
    }
  }

  useEffect(() => {
    getHistory();
  }, []);

  async function handleHistoric(e: React.FormEvent) {
    e.preventDefault();
    let d = date?.toDate(); // Undefined or Date

    getHistory();
  }

  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-black px-[20px]">
        <div className="flex items-center justify-center flex-col gap-[40px] h-full max-w-[1280px] w-full mx-auto pt-[150px]">
          <h1 className="title text-center">Histórico de Transações</h1>
          <div className="flex items-start justify-center flex-col lg:flex-row w-full">
            <div className="w-full lg:w-[50%] h-full flex items-center">
              <div className="max-w-[450px] w-full mx-auto">
                <div className="flex items-center lg:items-start flex-col">
                  <h2 className="text-[24px] text-white">Filtar por</h2>
                  <form
                    onSubmit={(e) => handleHistoric(e)}
                    className="flex flex-col items-start gap-[30px]"
                  >
                    <div className="flex flex-col items-start gap-[10px] pl-[10px]">
                      <label>Data</label>
                      <div className="pl-[10px]">
                        <LocalizationProvider
                          dateAdapter={AdapterMoment}
                          adapterLocale="pt-br"
                        >
                          <DatePicker
                            label="dd/mm/yyyy"
                            value={date}
                            onChange={setDate}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-[10px] pl-[10px]">
                      <label>Tipo</label>
                      <div className="flex flex-col items-start gap-[10px] pl-[10px]">
                        <label className="flex items-center justify-start">
                          <input
                            value="todos"
                            onChange={(e) => setType(e.target.value)}
                            type="radio"
                            name="type"
                            defaultChecked
                          />
                          Todos
                        </label>
                        <label className="flex items-center justify-start">
                          <input
                            value="cash-in"
                            onChange={(e) => setType(e.target.value)}
                            type="radio"
                            name="type"
                          />
                          cash-in
                        </label>
                        <label className="flex items-center justify-start">
                          <input
                            value="cash-out"
                            onChange={(e) => setType(e.target.value)}
                            type="radio"
                            name="type"
                          />
                          cash-out
                        </label>
                      </div>
                    </div>
                    <button type="submit" className="button">
                      Aplicar
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[50%] h-full pb-[50px]">
              {historyStatus.loading ? (
                <div className="w-full h-full flex items-center justify-center">
                  <ReactLoading
                    color="#fff"
                    type="spin"
                    height={50}
                    width={50}
                  />
                </div>
              ) : historyStatus.error ? (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-red">{historyStatus.error}</span>
                </div>
              ) : (
                <div className="w-full max-w-[400px] mx-auto h-full flex items-start justify-center flex-col gap-[20px]">
                  <div className="flex flex-col items-start w-full max-w-[500px] pt-[100px] lg:pt-0 mx-auto gap-[100px]">
                    {history.map((h, i) => {
                      let differentDay = false;
                      let d1 = new Date(h.createdAt);

                      if (i !== 0) {
                        d1.setHours(0, 0, 0, 0);
                        let d2 = new Date(history[i - 1].createdAt);
                        d2.setHours(0, 0, 0, 0);
                        if (d1.getTime() !== d2.getTime()) differentDay = true;
                      }

                      const dateString =
                        d1.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                        }) +
                        " " +
                        d1.toLocaleDateString("pt-BR", {
                          month: "short",
                        }) +
                        " " +
                        d1.toLocaleDateString("pt-BR", {
                          year: "numeric",
                        });

                      let isCashOut = false;
                      if (username === h.debitedAccount.username)
                        isCashOut = true;

                      return (
                        <>
                          {(i === 0 || differentDay) && (
                            <h2 className="text-[32px] text-white w-full text-center font-medium">
                              {dateString}
                            </h2>
                          )}
                          <div className="w-full h-[120px] flex items-center justify-center gap-[20px]">
                            <div className="relative">
                              <RiMoneyDollarCircleLine
                                color={isCashOut ? "#C14856" : "#76C759"}
                                size={50}
                              />
                              {history.length - 1 !== i && (
                                <div className="absolute top-[calc(100%+10px)] left-[50%] translate-x-[-50%] w-[2px] h-[150px] bg-gray"></div>
                              )}
                            </div>
                            <div className="w-full h-full">
                              <div className="flex justify-between items-center">
                                <span className="text-white text-[20px]">
                                  Transação {isCashOut ? "enviada" : "recebida"}
                                </span>
                              </div>
                              <span className="text-gray text-[16px]">
                                {isCashOut
                                  ? h.creditedAccount.username
                                  : h.debitedAccount.username}
                              </span>
                              <div className="flex justify-between items-center pt-[30px]">
                                <span className="text-gray text-[16px]">
                                  Valor
                                </span>
                                <span
                                  className={`${
                                    isCashOut ? "text-red" : "text-green"
                                  }`}
                                >
                                  R$ {h.value},00
                                </span>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
