import { create } from 'zustand'

export const useBearStore = create((set) => ({
    black: false,
    setBlack: (e) => set((state) => ({ black: e ? e : !state.black })),
}))
export const useBearClose = create((set) => ({
    isTrue: false,
    setIsTrue: (e) => set((state) => ({ isTrue: e ? e : !state.isTrue }))
}))
export const useBearPayment = create((set) => ({
    isPayment: false,
    setIsPayment: (e) => set(() => ({ isPayment: e }))
}))
export const useBearPaymentPanel = create((set) => ({
    showPaymentPanel: false,
    setShowPaymentPanel: (e) => set((state) => ({ showPaymentPanel: e }))
}))
export const useBearLoading = create((set) => ({
    loading: false,
    setLoading: (e) => set((state) => ({ loading: e }))
}))

export const useBearDataPayment = create((set) => ({
    dataPayment: null,
    setDataPayment: (e) => set((state) => ({ dataPayment: e }))
}))

export const useBearChecking = create((set) => ({
    checking: false,
    setChecking: (e) => set((state) => ({ checking: e }))
}))
export const useBearPaymentStatus = create((set) => ({
    paymentStatus: null,
    setPaymentStatus: (e) => set((state) => ({ paymentStatus: e }))
}))
export const useBearSuccess = create((set) => ({
    isSuccess: false,
    setIsSuccess: (e) => set((state) => ({ isSuccess: e }))
}))