import { create } from 'zustand';

type Language = 'en' | 'hi' | 'jp';

interface LanguageState {
    currentLanguage: Language;
    setLanguage: (lang: Language) => void;
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
}

export const useStore = create<LanguageState>((set) => ({
    currentLanguage: 'en',
    setLanguage: (lang: Language) => set({ currentLanguage: lang }),
    isLoading: false,
    setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
