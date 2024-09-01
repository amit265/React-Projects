import { createSlice } from "@reduxjs/toolkit";

const saveUserDataToApi = async (userData) => {
  try {
    const response = await fetch("https://coderespite.com/api/trivia/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    // Check if the response is OK (status code in the range 200-299)
    if (!response.ok) {
        const errorText = await response.text(); // Get the response text if not OK
        console.error("Error response text:", errorText);
        throw new Error("Network response was not ok.");
      }
  

    // Ensure the response is in JSON format
    const result = await response.json();

    return result; // Return the result if successful
  } catch (error) {
    console.error("Error saving user data:", error);
    throw error; // Rethrow the error after logging it
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
