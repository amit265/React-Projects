const Shimmer = () => {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 mt-4 left-60">
      {Array.from({ length: 1 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse bg-gray-300 h-80 w-80"
        ></div>
      ))}
    </div>
  );
};

export default Shimmer;
