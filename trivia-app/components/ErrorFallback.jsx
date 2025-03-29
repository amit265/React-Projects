import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Something went wrong 😢</Text>
      <Text style={styles.message}>{error.message}</Text>
      <Button title="Try Again" onPress={resetErrorBoundary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
});

export default ErrorFallback;
