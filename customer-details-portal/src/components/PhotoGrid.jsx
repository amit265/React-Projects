import Shimmer from "./Shimmer";

function PhotoGrid({ photos, loading }) {
  console.log("photos", photos);
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 mt-4">
      {loading
        ? Array.from({ length: 9 }).map((_, index) => <Shimmer key={index} />)
        : photos.map((photo, index) => (
            <div key={index} className="w-[100%] pb-[100%] relative">
              <img
                src={photo.urls.small}
                alt={`Customer image ${index + 1}`}
                className="absolute top-0 left-0 w-[100%] h-[100%] object-cover rounded-lg hover:scale-105 cursor-pointer"
              />
            </div>
          ))}
    </div>
  );
}

export default PhotoGrid;
