import * as Yup from "yup";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Ghana phone numbers (10 digits starting with 0)
// e.g. 0241234567, 0551234567
const phoneRegex = /^0\d{9}$/;

export const loginSchema = Yup.object({
  login: Yup.string()
    .trim()
    .required("Email or phone number is required")
    .test(
      "email-or-phone",
      "Enter a valid email address or phone number",
      (value) => {
        if (!value) return false;

        return (
          emailRegex.test(value) ||
          phoneRegex.test(value)
        );
      }
    ),

  password: Yup.string()
    .required("Password is required"),
});