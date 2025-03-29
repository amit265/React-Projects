import { Stack } from "expo-router";
import { useState, useMemo, useEffect } from "react";
import {
  userDetailsContext,
  userQuizDataContext,
  quizAttemptsContext,
  dbUpdateContext,
  quizCountContext,
  userCreatedQuizContext,
  leaderBoardDataContext,
  stopAppOpenAdContext,
  showConfettiContext,
  adConfigContext
} from "../context/userDetailsContext";
import * as Network from 'expo-network';
import AdManager from "../components/Shared/AdManager";
import { useFonts } from "expo-font";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import mobileAds, { AppOpenAd } from 'react-native-google-mobile-ads';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from "../components/ErrorFallback";
export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
  });
  const [adConfig, setAdConfig] = useState({
    showAds: true,
    showInterstitial: true,
    showAppOpenAd: true,
    showRewardedAd: true,
    showBannerAd: true,
    testAds: true,
    interstitialFrequency: 2,
    appOpenAdFrequency: 2
  });
  const [userDetails, setUserDetails] = useState({});
  const [userQuizList, setUserQuizList] = useState([]);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [dbUpdate, setUpdate] = useState(false);
  const [quizCount, setQuizCount] = useState(0);
  const [userCreatedQuiz, setUserCreatedQuiz] = useState([]);
  const [leaderBoardData, setLeaderBoardData] = useState([]);
  const [userRank, setUserRank] = useState({});
  const [stopAppOpenAd, setStopAppOpenAd] = useState(false);
  const [isAdAvailable, setIsAdAvailable] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const userDetailsValue = useMemo(() => ({ userDetails, setUserDetails }), [userDetails]);
  const userQuizDataValue = useMemo(() => ({ userQuizList, setUserQuizList }), [userQuizList]);
  const quizAttemptsValue = useMemo(() => ({ quizAttempts, setQuizAttempts }), [quizAttempts]);
  const dbUpdateValue = useMemo(() => ({ dbUpdate, setUpdate }), [dbUpdate]);
  const quizCountValue = useMemo(() => ({ quizCount, setQuizCount }), [quizCount]);
  const userCreatedQuizValue = useMemo(() => ({ userCreatedQuiz, setUserCreatedQuiz }), [userCreatedQuiz]);
  const leaderBoardDataValue = useMemo(
    () => ({ leaderBoardData, setLeaderBoardData, userRank, setUserRank }),
    [leaderBoardData, userRank]
  );
  const stopAppOpenAdValue = useMemo(
    () => ({ stopAppOpenAd, setStopAppOpenAd, isAdAvailable, setIsAdAvailable }),
    [stopAppOpenAd, isAdAvailable]
  );
  const showConfettiValue = useMemo(() => ({ showConfetti, setShowConfetti }), [showConfetti]);
  const adConfigValue = useMemo(() => ({ adConfig, setAdConfig }), [adConfig])

  const checkConnection = async () => {
    try {
      const { isConnected } = await Network.getNetworkStateAsync();
      setIsConnected(isConnected);
    } catch (error) {
      console.error('Error checking network status:', error);
    }
  };


  useEffect(() => {

    checkConnection();
    const subscription = Network.addNetworkStateListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => subscription && subscription.remove();

  }, []);



  // ✅ Use useEffect for side effects (initialize mobile ads)
  useEffect(() => {
    mobileAds()
      .initialize()
      .then(adapterStatuses => {
        console.log('Mobile Ads Initialized');
      })
      .catch(error => {
        console.error("Mobile Ads Init Error:", error);
      });



  }, [checkConnection]); // Only runs once




  if (!isConnected) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffcccc' }}>
        <Text style={{ color: '#ff0000', fontSize: 18, fontWeight: 'bold' }}>No Internet Connection 😢</Text>
      </View>
    );
  }



  if (!fontsLoaded) {
    return null; // Or a loading spinner
  }

  return (

    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error, info) => {
        console.log('Global Error:', error);
        console.log('Component Stack:', info.componentStack);
        // Log the error to an external service like Sentry or Firebase
      }}
    >
      <SafeAreaProvider>

        <userDetailsContext.Provider value={userDetailsValue}>
          <userQuizDataContext.Provider value={userQuizDataValue}>
            <quizAttemptsContext.Provider value={quizAttemptsValue}>
              <dbUpdateContext.Provider value={dbUpdateValue}>
                <quizCountContext.Provider value={quizCountValue}>
                  <stopAppOpenAdContext.Provider value={stopAppOpenAdValue}>
                    <leaderBoardDataContext.Provider value={leaderBoardDataValue}>
                      <userCreatedQuizContext.Provider value={userCreatedQuizValue}>
                        <showConfettiContext.Provider value={showConfettiValue}>
                          <adConfigContext.Provider value={adConfigValue}>
                            <AdManager />
                            <StatusBar backgroundColor="#132F94" barStyle="light-content" hidden={false} />
                            <Stack screenOptions={{ headerShown: false }} />
                          </adConfigContext.Provider>
                        </showConfettiContext.Provider>
                      </userCreatedQuizContext.Provider>
                    </leaderBoardDataContext.Provider>
                  </stopAppOpenAdContext.Provider>
                </quizCountContext.Provider>
              </dbUpdateContext.Provider>
            </quizAttemptsContext.Provider>
          </userQuizDataContext.Provider>
        </userDetailsContext.Provider>
      </SafeAreaProvider>
    </ErrorBoundary>

  );
}

