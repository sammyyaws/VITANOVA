import { RegisterFormValues,LoginFormValues } from "../../../types/formTypes"


export const registerInitialValues: RegisterFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  role: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
};


export const loginInitialValues: LoginFormValues = {
  login: "",
  password: "",
};