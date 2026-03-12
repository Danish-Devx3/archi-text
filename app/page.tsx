"use client";

import React from "react";
import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { OutputPanel } from "@/components/OutputPanel";

export default function Home() {
  return (
    <main className="">
      <Header />

      <div className="flex overflow-hidden">
        {/* Strictly defined 50/50 split */}
        <div className="w-[30%] h-full overflow-hidden">
          <InputPanel />
        </div>

        <div className="flex-1 h-full overflow-hidden">
          <OutputPanel />
        </div>
      </div>
    </main>
  );
}
