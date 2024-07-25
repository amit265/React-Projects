const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen px-24 aspect-video pt-[30%] scroll-px-12 absolute text-white bg-gradient-to-r to-black">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="py-6 text-s w-1/4">{overview}</p>
      <div>
        <button className="bg-white text-black p-4 px-16 text-xl rounded-lg hover:opacity-85">Play</button>
        <button className="mx-2 bg-gray-400 p-4 px-12 text-xl rounded-lg text-white ">moreInfo</button>
      </div>
    </div>
  );
};

export default VideoTitle;
