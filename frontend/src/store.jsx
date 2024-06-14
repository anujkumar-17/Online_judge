// store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    role: null,
    // other user properties
  },
  reducers: {
    setUserRole: (state, action) => {
      state.role = action.payload;
    },
    // other reducers
  },
});

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    // other reducers
  },
});

export const { setUserRole } = userSlice.actions;
export default store;