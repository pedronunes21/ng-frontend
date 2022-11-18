import React from "react";

type ButtonType = {
  children: React.ReactNode;
};

export default function Button({ children }: ButtonType) {
  return (
    <div className="w-full">
      <button
        className="flex items-center justify-center bg-white text-black text-[20px] text-center w-full max-w-[400px] h-[55px] font-medium duration-150 ease-linear hover:bg-purple hover:text-white"
        type="submit"
      >
        {children}
      </button>
    </div>
  );
}
