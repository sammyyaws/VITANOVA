import api from "./api";
import { RegisterRequest, LoginRequest } from "../types/requestTypes";

const authService = {

  register: async (data: RegisterRequest) => {
    const response = await api.post("/register/", data);
    return response.data;
  },

  login: async (data: LoginRequest) => {
    const response = await api.post("/login/", data);
    return response.data;
  },

};

export default authService;