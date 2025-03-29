import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { adConfigContext, leaderBoardDataContext, userDetailsContext } from "../../context/userDetailsContext";
import Feather from "@expo/vector-icons/Feather";
import Colors from "../../constant/Colors";
import { useRouter } from "expo-router";

export default function Header() {
  const { userDetails } = useContext(userDetailsContext);
  const {adConfig, setAdConfig} = useContext(adConfigContext);
  const router = useRouter();
    const { userRank } =
      useContext(leaderBoardDataContext);
  const user =
    "Hello, " + userDetails?.displayName?.trim()?.split(" ")[0] + " !";
  
   // ✅ Load ad config from Firebase
    

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "Poppins-Bold",
            fontSize: 25,
            color: Colors.WHITE,
          }}
        >
          {user}
        </Text>
        <Text
          style={{
            fontFamily: "Poppins-Regular",
            fontSize: 17,
            color: Colors.WHITE,
          }}
        >
          Let's get started
        </Text>
      </View>
      <TouchableOpacity onPress={() => router.push("/profile")}>
        <Feather
          name="settings"
          size={24}
          color="white"
          style={{ bottom: 15 }}
        />
      </TouchableOpacity>
    </View>
  );
}
