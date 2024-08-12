import Shimmer from "./Shimmer";
const PhotoGrid = ({ photos, loading, error }) => {
  console.log(photos);
  console.log("error", error);
  if (error) <h1> Error fetching date: {error} </h1>;
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-4">
      {loading || photos.length === 0 ? (
        <div>
          {photos.length === 0 ? (
            <h1 className="text-red-700 font-semibold text-base sm:text-xl ">
              Photos can not be fetched since Rate Limit is Exceeded
            </h1>
          ) : (
            <Shimmer />
          )}
        </div>
      ) : (
        photos.map((photo, index) => (
          <div key={index} className="w-[100%] pb-[100%] relative">
            <img
              src={photo.urls.small}
              alt={photo.alt_description}
              className="absolute top-0 left-0 w-[100%] h-[100%] object-cover rounded-lg hover:scale-105 cursor-pointer"
            />
          </div>
        ))
      )}
    </div>
  );
};

export default PhotoGrid;
