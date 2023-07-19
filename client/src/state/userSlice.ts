import { createSlice, PayloadAction  } from '@reduxjs/toolkit';
// import type { RootState } from '../store/store';

type initialStateType = {
    userId: string | null,
    token: string | null,
}

type setUserPayloadType = {
    userId: string,
    token: string,
}

const initialState: initialStateType = {
    userId: null,
    token: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<setUserPayloadType>) => {
            state.userId = action.payload.userId;
            state.token = action.payload.token;
        }
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;