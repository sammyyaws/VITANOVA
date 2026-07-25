"use client";

import Link from "next/link";
import { useLanguage } from "../../context/LanguageContext";
import FormikForm from "../../components/form/FormikForm";
import FormInput from "../../components/form/FormInput";
import FormCheckbox from "../../components/form/FormCheckbox";
import FormSelect from "../../components/form/FormSelect";
import {roles} from  "../../components/form/Constants"
import { registerInitialValues } from "../../components/form/auth";
import { registerSchema } from "../../../schemas/RegisterSchema";
import { RegisterFormValues } from "../../../types/formTypes";
import authService from "../../../services/authService";





export default function RegisterPage() {
  const { t } = useLanguage();











//formik onsubmit handler
const handleSubmit = async (values:RegisterFormValues)=>{

  const {confirmPassword, agreeTerms, ...payload}=values;

  try {

    const response = await authService.register(payload);

    console.log("Success:", response);

  } catch(error:any){

    console.log("Backend error:", error.response.data);

  }

};

  return (
    <div className="bg-gray-50/50 min-h-screen flex flex-col justify-between">
      {/* Top Header Back Button */}
      <header className="h-20 flex items-center justify-end px-8 md:px-12 w-full">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors duration-200">
          <span>{t("signup.backBtn")}</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 5" />
          </svg>
        </Link>
      </header>

      {/* Main card */}
      <main className="flex-grow flex items-center justify-center px-6 py-10 w-full">
        <section className="w-full max-w-[560px] bg-white border border-gray-100 p-8 md:p-12 rounded-2xl shadow-sm flex flex-col">
          <div className="text-center mb-8 flex flex-col items-center">
            {/* Circle Heart Icon */}
            <div className="w-14 h-14 rounded-full bg-red-50 text-primary flex items-center justify-center mb-5">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight mb-2">{t("signup.cardTitle")}</h1>
            <p className="text-sm text-gray-400">{t("signup.cardSubtitle")}</p>
          </div>






{/**Registration form with formik and yup validation */}
     
<FormikForm
  initialValues={registerInitialValues}
  validationSchema={registerSchema}
  onSubmit={handleSubmit}
>
  <FormInput name="first_name" label={t("first name")} placeholder={t("Enter your first name")} />
  <FormInput name="last_name" label={t("last name")} placeholder={t("Enter your last name")} />
  <FormInput name="email" label={t("email")} placeholder={t("Enter your email")} type="email" />
  <FormInput name="phone_number" label={t("phone number")} placeholder={t("Enter your phone number")} type="tel" />
 <FormSelect
    name="role"
    label={t("role")}
    options={roles.map((role) => ({ value: role.value, label: t(role.label) }))}
    placeholder={t("Select your role")}
  />
  <FormInput name="password" label={t("password")} placeholder={t("Enter your password")} type="password" />
  <FormInput name="confirmPassword" label={t("confirm password")} placeholder={t("Confirm your password")} type="password" />
  <FormCheckbox name="agreeTerms" label={t("agree terms")}  disabled={false} />
  <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 mt-4">
    {t("Sign Up")}
  </button>
</FormikForm>




          

          {/* Login Switch Link */}
          <div className="text-center text-sm font-semibold text-gray-400 mt-6 pt-4 border-t border-gray-50 mb-6">
            {t("signup.promptSignIn")} <Link href="/login" className="text-secondary hover:underline">{t("signup.linkSignIn")}</Link>
          </div>

          {/* Secure Trust indicators */}
          <div className="flex justify-center gap-6 flex-wrap mt-2">
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-400">
              <svg className="text-green-500" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              {t("signup.badgeSecure")}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] md:text-xs font-bold text-gray-400">
              <svg className="text-green-500" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              {t("signup.badgePartner")}
            </div>
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
            <span className="font-bold text-gray-900 uppercase tracking-wider text-xs">{t("footer.columnResources")}</span>
            <ul className="flex flex-col gap-2 list-none text-xs">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Donor Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Service Catalog</a></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-bold text-gray-900 uppercase tracking-wider text-xs">{t("login.footerLegal")}</span>
            <ul className="flex flex-col gap-2 list-none text-xs">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
