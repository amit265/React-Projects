import React from "react";
import { View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "@/constant/Colors";

const SplashScreenComponent = () => {
  return (
    <View style={styles.container}>
      {/* Full-screen background image */}
      <Image
        source={require("../../assets/images/splash.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />

      {/* Overlay animation */}
      <LottieView
        source={require("../../assets/loading.json")}
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND, // Ensures no empty spaces
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  animation: {
    position: "absolute",
    width: 100, // Adjust size as needed
    height: 100,
  },
});

export default SplashScreenComponent;
