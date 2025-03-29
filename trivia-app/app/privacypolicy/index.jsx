import React from "react";
import { ScrollView, Text, View, StyleSheet } from "react-native";
import Colors from "../../constant/Colors";

const LegalScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.text}>
          Last Updated: March 2025
        </Text>

        <Text style={styles.subHeader}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to Trivia Quest AI, operated by MindcraftLearning. We are
          committed to protecting your privacy and ensuring your data is handled
          securely.
        </Text>

        <Text style={styles.subHeader}>2. Information We Collect</Text>
        <Text style={styles.text}>
          We collect public profile information through Google Sign-In, including
          your name and email.
        </Text>

        <Text style={styles.subHeader}>3. How We Use Your Data</Text>
        <Text style={styles.text}>
          - To provide quiz features and leaderboard comparisons.
          {"\n"}- To improve user experience using Google Analytics.
          {"\n"}- To show ads via Google AdMob.
        </Text>

        <Text style={styles.subHeader}>4. Third-Party Services</Text>
        <Text style={styles.text}>
          We use Firebase, Google Sign-In, Google Analytics, and AdMob, which process
          data under their own policies.
        </Text>

        <Text style={styles.subHeader}>5. Data Deletion</Text>
        <Text style={styles.text}>
          You can request data deletion by contacting us at
          mindcraftlearning97@gmail.com.
        </Text>

        <Text style={styles.subHeader}>6. Children's Privacy</Text>
        <Text style={styles.text}>
          Our app is not intended for users under the age of 13.
        </Text>

        <Text style={styles.subHeader}>7. Changes to Policy</Text>
        <Text style={styles.text}>
          We may update this Privacy Policy, and changes will be posted within the
          app.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.header}>Terms & Conditions</Text>

        <Text style={styles.subHeader}>1. Introduction</Text>
        <Text style={styles.text}>
          By using Trivia Quest AI, you agree to follow these terms.
        </Text>

        <Text style={styles.subHeader}>2. User Accounts</Text>
        <Text style={styles.text}>
          Users must create an account to access full features. Limited access is
          available without an account.
        </Text>

        <Text style={styles.subHeader}>3. User Responsibilities</Text>
        <Text style={styles.text}>
          - Users must not attempt to hack, abuse, or disrupt the app.
          {"\n"}- Cheating or using bots is strictly prohibited.
          {"\n"}- Users must not attempt to manipulate leaderboards.
        </Text>

        <Text style={styles.subHeader}>4. Subscriptions</Text>
        <Text style={styles.text}>
          We may introduce monthly or yearly subscriptions. Currently, the app is
          free.
        </Text>

        <Text style={styles.subHeader}>5. Account Suspension</Text>
        <Text style={styles.text}>
          We reserve the right to suspend or terminate accounts for:
          {"\n"}- Violation of terms or abuse.
          {"\n"}- Attempting to manipulate quiz results or leaderboards.
          {"\n"}- Engaging in illegal or harmful activities.
        </Text>

        <Text style={styles.subHeader}>6. Disclaimer</Text>
        <Text style={styles.text}>
          We do not guarantee uninterrupted service and are not responsible for
          technical issues or third-party service failures.
        </Text>

        <Text style={styles.subHeader}>7. Governing Law</Text>
        <Text style={styles.text}>
          These terms are governed by the laws of Indonesia.
        </Text>

        <Text style={styles.subHeader}>8. Contact Information</Text>
        <Text style={styles.text}>
          If you have any questions, please contact us at
          mindcraftlearning97@gmail.com.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
    color: "#ddd",
  },
  text: {
    fontSize: 16,
    color: "#999",
    lineHeight: 22,
  },
});

export default LegalScreen;
