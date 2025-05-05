import { axiosInstence } from "@/lib/axios";

import { create } from "zustand";

interface ChatStore{
	users : any[],
	fetchUsers : () => Promise<void>,
	isLoading :boolean,
	error : string | null,
	
}


export const useChatStore = create<ChatStore>((set) => ({
	users: [],
	isLoading : true,
	error : null, 
	fetchUsers: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstence.get("/users");
			set({ users: response.data });
		} catch (error) {
			set({ error: "Failed to fetch users" });
		} finally{
			set({ isLoading: false });
		}
	},

}));