import React from "react";

const Setting = () => {
  return (
    <div className="mx-auto p-4 rounded-lg shadow-md text-white w-full overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-12">Settings</h1>
      <div className="flex flex-col gap-4 w-2/3 mx-auto">
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Language</h2>
          <p>English</p>
        </div>
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Sound</h2>
          <p>On</p>
        </div>
        <div className="flex justify-between">
          <h2 className="font-semibold text-xl">Vibration</h2>
          <p>On</p>
        </div>
      </div>
    </div>
  );
};

export default Setting;
