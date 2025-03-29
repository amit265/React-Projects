import {
  adConfigContext,
  stopAppOpenAdContext,
  userDetailsContext,
} from "@/context/userDetailsContext";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppState, View } from "react-native";
import {
  InterstitialAd,
  AppOpenAd,
  BannerAd,
  BannerAdSize,
  AdEventType,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
} from "react-native-google-mobile-ads";

// ✅ Helper to get ad unit IDs based on test mode
const getAdUnitId = (type, testAds) => {
  const adUnitIds = {
    banner: testAds
      ? TestIds.ADAPTIVE_BANNER
      : "ca-app-pub-7433519007687449/6146757904",
    interstitial: testAds
      ? TestIds.INTERSTITIAL
      : "ca-app-pub-7433519007687449/3520594567",
    appOpen: testAds
      ? TestIds.APP_OPEN
      : "ca-app-pub-7433519007687449/2207512892",
    rewarded: testAds
      ? TestIds.REWARDED
      : "ca-app-pub-7433519007687449/1062317143",
  };
  return adUnitIds[type];
};

// ✅ Ad references
let interstitialAd;
let appOpenAd;
let rewardedAd;

const AdManager = () => {
  const { adConfig, setAdConfig } = useContext(adConfigContext);
  const { userDetails } = useContext(userDetailsContext);
  const { stopAppOpenAd } = useContext(stopAppOpenAdContext);
  const { isAdAvailable, setIsAdAvailable } = useContext(stopAppOpenAdContext);
  const isPremium = userDetails?.member ?? false;
  let interstitialJustShown = false;
  const appPauseCount = useRef(0); // ✅ Track app pause count
  const stopAppOpenAds = useRef(false); // ✅ Flag to stop ads if needed

  // ✅ Handle app state changes for open app ads
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        nextAppState === "active" &&
        !interstitialJustShown &&
        !stopAppOpenAd &&
        !stopAppOpenAds.current
      ) {
        // ✅ Increment pause count
        appPauseCount.current += 1;

        console.log(`App Resume Count: ${appPauseCount.current}`);

        // ✅ Show AppOpenAd every second pause
        if (
          appPauseCount.current % adConfig?.interstitialFrequency === 0 && // Show ad every second pause
          adConfig.showOpenAppAds &&
          appOpenAd?.loaded
        ) {
          console.log("Showing App Open Ad");
          appOpenAd.show();
        }
      }

      // ✅ Ensure interstitial doesn't interfere with counting
      interstitialJustShown = false;
    });

    return () => subscription.remove();
  }, [adConfig, stopAppOpenAd, isPremium]);

  // ✅ Function to stop App Open Ads
  const stopAppOpenAdCompletely = () => {
    console.log("Stopping App Open Ads");
    stopAppOpenAds.current = true;
  };

  // ✅ Function to resume showing App Open Ads
  const resumeAppOpenAd = () => {
    console.log("Resuming App Open Ads");
    stopAppOpenAds.current = false;
  };

  // ✅ Load ads when config changes
  useEffect(() => {
    if (!isPremium) {
      loadAds(adConfig);
    }
  }, [adConfig]);

  // ✅ Load Ads
  let isRewardedAdLoading = false;
  const loadAds = (config) => {
    if (isPremium || isRewardedAdLoading) return;

    console.log("Loading Ads with config:", config);

    isRewardedAdLoading = true;
    setTimeout(() => (isRewardedAdLoading = false), 5000);

    // ✅ Create ads with updated ad unit IDs
    interstitialAd = InterstitialAd.createForAdRequest(
      getAdUnitId("interstitial", config.testAds)
    );
    appOpenAd = AppOpenAd.createForAdRequest(
      getAdUnitId("appOpen", config.testAds)
    );
    rewardedAd = RewardedAd.createForAdRequest(
      getAdUnitId("rewarded", config.testAds)
    );

    // ✅ Interstitial Ad
    interstitialAd.addAdEventListener(AdEventType.LOADED, () =>
      console.log("Interstitial Ad Loaded!")
    );
    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      interstitialJustShown = true;
      interstitialAd.load();
    });

    interstitialAd.load();

    // ✅ App Open Ad
    appOpenAd.addAdEventListener(AdEventType.LOADED, () =>
      console.log("App Open Ad Loaded!")
    );
    appOpenAd.addAdEventListener(AdEventType.CLOSED, () =>
      setTimeout(() => appOpenAd.load(), 3000)
    );

    appOpenAd.load();

    // ✅ Listen for Rewarded Ad Loaded

    rewardedAd.removeAllListeners();

    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      const debounceTimeout = setTimeout(() => {
        console.log("Rewarded Ad Loaded!");
        setIsAdAvailable(true);
      }, 500);
      if (debounceTimeout) clearTimeout(debounceTimeout);

    });

    // ✅ Listen for Rewarded Ad Earned Reward
    rewardedAd.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("User earned reward:", reward);
      }
    );

    // ✅ Use AdEventType.CLOSED Instead of RewardedAdEventType.CLOSED
    rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      console.log("Rewarded Ad Closed. Reloading...");
      if (!rewardedAd?.loaded) rewardedAd.load();
    });

    // ✅ Use AdEventType.ERROR Instead of RewardedAdEventType.ERROR
    rewardedAd.addAdEventListener(AdEventType.ERROR, (error) => {
      console.log("❌ Rewarded Ad Error:", error.code, error.message);
    });

    setTimeout(() => {
      if (!rewardedAd?.loaded) rewardedAd.load();
    }, 5000); // Load after 5 seconds
  };

  return null;
};

// ✅ Functions to Show Ads
export const showInterstitialAd = (adConfig) => {
  if (interstitialAd?.loaded && adConfig.showInterstitialAds) {
    interstitialAd.show();
    interstitialAd.load();
  } else {
    console.log("Interstitial Ad not ready");
    interstitialAd.load();
  }
};

export const showAppOpenAd = (isPremium, adConfig) => {
  if (isPremium || !adConfig.showOpenAppAds) return;
  if (appOpenAd?.loaded) {
    appOpenAd.show();
    appOpenAd.load();
  } else {
    console.log("App Open Ad not ready");
    appOpenAd.load();
  }
};

export const showRewardedAd = (adConfig) => {
  if (!adConfig.showRewardedAds) return Promise.reject("Rewarded Ads disabled");
  return new Promise((resolve, reject) => {
    if (rewardedAd?.loaded) {
      rewardedAd.show();
      resolve(true);
    } else {
      console.log("Rewarded Ad not ready");
      rewardedAd.load();
      reject("Rewarded Ad not loaded");
    }
  });
};

// ✅ Banner Ad Component
export const BannerAdComponent = () => {
  const { adConfig } = useContext(adConfigContext);
  const { userDetails } = useContext(userDetailsContext);

  const isPremium = userDetails?.member ?? false;
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  if (isPremium || !adConfig.showBannerAds) return null;

  return (
    <View
      style={{
        opacity: isAdLoaded ? 1 : 0,
        height: isAdLoaded ? undefined : 0,
      }}
    >
      <BannerAd
        unitId={getAdUnitId("banner", adConfig.testAds)}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        onAdLoaded={() => setIsAdLoaded(true)}
        onAdFailedToLoad={(error) => console.error("Banner Ad Error:", error)}
      />
    </View>
  );
};

export default AdManager;
