import { create } from "zustand"

type LoadingStore = {
  count: number
  start: (message?: string) => void
  stop: () => void
  message: string
}

export const useLoadingStore = create<LoadingStore>((set) => ({
  count: 0,
  message: "",
  start: (message = "Processing request.") => {
    set((state) => ({
      count: state.count + 1,
      message,
    }))
  },
  stop: () => {
    set((state) => ({
      count: Math.max(0, state.count - 1),
    }))
  },
}))

export const loading = {
  start(message?: string) {
    useLoadingStore.getState().start(message)
  },

  stop() {
    useLoadingStore.getState().stop()
  },
}
