"use client";

import { useAppSelector } from "../../store/hook";

import React from "react";

export default function DonorPage() {
const user=useAppSelector(state=>state.auth.user);


  return (
    <div className="pt-32 pb-20 px-6 min-h-screen bg-gray-50/50 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-gray-100 p-8 rounded-2xl shadow-sm text-center">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Donor Dashboard</h1>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">
          Welcome <span className="font-bold text-xl"> {user?.first_name} </span> to your VitaNova donor dashboard. Here you will be able to manage your schedule, track your donations, and view matching patient requests.
        </p>
      </div>
    </div>
  );
}