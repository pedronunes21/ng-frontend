import React, { useState } from "react";
import { redirect } from "react-router-dom";
import { Squash } from "hamburger-react";

export default function Header() {
  const [isOpen, setOpen] = useState(false);

  function logout() {
    window.sessionStorage.removeItem("ng.token");
    window.sessionStorage.removeItem("ng.username");

    window.location.replace("/login");
  }

  return (
    <div className="p-[20px] h-[90px] w-full fixed top-0 left-0">
      <div className="flex items-center justify-between sm:justify-start gap-[30px] max-w-[1280px] w-full mx-auto">
        <div>
          <img className="h-[50px]" src="/logo.svg" alt="Ng cash" />
        </div>
        <div
          className="flex items-center justify-center sm:justify-between flex-col sm:flex-row w-full sm:static fixed top-[90px] left-0 h-[calc(100vh-90px)] sm:h-auto duration-200 ease-out sm:!translate-x-[0] bg-black sm:bg-transparent"
          style={{ transform: isOpen ? "translateX(0)" : "translateX(100%)" }}
        >
          <div className="flex sm:gap-[20px] sm:flex-row flex-col">
            <a
              className="text-[18px] text-white text-center py-[10px] sm:py-0"
              href="/transacao"
            >
              Fazer transação
            </a>
            <a
              className="text-[18px] text-white text-center py-[10px] sm:py-0"
              href="/historico"
            >
              Histórico
            </a>
          </div>
          <div>
            <button
              onClick={logout}
              className="text-[18px] text-white py-[10px] sm:py-0"
            >
              Sair
            </button>
          </div>
        </div>
        <div className="block sm:hidden">
          <Squash toggled={isOpen} toggle={setOpen} color="#fff" />
        </div>
      </div>
    </div>
  );
}
