// utils/showErrorAlert.js
import { Alert } from 'react-native';

const showErrorAlert = (message = "Something went wrong. Please try again later.", onRetry) => {
  Alert.alert(
    "Error", 
    message, 
    [
      { 
        text: "Retry", 
        onPress: () => {
          if (onRetry) onRetry(); // Call the passed retry function if available
        }
      },
      { text: "Cancel", style: "cancel" }
    ],
    { cancelable: true }
  );
};

export default showErrorAlert;
