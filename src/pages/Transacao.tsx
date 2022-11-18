import React from "react";
import Header from "../components/Header";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Button from "../components/Button";

export default function Transacao() {
  return (
    <>
      <Header />
      <div className="w-screen h-screen bg-black px-[20px]">
        <div className="flex items-center justify-center flex-col lg:flex-row h-full max-w-[1280px] w-full mx-auto">
          <div className="w-full lg:w-[50%] h-full flex items-center">
            <div className="max-w-[450px] w-full mx-auto">
              <h1 className="title text-center lg:text-left">
                Bom ver você por aqui, Pedro
              </h1>
              <div className="flex items-center lg:items-start flex-col">
                <h2 className="subtitle">Seu saldo:</h2>
                <div className="flex items-center justify-start">
                  <span className="text-white text-[24px]">R$ - - - -</span>
                  <button className="mt-[7px] ml-[5px]  ">
                    <AiOutlineEyeInvisible size={35} color="white" />
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

              <form className="flex items-start flex-col gap-[30px] py-[30px] w-full">
                <div className="flex items-start flex-col w-full">
                  <label>Usuário</label>
                  <input type="text" />
                </div>
                <div className="flex items-start flex-col w-full">
                  <label>Valor</label>
                  <input type="number" />
                </div>
                <Button>Enviar</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
