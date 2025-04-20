import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { XeMay } from '../models/XeMay';

interface XeMayState {
    xeMayList: XeMay[];
}

const initialState: XeMayState = {
    xeMayList: [],
};

const xeMaySlice = createSlice({
    name: 'xeMay',
    initialState,
    reducers: {
        setXeMayList(state, action: PayloadAction<XeMay[]>) {
            state.xeMayList = action.payload;
        },
    },
});

export const { setXeMayList } = xeMaySlice.actions;
export default xeMaySlice.reducer;