import { create } from 'zustand'

export const useBearStore = create((set) => ({
    black: false,
    setBlack: (e) => set((state) => ({ black: e ? e : !state.black })),
}))