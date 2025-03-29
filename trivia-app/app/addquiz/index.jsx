import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ScrollView,
  Alert,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Colors from "../../constant/Colors";
import Button from "../../components/Shared/Button";
import {
  generateQuizAiModel,
  generateTopicsAiModel,
} from "../../config/aiModel";

import Prompt from "../../constant/Prompt";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebaseConfig";
import {
  userDetailsContext,
  dbUpdateContext,
  userCreatedQuizContext,
  stopAppOpenAdContext,
  adConfigContext,
} from "../../context/userDetailsContext";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  showInterstitialAd,
  showRewardedAd,
} from "../../components/Shared/AdManager";
import UpgradeAlert from "../../components/Home/UpgradeAlert";

export default function AddCourse() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState();
  const [topics, setTopics] = useState();
  const [selectedTopic, setSelectedTopic] = useState([]);
  const { userDetails } = useContext(userDetailsContext);
  const { setUpdate } = useContext(dbUpdateContext);
  const isPremium = userDetails?.member;
  const { userCreatedQuiz } = useContext(userCreatedQuizContext);
  const [adWatched, setAdWatched] = useState(false); // Track ad watch status
  const { isAdAvailable, setIsAdAvailable, setStopAppOpenAd } =
    useContext(stopAppOpenAdContext);
    const {adConfig} = useContext(adConfigContext);
  const [isUpgradeVisible, setUpgradeVisible] = useState(false);

  console.log("isadaviailbe from add quiz", isAdAvailable);


  useEffect(() => {
    console.log("isAdAvailable updated from add quiz:", isAdAvailable);
  }, [isAdAvailable]);
  useEffect(() => {
    if(adWatched) {
      onGenerateTopic();
    }
  }, [adWatched])


  // const handleUpgradeAlert = () => {
  //   return new Promise((resolve) => {
  //     Alert.alert(
  //       "Upgrade to Premium!",
  //       "You've reached the limit for creating quizzes. Unlock unlimited access and take your learning to the next level with a Premium membership!\n\n" +
  //         "You can also watch an ad to continue creating more quizzes.",
  //       [
  //         {
  //           text: "Upgrade Now",
  //           onPress: () => {
  //             router.replace("/subscription");
  //             resolve(false); // ❌ Stop execution
  //           },
  //         },
  //         {
  //           text: "Watch AD",
  //           onPress: async () => {
  //             if (!isAdAvailable) {
  //               Alert.alert("Ad Not Available", "Please try again later.");
  //               resolve(false); // ❌ Stop execution
  //               return;
  //             }
  //             const adResult = await handleWatchAd();
  //             resolve(adResult); // ✅ Continue if ad was watched
  //             console.log("adresult form handlewatched ", adResult);

  //             console.log("reslve", resolve(adResult));
  //           },
  //         },
  //         {
  //           text: "Maybe Later",
  //           style: "cancel",
  //           onPress: () => resolve(false), // ❌ Stop execution
  //         },
  //       ]
  //     );
  //   });
  // };

  const handleUpgradeAlert = async () => {
    setUpgradeVisible(true);
  };

  const handleUpgrade = () => {
    router.replace("/subscription");
    setUpgradeVisible(false);
  };

  const handleWatchAd = async () => {
    if (!isAdAvailable) {
      Alert.alert("Ad Not Available", "Please try again later.");
      setUpgradeVisible(false);

      return;
    }
    const rewardEarned = await handleWatchAds(); // Show ad directly here
    if (rewardEarned) {
      console.log("User earned the reward!");
      setAdWatched(true);
    }
    setUpgradeVisible(false);
  };

  const handleClose = () => {
    setUpgradeVisible(false);
  };

  const handleWatchAds = async () => {
    try {
      const rewardEarned = await showRewardedAd({
        isAdAvailable,
        setIsAdAvailable,
        adConfig
      });

      console.log("rewardEarned", rewardEarned);

      if (rewardEarned) {
        setStopAppOpenAd(true);

        console.log("User earned the reward!");
        // ✅ Grant reward here (e.g., allow more quizzes)
        setAdWatched(true); // Allow quiz creation
        return true;
      } else {
        setStopAppOpenAd(true);

        console.log("User closed the ad without earning the reward.");
        setAdWatched(false); // Deny quiz creation
        setIsAdAvailable(false);
        return false;
      }
    } catch (error) {
      setStopAppOpenAd(true);

      console.error("Error showing ad:", error);
      setAdWatched(false); // Deny quiz creation
      setIsAdAvailable(false);
      return false;
    }
  };

  const onGenerateTopic = async () => {
    if (!userInput) {
      return;
    }
    try {
      if (!isPremium && !adWatched) {
        const shouldContinue = await handleUpgradeAlert(); // 🔹 Wait for user choice
        if (!shouldContinue) return; // ❌ Stop execution if user cancels or upgrades
      }

      setLoading(true);

      const PROMPT = userInput + Prompt.IDEA;
      const aiResponse = await generateTopicsAiModel.sendMessage(PROMPT);

      if (aiResponse.response && aiResponse.response.candidates) {
        const topicIdeaText =
          aiResponse?.response?.candidates[0]?.content?.parts[0]?.text;

        let topicIdea = [];
        try {
          topicIdea = JSON.parse(topicIdeaText);
          if (!Array.isArray(topicIdea)) {
            topicIdea = [topicIdea]; // Ensure it's an array
          }
        } catch (error) {
          console.error("Error parsing AI response:", error);
          topicIdea = []; // Fallback to an empty array
        }

        setTopics(topicIdea);
        setAdWatched(false); // ✅ Reset ad status after quiz generation
      } else {
        console.error("Unexpected AI response format:", aiResponse);
      }
    } catch (error) {
      console.error("Error generating topic:", error);
    } finally {
      setLoading(false);
      setStopAppOpenAd(false);
    }
  };

  const onTopicSelect = (topic) => {
    const isAlreadyExist = selectedTopic.find((item) => item === topic);
    if (!isAlreadyExist) {
      setSelectedTopic((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopic.filter((item) => item !== topic);
      setSelectedTopic(topics);
    }
  };

  const isTopicSelected = (topic) => {
    const selection = selectedTopic.find((item) => item === topic);
    return selection ? true : false;
  };

  const onGenerateQuiz = async () => {
    if (!selectedTopic.length) {
      console.error("No topics selected. Please select a topic.");
      return;
    }

    if (!isPremium) {
      showInterstitialAd(adConfig);
    }

    setLoading(true);
    try {
      const PROMPT = selectedTopic.join(", ") + Prompt.QUIZ;
      // console.log("PROMPT", PROMPT);

      const aiResponse = await generateQuizAiModel.sendMessage(PROMPT);
      const textResponse =
        aiResponse?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!textResponse) {
        throw new Error("AI response is empty or invalid.");
      }

      let quizList;
      try {
        quizList = JSON.parse(textResponse);
        if (!quizList?.quizzes || !Array.isArray(quizList.quizzes)) {
          throw new Error(
            "Parsed response does not contain a valid quizzes array."
          );
        }
      } catch (error) {
        console.error("Error parsing AI response:", error);
        return;
      }

      console.log("Parsed Quiz List:", quizList?.quizzes?.length);

      for (const quiz of quizList?.quizzes) {
        const docId = Date.now().toString();
        await setDoc(doc(db, "Quizzes", docId), {
          ...quiz,
          createdOn: new Date(),
          createdBy: userDetails?.email,
          docId: docId,
        });
      }

      setUpdate((prev) => !prev);
      router.push("/(tabs)/quiz");
    } catch (error) {
      console.error("Error generating quiz:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ padding: 20, backgroundColor: Colors.WHITE, flex: 1 }}>
      <Text
        style={{ fontFamily: "Poppins-Bold", fontSize: 30, marginLeft: 40 }}
      >
        Create New Quiz
      </Text>

      <View
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          top: 8,
          gap: 10,
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="black" />
        </Pressable>
      </View>

      <Text
        style={{
          fontFamily: "Poppins-Regular",
          fontSize: 20,
          marginTop: 8,
          color: Colors.GRAY,
        }}
      >
        What topic you want quiz on (ex. General Knowledge, History, Python,
        Digital Marketing, etc...)
      </Text>
      <TextInput
        style={styles.textInput}
        multiline={true}
        numberOfLines={2}
        onChangeText={(value) => setUserInput(value)}
        placeholder="(ex. History, sports, fashion, etc...)"
      />
      <Button
        text={"Generate Topic"}
        type="outline"
        onPress={() => onGenerateTopic()}
        loading={loading}
      />
      {topics && (
        <View style={{ marginTop: 15, marginBottom: 15 }}>
          <Text style={{ fontFamily: "Poppins-Regular", fontSize: 20 }}>
            Select the topic that you want quiz on
          </Text>
        </View>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 10,
        }}
      >
        {topics &&
          topics?.map((item, index) => (
            <Pressable key={index} onPress={() => onTopicSelect(item)}>
              <Text
                style={{
                  padding: 7,
                  borderWidth: 0.4,
                  borderRadius: 99,
                  paddingHorizontal: 15,
                  backgroundColor: isTopicSelected(item)
                    ? Colors.PRIMARY
                    : null,
                  color: isTopicSelected(item) ? Colors.WHITE : Colors.PRIMARY,
                }}
              >
                {item}
              </Text>
            </Pressable>
          ))}
      </View>
      {selectedTopic?.length > 0 && (
        <Button
          text="Generate Quiz"
          onPress={() => onGenerateQuiz()}
          loading={loading}
        />
      )}
       {isUpgradeVisible && (
        <UpgradeAlert
          isVisible={isUpgradeVisible}
          onUpgrade={handleUpgrade}
          onWatchAd={handleWatchAd}
          onClose={handleClose}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 15,
  },
});
