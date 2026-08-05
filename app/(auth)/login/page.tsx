"use client";
import axios from "axios"
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import FormikForm from "../../components/form/FormikForm";
import FormInput from "../../components/form/FormInput";
import FormCheckbox from "../../components/form/FormCheckbox";
import { loginInitialValues } from "../../components/form/auth";
import { loginSchema } from "../../../schemas/loginSchema";
import  authService  from "../../../services/authService";
import { useAppDispatch } from "../../store/hook";
import { loginSuccess } from "../../store/auth/authSlice";
import {saveAuth}  from  "../../utils/authStorage";
import Toast from "../../components/ui/Toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {

  const { t } = useLanguage();
  const dispatch=useAppDispatch()
  const router =useRouter();
  const [toast, setToast] = useState<{msg:string; type:"success"|"error"} | null>(null);
  //handle suubmit function

  const handleSubmit = async (values: any) => {
      console.log("handleSubmit called");
  console.log(values);
    const {rememberMe, ...payload}=values;
    try {
     const response = await authService.login(payload);
     saveAuth(response.access,response.refresh, response.user)
     dispatch(loginSuccess(response));
      setToast({msg: "Login successful! Redirecting…", type: "success"});
     
     if(response.user.role=='Donor'){
      router.push("/donor")

     }
     else if(response.user.role=="Patient"){   
      router.push("/patient")
     }
     else if (response.user.role=="OrganizationAdmin"){
      router.push('/hospital')
     }



    } catch (error: any) {
  if (axios.isAxiosError(error)) {
    console.log("Status:", error.response?.status);
    console.log("Response:", error.response?.data);
    setToast({msg: JSON.stringify(error.response?.data?.detail || "An error occurred during login."), type: "error"});
    
  } else {
    console.log(error);
  }
}
  };

  return (
    <>
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
      <div className="bg-gray-50/50 min-h-screen flex flex-col justify-between">
      {/* Top Header Back Button */}
      <header className="h-20 flex items-center px-8 md:px-12 w-full">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors duration-200">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          <span>{t("login.backBtn")}</span>
        </Link>
      </header>

      {/* Main card */}
      <main className="flex-grow flex items-center justify-center px-6 py-10 w-full">
        <section className="w-full max-w-[460px] bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-sm flex flex-col">
          <div className="text-center mb-8 flex flex-col items-center">
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <Image
                src="/vitanova512.png"
                alt="VitaNova Logo"
                width={36}
                height={36}
                priority
              />
              <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
                Vita<span className="text-primary">Nova</span>
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">{t("login.cardTitle")}</h1>
            <p className="text-sm text-gray-400">{t("login.cardSubtitle")}</p>
          </div>


{/**Form fields */}
<FormikForm
            initialValues={loginInitialValues}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
          >
            <FormInput name="login" label={t("Email or Phone number")} placeholder={t("Enter  your Phone Number or Email")} />
            <FormInput name="password" label={t("Password")} placeholder={t("Enter your password")} type="password" />
            <FormCheckbox name="rememberMe" label={t("Remember me")} disabled={false} />

            <div className="flex justify-end mt-2">
             <Link href="/forgot-password">
              <span className="text-primary text-sm hover:underline cursor-pointer">
            {t("Forgot Password?")}
              </span>
              </Link>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 mt-4">
              {t("Submit")}
            </button>
          </FormikForm>











          {/* SignUp Link */}
          <div className="text-center text-sm font-semibold text-gray-400 mt-6 pt-4 border-t border-gray-50">
            {t("login.promptSignUp")} <Link href="/signup" className="text-secondary hover:underline">{t("login.linkSignUp")}</Link>
          </div>
        </section>
      </main>

      {/* Simplified Footer */}
      <footer className="bg-white border-t border-gray-100 py-10 px-8 w-full">
        <div className="container mx-auto max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
          <div className="flex flex-col gap-2.5">
            <span className="font-bold text-gray-900 text-base">VitaNova</span>
            <p className="text-xs text-gray-400 leading-normal max-w-xs">
              Empowering the blood donation ecosystem through advanced logistics and real-time coordination.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-gray-900 uppercase tracking-wider text-xs">{t("login.footerSupport")}</span>
            <ul className="flex flex-col gap-2 list-none text-xs">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Emergency Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Donor Support</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-gray-900 uppercase tracking-wider text-xs">{t("login.footerLegal")}</span>
            <ul className="flex flex-col gap-2 list-none text-xs">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
    </>
  );
}


