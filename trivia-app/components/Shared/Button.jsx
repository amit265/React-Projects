import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Colors from "../../constant/Colors";

export default function Button({ text, type = "fill", onPress, loading, disable = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={loading || disable}
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        marginTop: 15,
        backgroundColor: type == "fill" ? Colors.BUTTON : Colors.WHITE,
      }}
    >
      {!loading ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 15,

            color: type == "fill" ? "black" : Colors.PRIMARY,
            fontFamily: "Poppins-Regular",
          }}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size={"large"}
          color={type == "fill" ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
}
