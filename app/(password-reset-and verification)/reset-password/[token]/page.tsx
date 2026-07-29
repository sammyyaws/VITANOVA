"use client";

import * as Yup from "yup";
import { useParams, useRouter } from "next/navigation";
import FormikForm from "../../../components/form/FormikForm";
import FormInput from "../../../components/form/FormInput";
import { useLanguage } from "../../../context/LanguageContext";
import authService from "../../../../services/authService";
import { AxiosError } from "axios";
const ResetPassword = () => {
  const { t } = useLanguage();
  const params = useParams();
  const router = useRouter();

  const token = params.token as string;


  // handle submit
  const handleSubmit = async (
    values: { password: string; confirmPassword: string },
    { setSubmitting }: any
  ) => {

    try {

      const response = await authService.resetPassword({
        token,
        password: values.password,
      });

      console.log(response);

      alert("Password reset successful. Please login.");

      router.push("/login");

    } catch (error) {
  if (error instanceof AxiosError) {
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);

    alert(
      JSON.stringify(error.response?.data.password)
    );
  } else {
    console.error(error);
  }
} finally {
      setSubmitting(false);
    }
  };


  // validation schema
  const validationSchema = Yup.object({

    password: Yup.string()
      .min(8, "Password must contain at least 8 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "Passwords must match"
      )
      .required("Confirm your password"),

  });


  return (
    <div className="flex items-center justify-center min-h-screen">

      <FormikForm
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >

        <FormInput
          label={t("Enter Your New Password")}
          name="password"
          placeholder={t("New Password")}
          type="password"
        />


        <FormInput
          label={t("Confirm Your Password")}
          name="confirmPassword"
          placeholder={t("Confirm New Password")}
          type="password"
        />


        <button
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors duration-200 mt-4"
        >
          {t("Submit")}
        </button>

      </FormikForm>

    </div>
  );
};


export default ResetPassword;