import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function SubscriptionWall() {
  const router = useRouter();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.BACKGROUND,
      }}
    >
      <Ionicons name="hourglass-outline" size={50} color={Colors.PRIMARY} />
      <Text
        style={{
          fontSize: 24,
          fontFamily: "Poppins-Bold",
          color: Colors.WHITE,
          marginTop: 20,
          paddingHorizontal: 10,
        }}
      >
        Subscription Plans Coming Soon
      </Text>
      <TouchableOpacity
        onPress={() => router.replace("/home")}
        style={{
          marginTop: 30,
          paddingVertical: 12,
          paddingHorizontal: 30,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontFamily: "Poppins-Bold",
            color: Colors.WHITE,
          }}
        >
          Go Back to Home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
