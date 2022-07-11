import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  filter: "",
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactAdded: (state, action) => {
      state.contacts.push(action.payload);
    },

    deleteContact: (state, action) => {
      const contactId = action.payload;
      const idx = state.contacts.findIndex((item) => item.id === contactId);
      state.contacts.splice(idx, 1);
    },

    filterContact: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { todoAdded, todoToggled, todosLoading } = contactsSlice.actions;

export default contactsSlice.reducer;
