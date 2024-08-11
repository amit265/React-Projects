# Customer Details Portal

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit-blue?style=for-the-badge)](https://coderespite.com/projects/react/customer-details-portal/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?style=for-the-badge&logo=github)](https://github.com/amit265/React-Projects/tree/main/customer-details-portal)

Welcome to the **Customer Details Portal** project! This project is a simple, yet powerful example of building a customer management interface with React. It showcases the use of modern React features like custom hooks, memoization, lazy loading, and more.

- **Live Demo**: [Customer Details Portal](https://coderespite.com/projects/react/customer-details-portal/)
- **Repository**: [GitHub - Customer Details Portal](https://github.com/amit265/React-Projects/tree/main/customer-details-portal)

## Overview

The Customer Details Portal is a React-based application designed to display a list of customers and their details. It uses a custom hook to fetch data efficiently, leverages memoization to optimize performance, and employs lazy loading techniques to handle large datasets seamlessly.

### Key Features

- **Custom Hook for Data Fetching**: The project uses a single custom hook (`useFetchData`) to handle all data fetching operations. This hook is designed to be flexible, allowing for polling intervals and managing loading states effectively. The hook ensures that the data is fetched efficiently and consistently across the application.

- **Unsplash API Integration**: The project integrates with the Unsplash API to display a grid of photos for each customer. This adds a visual component to the customer details, making the interface more engaging.


- **Custom Customer Data API**: The customer data is fetched from a custom API hosted at [coderespite.com](https://coderespite.com/api/customer_details.json). The data was sourced from the internet and made available through this API endpoint to simulate real-world API interactions.


- **Memoization with `useCallback`**: To optimize performance, the project makes extensive use of the `useCallback` hook. This ensures that functions like event handlers and data processing functions are not unnecessarily recreated on every render, thus improving the overall performance of the application.

- **Lazy Loading with `ref` and `IntersectionObserver`**: The customer list component employs lazy loading techniques to handle large datasets. By using `ref` and the `IntersectionObserver` API, the application dynamically loads more customers as the user scrolls, ensuring a smooth and responsive user experience even with large amounts of data.

- **Fixed Headers and Scrollable Content**: The UI is designed with a fixed header and scrollable content areas, ensuring that the main page does not scroll while keeping the focus on the customer details and list. This layout is achieved using Tailwind CSS,

- **Shimmer UI**: It uses shimmer effects when resources is being loaded, so that user feels like data is being fetched in background.

### Technical Stack

- **React**: The core library for building the user interface.
- **Custom Hooks**: For encapsulating and reusing logic across components.
- **Memoization**: Using `useCallback` to optimize function creation.
- **IntersectionObserver API**: For lazy loading large datasets.
- **Tailwind CSS**: For styling and responsive design.

### Project Structure

- **`CustomerPortal`**: The main component that handles the overall layout and logic for selecting customers.
- **`CustomerList`**: Displays a list of customers with lazy loading functionality.
- **`CustomerDetails`**: Shows detailed information about the selected customer.
- **`PhotoGrid`**: Show a grid of 9 random images.
- **`useFetchData`**: Custom hook to fetch data from the API with loading state management and optional polling.

### How to Run

To run this project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/amit265/React-Projects.git

2. Navigate to the project directory:
   ```bash
   cd customer-details-portal
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Add your unsplash access API key in the `.env` file or in the constants.

## Usage

1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and visit `http://localhost:3000`, or whatever port your system assigns.

#### Conclusion
This project is an excellent example of a well-optimized React application that efficiently handles data fetching, lazy loading, and UI responsiveness.

For any contributions or issues, please feel free to create a pull request or raise an issue on the GitHub repository.