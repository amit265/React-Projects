const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start px-24 text-white bg-gradient-to-r from-black to-transparent">
      <div className="max-w-xl">
        <h1 className="text-6xl font-bold">{title}</h1>
        <p className="py-6 text-lg">{overview}</p>
        <div>
          <button className="bg-white text-black py-2 px-6 text-xl rounded-lg hover:opacity-85">Play</button>
          <button className="mx-2 bg-gray-400 py-2 px-6 text-xl rounded-lg text-white hover:opacity-85">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
