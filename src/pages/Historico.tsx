import React, { useState } from "react";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import Header from "../components/Header";
import Button from "../components/Button";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

export default function Historico() {
  const [date, setDate] = useState(null);
  return (
    <>
      <Header />
      <div className="w-screen h-screen bg-black px-[20px]">
        <div className="flex items-center justify-center flex-col gap-[40px] h-full max-w-[1280px] w-full mx-auto">
          <h1 className="title text-center">Histórico de Transações</h1>
          <div className="flex items-center justify-center flex-col lg:flex-row w-full">
            <div className="w-full lg:w-[50%] h-full flex items-center">
              <div className="max-w-[450px] w-full mx-auto">
                <div className="flex items-center lg:items-start flex-col">
                  <h2 className="text-[24px] text-white">Filtar por</h2>
                  <form className="flex flex-col items-start gap-[30px]">
                    <div className="flex flex-col items-start gap-[10px] pl-[10px]">
                      <label>Data</label>
                      <div className="pl-[10px]">
                        <LocalizationProvider dateAdapter={AdapterMoment}>
                          <DatePicker
                            label="mm/dd/yyyy"
                            value={date}
                            onChange={(d) => {
                              setDate(d);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </LocalizationProvider>
                      </div>
                    </div>
                    <div className="flex flex-col items-start gap-[10px] pl-[10px]">
                      <label>Tipo</label>
                      <div className="flex flex-col items-start gap-[10px] pl-[10px]">
                        <label className="flex items-center justify-start">
                          <input type="radio" name="type" defaultChecked />
                          Todos
                        </label>
                        <label className="flex items-center justify-start">
                          <input type="radio" name="type" />
                          cash-in
                        </label>
                        <label className="flex items-center justify-start">
                          <input type="radio" name="type" />
                          cash-out
                        </label>
                      </div>
                    </div>
                    <Button>Aplicar</Button>
                  </form>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[50%] h-full">
              <div className="w-full max-w-[400px] mx-auto h-full flex items-start justify-center flex-col gap-[20px]">
                <h2 className="text-[24px] text-white w-full text-center font-medium">
                  17 Nov 2022
                </h2>

                <div className="flex flex-col items-start w-full max-w-[500px] mx-auto gap-[100px]">
                  {Array.from({ length: 2 }, (v, i) => i).map((m, i) => (
                    <div className="w-full h-[120px] flex items-center justify-center gap-[20px]">
                      <div className="relative">
                        <RiMoneyDollarCircleLine color="#76C759" size={50} />
                        <div className="absolute top-[calc(100%+10px)] left-[50%] translate-x-[-50%] w-[2px] h-[150px] bg-gray"></div>
                      </div>
                      <div className="w-full h-full">
                        <div className="flex justify-between items-center">
                          <span className="text-white text-[20px]">
                            Transação recebida
                          </span>
                          <small className="text-gray text-[16px]">13:52</small>
                        </div>
                        <span className="text-gray text-[16px]">neto18081</span>
                        <div className="flex justify-between items-center pt-[30px]">
                          <span className="text-gray text-[16px]">Valor</span>
                          <span className="text-green">R$ 75,00</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
