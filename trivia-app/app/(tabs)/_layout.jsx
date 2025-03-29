import { Tabs } from "expo-router";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { BannerAdComponent } from "../../components/Shared/AdManager";
import { View } from "react-native";
import Colors from "../../constant/Colors";
import { useContext } from "react";
import { userDetailsContext } from "../../context/userDetailsContext";

export default function TabLayout() {

    const { userDetails } = useContext(userDetailsContext);
    const isPremium = userDetails?.member;
  return (
    <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
        <View
            style={{ alignItems: "center", backgroundColor: Colors.BACKGROUND, marginTop: 5 }}
          >
            {!isPremium && <BannerAdComponent />}
          </View>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "blue",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: { padding: 35 },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused, size = 24 }) => (
              <Entypo
                name="home"
                size={size}
                color={focused ? "blue" : "gray"}
              />
            ),
            tabBarLabel: "Home",
          }}
        />

        {/* ✅ Remove tabs for guests */}

        <Tabs.Screen
          name="quiz"
          options={{
            tabBarIcon: ({ focused, size = 24 }) => (
              <MaterialCommunityIcons
                name="progress-check"
                size={size}
                color={focused ? "blue" : "gray"}
              />
            ),
            tabBarLabel: "Quiz",
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            tabBarIcon: ({ focused, size = 24 }) => (
              <MaterialIcons
                name="explore"
                size={size}
                color={focused ? "blue" : "gray"}
              />
            ),
            tabBarLabel: "Explore",
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ focused, size = 24 }) => (
              <AntDesign
                name="user"
                size={size}
                color={focused ? "blue" : "gray"}
              />
            ),
            tabBarLabel: "Profile",
          }}
        />
      </Tabs>
      {/* ✅ Ad is now properly positioned above the tab bar */}
   
    </View>
  );
}
