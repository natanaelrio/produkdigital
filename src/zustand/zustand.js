import { create } from 'zustand'

export const useBearStore = create((set) => ({
    black: false,
    setBlack: (e) => set((state) => ({ black: e ? e : !state.black })),
}))
export const useBearClose = create((set) => ({
    isTrue: false,
    setIsTrue: (e) => set((state) => ({ isTrue: e ? e : !state.isTrue }))
}))