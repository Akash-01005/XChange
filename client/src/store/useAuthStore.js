import { create } from "zustand"
import axiosInstance from "../lib/axios.js";

export const useAuthStore = create((set) => ({
    authUser: null,
    isSignUp: false,
    isLogin: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    checkAuth: async () => {
      try {
        const res = await axiosInstance.get("/auth/check");
        set({ authUser: res.data.status });
      } catch (err) {
        console.error("Error in checking authentication:", err);
        set({ authUser: null });
      } finally {
        set({ isCheckingAuth: false });
      }
    },
  }));
