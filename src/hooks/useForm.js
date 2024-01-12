import { create } from "zustand";

export const useForm = create((set) => ({
  emailError: "",
  passwordError: "",
  error: "",

  updateEmailError: (emailError) =>
    set(() => ({
      emailError,
    })),
  updatePasswordError: (passwordError) =>
    set(() => ({
      passwordError,
    })),
  updateError: (error) =>
    set(() => ({
      error,
    })),

  password: "",
  email: "",

  updatePassword: (password) =>
    set(() => ({
      password,
    })),
  updateEmail: (email) =>
    set(() => ({
      email,
    })),

  visible: false,
  flipVisible: () => set((state) => ({ visible: !state.visible })),
  reset: () => set((state) => ({visible: false,emailError: "",passwordError: "",error: "",password: "",email: "",}))
}));