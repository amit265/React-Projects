# Netflix GPT Project

Welcome to the Netflix GPT project! This application provides a seamless movie searching and browsing experience, integrating several advanced features.

## Features

- **User Authentication**: Utilizes Firebase for secure user login.
- **Movie Search**: Leverages TMDB API to search for movies and display comprehensive details.
- **Movie Recommendations**: Integrates with OpenAI API for movie recommendations (temporarily unavailable due to token exhaustion).
- **Responsive Design**: Fully responsive across all screen sizes.
- **Movie Information**: Displays ratings, release dates, descriptions, and more.
- **Trailer Playback**: Each movie card includes a button to play the trailer.
- **State Management**: Uses Redux store to manage fetched data.
- **Language Configuration**: Configurable state to change website language.
- **Session Management**: Remembers user sessions and displays the username upon login.
- **Performance Optimization**: Implements memoization to avoid redundant data fetching.
- **Comprehensive React Concepts**: Showcases custom hooks, React Router, and Redux store.

## Demo

[![Live Demo](https://img.shields.io/badge/Live-Demo-green.svg)](https://coderespite.com/projects/react/netflixgpt/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/amit265/React-Projects.git
   ```
2. Navigate to the project directory:
   ```bash
   cd netflixgpt
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add your Firebase configuration, TMDB API key, and OpenAI API key in the `.env` file.

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and visit `http://localhost:3000`.

## Technologies Used

- **Frontend**: React, Redux, React Router
- **Backend**: Firebase Authentication, TMDB API, OpenAI API
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Other**: Memoization for performance optimization

## Contributions

Contributions are welcome! Feel free to open an issue or submit a pull request.

## Contact

For any questions or suggestions, please reach out at [amitk.kumar414@gmail.com](mailto:amitk.kumar414@gmail.com).
