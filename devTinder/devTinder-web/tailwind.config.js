/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}", // Update based on your framework
];
export const theme = {
  extend: {},
};
export const plugins = [daisyui,];
