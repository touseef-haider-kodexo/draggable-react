import { createSlice } from "@reduxjs/toolkit";

const items = createSlice({
  name: "items",
  initialState: {
    items: [],
    droppedItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((i) => i?.id === action.payload);
      state.items.splice(index, 1);
    },
    addDroppedItem: (state, action) => {
      state.droppedItems.push(action.payload);
    },
    removeDroppedItem: (state, action) => {
      const index = state.droppedItems.findIndex(
        (i) => i?.id === action.payload
      );
      state.droppedItems.splice(index, 1);
    },
  },
});

export const { addItem, removeItem, removeDroppedItem, addDroppedItem } =
  items.actions;

export default items.reducer;
