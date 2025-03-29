import { View, Text, Image } from "react-native";
import React from "react";
import Button from "../Shared/Button";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";

export default function NoQuiz() {
  const router = useRouter();
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        backgroundColor: Colors.WHITE,
        padding: 20,
        borderRadius: 20
      }}
    >
      <Image
        source={require("../../assets/images/quiz.png")}
        style={{ height: 150, width: 150, marginBottom: 20 }}
        loading="lazy"
      />
      <Text
        style={{
          fontFamily: "Poppins-Bold",
          fontSize: 25,
          textAlign: "center",
        }}
      >
        You don't have any Quiz
      </Text>
      <View style={{ width: "80%" }}>
        <Button
          text={"+ Create New Quiz"}
          onPress={() => router.push("/addquiz")}
        />
        <Button
          text={"Explore Existing Quiz"}
          onPress={() => router.push("/explore")}
        />
      </View>
    </View>
  );
}
