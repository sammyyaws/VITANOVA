"use client";

import * as Yup from "yup";
import FormikForm from "../../components/form/FormikForm";
import FormInput from "../../components/form/FormInput";
import { useLanguage } from "../../context/LanguageContext";
import authService from "../../../services/authService";
const ForgotPassword = () => {
  const { t } = useLanguage();


  //handleSubmit
const handleSubmit = async (
  values: { email: string },
  { setSubmitting }: any
) => {
  try {
    const response = await authService.forgotPassword(values);

    console.log(response);

    alert(
      "If an account with that email exists, a password reset email has been sent."
    );

  } catch (error: any) {
  console.log(error.response?.data);
  console.log(error.response?.status);
}
  finally {
    setSubmitting(false);
  }
};


  //schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
  });













  return (
    <div className="flex items-center justify-center min-h-screen">

      <FormikForm
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormInput
          label={t("Enter Your Email to reset password")}
          name="email"
          placeholder={t("Enter your registered email")}
        />
           <button type="submit" className="w-full bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 mt-4">
              {t("Submit")}
            </button>
      </FormikForm>

    </div>
  );
};

export default ForgotPassword;