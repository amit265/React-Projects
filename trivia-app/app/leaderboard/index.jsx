import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useContext,  } from "react";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import Colors from "../../constant/Colors";
import {
  dbUpdateContext,
  leaderBoardDataContext,
  userDetailsContext,
} from "../../context/userDetailsContext";
import { BannerAdComponent } from "../../components/Shared/AdManager";

export default function LeaderBoardScreen() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { userDetails } = useContext(userDetailsContext); // ✅ Get user details from context
  const { dbUpdate } = useContext(dbUpdateContext);
  const isGuest = userDetails?.email === "aammiitt265@gmail.com";
  const isPremium = userDetails?.member;
  const {leaderBoardData, userRank,} = useContext(leaderBoardDataContext)

  const leaderboard = leaderBoardData; // No need for useMemo
  

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
        <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
      </View>

      {/* Leaderboard List */}
      {loading ? (
        <ActivityIndicator
          size={"large"}
          color={Colors.WHITE}
          style={{ padding: 26 }}
        />
      ) : (
        <FlatList
          data={leaderboard}
          keyExtractor={(item) => item.email}
          contentContainerStyle={styles.listContainer}
          removeClippedSubviews={true} // ✅ Improves performance
          initialNumToRender={10} // ✅ Render only first 5 items initially
          maxToRenderPerBatch={10} // ✅ Limits the number of items rendered at once
          updateCellsBatchingPeriod={50} // ✅ Smooth scrolling performance
          windowSize={10} // ✅ Limits the number of offscreen items preserved
          renderItem={({ item }) => (
            <View>
              <View style={[styles.card, item.rank === 1 && styles.firstPlace]}>
                <Text style={styles.rank}>#{item.rank}</Text>
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.detail}>
                    Quizzes Taken: {item.totalQuiz}
                  </Text>
                </View>
                <Text style={styles.totalScore}>{item.totalScore}</Text>
              </View>
            </View>
          )}
        />
      )}

      {/* Logged-in User's Rank (Always at Bottom) */}
      {userRank && !loading && (
        <View style={[styles.card, styles.currentUserCard]}>
          <Text style={styles.rank}>#{userRank.rank}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.name}>{userRank.name} (You)</Text>
            <Text style={styles.detail}>
              Quizzes Taken: {userRank.totalQuiz}
            </Text>
          </View>
          <Text style={styles.totalScore}>{userRank.totalScore}</Text>
        </View>
      )}
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
    backgroundColor: Colors.BACKGROUND,
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: 400,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
  },
  backButton: {
    position: "absolute",
    left: 10,
    top: 15,
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    color: Colors.WHITE,
    marginLeft: 40,
  },
  listContainer: {
    paddingHorizontal: 15,
  },
  card: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  firstPlace: {
    backgroundColor: "#FFD700",
  },
  currentUserCard: {
    backgroundColor: "#E0F7FA",
    borderWidth: 1,
    borderColor: "#00ACC1",
  },
  rank: {
    fontSize: 18,
    fontFamily: "Poppins-Bold",
    color: "#444",
    width: 40,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: "#222",
  },
  detail: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: "#666",
  },
  totalScore: {
    fontSize: 16,
    fontFamily: "Poppins-Bold",
    color: Colors.PRIMARY,
    textAlign: "right",
    minWidth: 60,
  },
});
