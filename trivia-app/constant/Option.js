
export const imageAssets = {
  "/food-drinks.png": require("./../assets/images/categories/food-drinks.png"),
  "/geography.png": require("./../assets/images/categories/geography.png"),
  "/history-culture.png": require("./../assets/images/categories/history-culture.png"),
  "/movies-TV-shows.png": require("./../assets/images/categories/movies-TV-shows.png"),
  "/music-songs.png": require("./../assets/images/categories/music-songs.png"),
  "/science-nature.png": require("./../assets/images/categories/science-nature.png"),
  "/sports-athletes.png": require("./../assets/images/categories/sports-athletes.png"),
  "/technology-internet.png": require("./../assets/images/categories/technology-internet.png"),
  "/random1.png": require("./../assets/images/categories/random1.png"),
  "/random2.png": require("./../assets/images/categories/random2.png"),
  "/random3.png": require("./../assets/images/categories/random3.png"),
  "/random4.png": require("./../assets/images/categories/random4.png"),
};

export const CourseCategory = [
  "Tech & Coding",
  "Business & Finance",
  "Health & Fitness",
  "Science & Engineering",
  "Arts & Creativity",
];

export const ProfileMenu = [
  {
    name: "Add Quiz",
    icon: "add-outline", //Ionic Icons
    path: "/addquiz",
  },
  {
    name: "My Quiz",
    icon: "book", //Ionic Icons
    path: "/(tabs)/quiz",
  },
  {
    name: "Quiz History",
    icon: "analytics-outline", //Ionic Icons
    path: "/quizhistory",
  },
  // {
  //   name: "My Subscription",
  //   icon: "shield-checkmark", //Ionic Icons
  //   path: "/subscription",
  // },
  {
    name: "Leaderboard",
    icon: "bar-chart-outline", //Ionic Icons
    path: "/leaderboard",
  },
  {
    name: "Privacy Policy",
    icon: "list", //Ionic Icons
    path: "/privacypolicy",
  },

  {
    name: "Delete Account",
    icon: "warning", //Ionic Icons
    path: "/deleteaccount",
  },
  {
    name: "Logout",
    icon: "log-out", //Ionic Icons
    path: "/login",
  },
];
