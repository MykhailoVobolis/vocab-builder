import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalType: null,
    mobileMenuIsOpen: false,
  },
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = null;
    },
    openModalMobile: (state) => {
      state.mobileMenuIsOpen = true;
    },
    closeModalMobile: (state) => {
      state.mobileMenuIsOpen = false;
    },
  },
});

export const { openModal, closeModal, openModalMobile, closeModalMobile } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
