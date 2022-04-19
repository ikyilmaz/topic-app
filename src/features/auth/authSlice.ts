import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { authLoginAPI, authLogoutAPI, authSignupAPI } from "./authAPI";
import { AuthState, AuthLoginParams, AuthSignupParams } from "./authTypes";

const initialState: AuthState = {
  user: null,
  loginStatus: "idle",
  loginError: null,
  signupStatus: "idle",
  signupError: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (data: AuthLoginParams): Promise<void> => {
    await authLoginAPI(data);
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (): Promise<void> => {
    await authLogoutAPI();
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (data: AuthSignupParams): Promise<void> => {
    await authSignupAPI(data);
  }
);

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      if (!!action.payload)
        localStorage.setItem("user", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(login.fulfilled, (state) => {
        state.loginStatus = "idle";
      })
      .addCase(login.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginError = action.error.code as string;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      // SIGN UP
      .addCase(signup.pending, (state) => {
        state.signupStatus = "loading";
      })
      .addCase(signup.fulfilled, (state) => {
        state.signupStatus = "idle";
      })
      .addCase(signup.rejected, (state, action) => {
        state.signupStatus = "failed";
        state.signupError = action.error.code as string;
      });
  },
});

export const { setUser } = counterSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;

export default counterSlice.reducer;
