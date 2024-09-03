import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to handle login logic with leaderboard check
export const handleUserLoginCheck = createAsyncThunk(
  "auth/handleLogin",
  async (userData, { dispatch, getState }) => {
    const leaderboard = getState().leaderboard.leaderboard;
    console.log("leaderboard", leaderboard);

    const userExists = leaderboard.some((user) => user.uid === userData.uid);

    if (!userExists) {
      try {
        await saveUserDataToApi(userData);
        console.log("User data saved to database successfully.");
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    } else {
      console.log(
        "User already exists in the leaderboard. No need to save data."
      );
    }

    // Dispatch the login action after checking or saving user data
    dispatch(login(userData));
  }
);

const saveUserDataToApi = async (userData) => {
  try {
    const response = await fetch("https://coderespite.com/api/trivia/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const contentType = response.headers.get("content-type");

    // Check if response is JSON
    if (contentType && contentType.includes("application/json")) {
      const result = await response.json();
      console.log("Parsed JSON successfully:", result);

      if (result.status === 1) {
        console.log(result.message); // Log success message
        return result; // Return the result if needed
      } else {
        console.warn("Unexpected response status:", result.status);
        throw new Error("Unexpected response status");
      }
    } else {
      const text = await response.text();
      console.warn("Unexpected response format:", text);
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("Error occurred during saveUserDataToApi:", error);
    throw error;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      console.log("Login successful");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
