import api from "./api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const donorService = {
  getMyProfile: async () => {
    const response = await api.get("/profile/donor/me/", authHeader());
    return response.data;
  },

  createProfile: async (data: any) => {
    const response = await api.post("/profile/donor/", data, authHeader());
    return response.data;
  },
};

export default donorService;
