import axios from "axios";

export const axiosInstence = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL === "development"
      ? "http://localhost:5000/api"
      : "/api",
});
