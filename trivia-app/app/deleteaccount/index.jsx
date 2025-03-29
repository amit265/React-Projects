import React, { useContext } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
import Colors from "../../constant/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { BannerAdComponent } from "../../components/Shared/AdManager";
import { userDetailsContext } from "../../context/userDetailsContext";
export default function DeleteAccount() {
  const router = useRouter();
  const { userDetails } = useContext(userDetailsContext);
  const isPremium = userDetails?.member;

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <View style={styles.backButton}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
      </View>
      {/* Header */}
      <Text style={styles.header}>Delete Account</Text>

      <ScrollView style={{ paddingBottom: 20 }}>
        {/* Why You Shouldn't Delete */}
        <View style={styles.section}>
          <Text style={styles.title}>Think Before You Delete</Text>
          <Text style={styles.content}>
            Deleting your account is permanent. Here’s what you’ll lose:
          </Text>
          <Text style={styles.listItem}>
            🚀 Personalized quiz recommendations
          </Text>
          <Text style={styles.listItem}>
            🎯 Your quiz history & performance insights
          </Text>
          <Text style={styles.listItem}>
            📚 Saved quizzes & learning progress
          </Text>
          <Text style={styles.listItem}>
            🏆 Leaderboard rankings & daily challenges
          </Text>
          <Text style={styles.listItem}>
            🔒 Account security & access to premium features
          </Text>
          <Text style={styles.content}>
            If you just need a break, consider logging out instead.
          </Text>
        </View>

        {/* How to Delete */}
        <View style={styles.section}>
          <Text style={styles.title}>How to Delete Your Account?</Text>

          <Text style={styles.content}>
            If you're sure about deleting, please contact our support team.
          </Text>
        </View>

        {/* Contact Support */}
        <View style={styles.section}>
          <Text style={styles.title}>Contact Support</Text>
          <Text style={styles.content}>
            📧 Email: mindcraftlearning97@gmail.com
          </Text>
        </View>

     
      </ScrollView>
      {/* Admob Banner */}
      <View
        style={{ alignItems: "center", backgroundColor: Colors.BACKGROUND }}
      >
        {!isPremium && <BannerAdComponent />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 25,
    backgroundColor: Colors.BACKGROUND,
  },
  backButton: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    top: 30,
    left: 10,
  },
  header: {
    fontSize: 28,
    textAlign: "left",
    left: 30,
    marginBottom: 20,
    color: Colors.WHITE,
    fontFamily: "Poppins-Bold",
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    color: Colors.WHITE,
    fontFamily: "Poppins-Regular",
  },
  content: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 5,
    fontFamily: "Poppins-Regular",
  },
  listItem: {
    fontSize: 14,
    color: Colors.GRAY,
    marginTop: 3,
    fontFamily: "Poppins-Regular",
    paddingLeft: 10,
  },
});
