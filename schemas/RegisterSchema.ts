import * as Yup from "yup";

export const registerSchema = Yup.object({

  first_name: Yup.string()
    .trim()
    .required("First name is required"),

  last_name: Yup.string()
    .trim()
    .required("Last name is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  phone_number: Yup.string()
    .trim()
    .matches(
      /^\d{10}$/,
      "Phone number must be 10 digits"
    )
    .required("Phone number is required"),

  role: Yup.string()
    .required("Please select a role"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref("password")],
      "Passwords do not match"
    )
    .required("Please confirm your password"),

  agreeTerms: Yup.boolean()
    .oneOf(
      [true],
      "You must accept the terms and conditions"
    )
    .required("You must accept the terms and conditions"),

});