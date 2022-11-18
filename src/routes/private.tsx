import React from "react";
import { Route } from "react-router-dom";

export default function Private(
  { element }: { element: JSX.Element },
  ...props: any[]
) {
  return <Route {...props} element={element} />;
}
