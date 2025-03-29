import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const UpgradeAlert = ({ isVisible, onClose, onUpgrade, onWatchAd }) => {
  return (
    <Modal isVisible={isVisible} animationIn="zoomIn" animationOut="zoomOut">
      <View style={styles.container}>
        <Text style={styles.title}>Upgrade to Premium!</Text>
        <Text style={styles.message}>
          Unlock unlimited access and take your learning to the next level with
          a Premium membership!{"\n\n"}
          You can also watch an ad to continue.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onUpgrade} style={styles.upgradeButton}>
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onWatchAd} style={styles.adButton}>
            <Text style={styles.adButtonText}>Watch Ad</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Maybe Later</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "Poppins-Bold",
    color: "#333",
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    color: "#666",
    fontFamily: "Poppins-Regular",

    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 10,
  },
  upgradeButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  upgradeButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  adButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  adButtonText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Poppins-Regular",
  },
  cancelButton: {
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: "#888",
    textAlign: "center",
    fontFamily: "Poppins-Regular",

    fontSize: 16,
  },
});

export default UpgradeAlert;
