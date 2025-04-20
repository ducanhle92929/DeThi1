import { configureStore } from '@reduxjs/toolkit';
import xeMayReducer from './xeMaySlice';

export const store = configureStore({
    reducer: {
        xeMay: xeMayReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;