import api from "./api";
import { RegisterRequest, LoginRequest ,ForgotPasswordRequest} from "../types/requestTypes";

const authService = {

  register: async (data: RegisterRequest) => {
    const response = await api.post("/register/", data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post("/login/", data);
    return response.data;
  },


  forgotPassword: async (data: ForgotPasswordRequest) => {
  const response = await api.post("/password-reset/", data);
  return response.data;
},

resetPassword: async (data: { token: string; password: string }) => {
  const response = await api.post("/password-reset-confirm/", data);
  return response.data;
},
};

export default authService;