import { create } from 'zustand';

interface TokenStore {
    userName: string;
    setUserName: (userName: string) => void;
	token: string;
	setToken: (token: string) => void;
}

export const useToken = create<TokenStore>((set) => ({
	token: '',
	setToken: (token: string) => set({ token }),
    userName: '',
    setUserName: (userName: string) => set({ userName }),
}));
