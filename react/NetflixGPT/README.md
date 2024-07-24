---

# Netflix GPT React App

Welcome to the Netflix GPT React App! This app allows you to search for movies, get recommendations from GPT, and log in using Firebase.

## Features

- **Search Movies:** Easily search for movies and get details about them.
- **GPT Recommendations:** Get personalized movie recommendations using GPT.
- **Firebase Authentication:** Securely log in and manage your account with Firebase.

## Getting Started

Follow these steps to set up and run the app on your local machine.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/netflix-gpt-react-app.git
   cd netflix-gpt-react-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   or

   ```bash
   yarn install
   ```

3. **Set up Firebase:**

   - Go to the [Firebase Console](https://console.firebase.google.com/).
   - Create a new project.
   - Go to the project settings and find your Firebase config object.
   - Create a `.env` file in the root of your project and add the following:

     ```env
     REACT_APP_FIREBASE_API_KEY=your-api-key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
     REACT_APP_FIREBASE_PROJECT_ID=your-project-id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
     REACT_APP_FIREBASE_APP_ID=your-app-id
     ```

### Running the App

1. **Start the development server:**

   ```bash
   npm start
   ```

   or

   ```bash
   yarn start
   ```

2. Open your browser and go to `http://localhost:3000`.

### Usage

- **Search for Movies:** Use the search bar to find movies. You will see a list of movies with their details.
- **Get Recommendations:** Click on the "Get Recommendations" button to receive personalized movie recommendations from GPT.
- **Log In:** Use the log in feature to securely log in with Firebase. This will allow you to save your favorite movies and manage your account.

## Contributing

We welcome contributions from the community! If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or feedback, feel free to open an issue or contact us at [your-email@example.com](mailto:your-email@example.com).

---
