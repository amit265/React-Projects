import { createSlice } from "@reduxjs/toolkit";

const saveUserDataToApi = async (userData) => {
  try {
    console.log("Starting to save user data..."); // Log before making the request

    const response = await fetch("https://coderespite.com/api/trivia/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    console.log("Request sent, waiting for response..."); // Log after the request is sent

    const contentType = response.headers.get("content-type");
    console.log("Response received, content type:", contentType); // Log after receiving the response

    if (contentType && contentType.includes("application/json")) {
      const result = await response.json(); // Parse JSON only if it's JSON
      console.log("Parsed JSON successfully:", result); // Log parsed JSON
      return result;
    } else {
      const text = await response.text(); // Handle non-JSON responses
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
      console.log("login successful");

      // Save user data to the API after logging in
      saveUserDataToApi(action.payload)
        .then(() => console.log("User data saved to database successfully."))
        .catch((error) => console.error("Error saving user data:", error, action.payload));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
