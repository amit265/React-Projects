import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from "react-native";
import React, { useContext } from "react";
import Colors from "../../constant/Colors";
import { userDetailsContext } from "../../context/userDetailsContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebaseConfig";
import { ProfileMenu } from "../../constant/Option";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Profile() {
  const router = useRouter();
  const { userDetails, setUserDetails } = useContext(userDetailsContext);
  const isGuest = userDetails?.displayName === "guest";

  const onMenuClick = (menu) => {
    if (menu.name === "Logout") {
      if (Platform.OS === "web") {
        const isConfirmed = window.confirm("Are you sure you want to log out?");
        if (!isConfirmed) return;
      } else {
        Alert.alert("Confirm Logout", "Are you sure you want to log out?", [
          { text: "Cancel", style: "cancel" },
          {
            text: "Logout",
            style: "destructive",
            onPress: () => handleLogout(),
          },
        ]);
        return;
      }

      handleLogout(); // Call logout function if confirmed
    } else if (menu.name === "Add Quiz") {
      router.push("/addquiz");
    } else if (menu.name === "Privacy Policy") {
      Linking.openURL(
        "https://mindcraftlearning.github.io/triviaquestai"
      );
    } else {
      router.push(menu?.path);
    }
  };

  // Separate logout function

  async function handleLogout() {
    try {
      await AsyncStorage.clear();
      await auth.signOut();
      setUserDetails(null); 
      router.replace("/"); // Redirect to login screen
    } catch (error) {
      console.error("Error signing out:", error);
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.BACKGROUND }}>
      {/* Blur Overlay for Guest Users */}
      {isGuest && (
        <BlurView intensity={30} style={styles.blurOverlay}>
          <View style={styles.overlayContent}>
            <Text style={styles.overlayText}>Sign in to access content</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.replace("/")}
            >
              <Text style={styles.buttonText}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 30 }}
        style={{ paddingBottom: 20 }}
        pointerEvents={isGuest ? "none" : "auto"} // Prevent interaction when blurred
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Profile</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileContainer}>
          <Image
            source={
              userDetails?.photoURL
                ? { uri: userDetails?.photoURL }
                : require("../../assets/images/user.png")
            }
            style={styles.profileImage}
            loading="lazy"
          />

          <Text style={styles.userName}>{userDetails?.displayName}</Text>
          {!isGuest && (
            <Text style={styles.userEmail}>{userDetails?.email}</Text>
          )}
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {ProfileMenu.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onMenuClick(item)}
              style={styles.menuItem}
            >
              <Ionicons
                name={item.icon}
                size={26}
                color={Colors.PRIMARY}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>{item?.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 1,
  },
  overlayContent: {
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
    borderRadius: 15,
    alignItems: "center",
  },
  overlayText: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: Colors.WHITE,
    marginBottom: 10,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.BUTTON,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "Poppins-Regular",
    color: Colors.BACKGROUND,
  },
  header: {
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "ios" ? 50 : 10,
  },
  headerText: {
    fontFamily: "Poppins-Bold",
    fontSize: 30,
    color: Colors.WHITE,
  },
  profileContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: Colors.LIGHT_GRAY,
  },
  userName: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: Colors.WHITE,
    marginTop: 10,
  },
  userEmail: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: Colors.WHITE,
  },
  menuContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    padding: 15,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: "#ddd",
    width: Dimensions.get("screen").width * 0.85,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  menuIcon: {
    backgroundColor: Colors.BG_GRAY,
    padding: 12,
    borderRadius: 10,
  },
  menuText: {
    fontFamily: "Poppins-Regular",
    fontSize: 18,
    marginLeft: 15,
  },
});
