import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authService } from "../../services/auth.service";
import { AuthResult, JWTData } from "../../types/auth";
import { User } from "../../types/user";

export interface AuthState {
  user?: User | null;
  tokenData?: JWTData | null;
  errorKey?: string | null;
}

let initState: AuthState = {
  tokenData: authService.getJWTData(),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    logOut: (state) => {
      authService.clearJWTData();
      state.tokenData = null;
      state.user = null;
    },
    logIn: (state, action: PayloadAction<AuthResult>) => {
      let authD = action.payload;
      if (authD.code != 200) {
        state.errorKey = getErrorKey(authD.code);
        return;
      }
      state.errorKey = null;
      state.user = action.payload.user;
      authService.saveJWTData({
        refreshToken: authD.refreshToken,
        token: authD.token,
      });
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    refreshToken: (state, action: PayloadAction<JWTData>) => {
      state.tokenData = action.payload;
      authService.saveJWTData(action.payload);
    },
  },
});

export const authSelector = (state: RootState) => state.auth;

function getErrorKey(code: number): string {
  switch (code) {
    case 422:
      return "wrongPassword";
    case 404:
      return "accountNotFound";
    default:
      return "unkownError";
  }
}

export const { logIn, logOut, updateUser,refreshToken } = authSlice.actions;

export default authSlice.reducer;
