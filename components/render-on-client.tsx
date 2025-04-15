"use client";

import { ReactNode } from "react";

const RenderOnClient = ({ children }: { children: ReactNode }) => {
  return <>{children};</>;
};

export default RenderOnClient;
