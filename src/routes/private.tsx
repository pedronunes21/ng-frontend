import React, { useState } from "react";
import { Route } from "react-router-dom";
import ReactLoading from "react-loading";
import api from "../services/api";

export default function Private({ children }: { children: React.ReactNode }) {
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(true);
  async function validateToken() {
    try {
      const token = window.sessionStorage.getItem("ng.token");
      const res = await api.post("/jwt/verify", {
        token,
      });

      setValid(true);
    } catch (err) {
      window.location.replace("/login");
    } finally {
      setLoading(false);
    }
  }
  validateToken();

  if (!loading && valid) return <div>{children}</div>;

  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <ReactLoading color="#fff" type="spin" width={50} height={50} />
    </div>
  );
}
