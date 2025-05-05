import { axiosInstence } from "@/lib/axios";
import { create } from "zustand";

interface AuthStore {
	isAdmin: boolean;
	isLoading: boolean;
	error: string | null;

	checkAdminStatus: () => Promise<void>;
	reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAdmin: false,
	isLoading: false,
	error: null,

	checkAdminStatus: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstence.get("/admin/check");
			set({ isAdmin: response.data.admin });
			console.log("hehe");
		} catch (error: any) {
			console.log("Error in checkAdminStatus");
			console.log(error);
			set({ isAdmin: false, error: error.response.data.message });
		} finally {
			set({ isLoading: false });
			console.log("Admin status checked");
		}
	},

	reset: () => {
		set({ isAdmin: false, isLoading: false, error: null });
	},
}));
