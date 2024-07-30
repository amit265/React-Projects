# Swiggy Clone App

This is a Swiggy Clone app built with React. It lists restaurants using the Swiggy API, allows you to view restaurant details and menus, and lets you add food items to a cart, place orders, and view success messages.

## Features

- List restaurants using Swiggy API.
- View restaurant details and menus.
- Add food items to the cart.
- Place orders and view success messages.
- Navigate through the app using React Router DOM.
- Manage state with Redux.
- Use custom hooks for API calls.

## Technologies Used

- React
- Redux
- React Router DOM
- Custom Hooks
- Swiggy API

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/amit265/React-Projects.git
   cd react-projects/swiggy-app
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm start
   ```

## Usage

1. **Home Page:**
   - The home page lists all available restaurants using the Swiggy API.

2. **Restaurant Page:**
   - Click on a restaurant to view its details and menu. The menu is fetched using another API call through a custom hook.

3. **Add to Cart:**
   - Add food items to the cart. The cart state is managed using Redux.

4. **Cart Page:**
   - View the items in your cart and proceed to order.

5. **Order and Success Message:**
   - Place your order and receive a success message. You will then be redirected to the home page.

## Custom Hooks

## State Management

- **Redux Store:** Manages the cart state and other global states.

## Project Structure

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any improvements or suggestions.
