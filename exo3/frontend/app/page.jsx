"use client";

import { useAccount } from "wagmi";
import Header from "@/app/components/Header";
import Main from "@/app/components/Main";
import NotConnected from "@/app/components/NotConnected";

export default function Page() {
  let { isConnected } = useAccount();

  return (
    <>
      <Header />
      {isConnected ? <Main /> : <NotConnected />}
    </>
  );
}
