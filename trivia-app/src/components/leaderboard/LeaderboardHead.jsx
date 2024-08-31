const LeaderboardHead = ({ leaderboard }) => {
  const sortedLeaderboard = [...leaderboard].sort(
    (a, b) => b.total_score - a.total_score
  );
  //filter array based on total score in an array
  const topUsers = sortedLeaderboard.slice(0, 3);
  console.log("top user: ", sortedLeaderboard, leaderboard.length, leaderboard);

  return (
    <div className="max-w-md container mx-auto p-4 rounded-lg shadow-md flex flex-col items-center bg-gray-100">
    <h2 className="text-lg font-semibold mb-6">Top Users</h2>
    
    <div className="flex justify-between items-end w-full">
      {/* Second place */}
      {topUsers[1] && (
        <div className="flex flex-col items-center w-1/3">
          <img
            className="rounded-full h-24 w-24"
            src={topUsers[1].image_url}
            alt={topUsers[1].name}
          />
          <h1 className="text-sm text-center">{topUsers[1].name}</h1>
          <h2 className="text-sm text-center">Total score: {topUsers[1].total_score}</h2>
          <h2 className="text-sm text-center">Streak: {topUsers[1].streak}</h2>
        </div>
      )}

      {/* First place */}
      {topUsers[0] && (
        <div className="flex flex-col items-center w-1/3">
          <img
            className="rounded-full h-36 w-36"
            src={topUsers[0].image_url}
            alt={topUsers[0].name}
          />
          <h1 className="text-sm text-center">{topUsers[0].name}</h1>
          <h2 className="text-sm text-center">Total score: {topUsers[0].total_score}</h2>
          <h2 className="text-sm text-center">Streak: {topUsers[0].streak}</h2>
        </div>
      )}

      {/* Third place */}
      {topUsers[2] && (
        <div className="flex flex-col items-center w-1/3">
          <img
            className="rounded-full h-24 w-24"
            src={topUsers[2].image_url}
            alt={topUsers[2].name}
          />
          <h1 className="text-sm text-center">{topUsers[2].name}</h1>
          <h2 className="text-sm text-center">Total score: {topUsers[2].total_score}</h2>
          <h2 className="text-sm text-center">Streak: {topUsers[2].streak}</h2>
        </div>
      )}
    </div>
  </div>

  );
};

export default LeaderboardHead;
