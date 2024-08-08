import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ApartmentState {
  apartmentId: string | null;
}

const initialState: ApartmentState = {
  apartmentId: null,
};

const apartmentSlice = createSlice({
  name: 'apartment',
  initialState,
  reducers: {
    setApartmentId: (state, action: PayloadAction<string | null>) => {
      state.apartmentId = action.payload;
    },
  },
});

export const { setApartmentId } = apartmentSlice.actions;
export default apartmentSlice.reducer;
