import React from "react";
import PhotoGrid from "./PhotoGrid";
import useFetchData from "../hooks/useFetchData";
import { UNSPLASH_API, UNSPLASH_API_ACCESS_KEY } from "../utils/constants";

const CustomerDetails = ({ customer }) => {
  const photos = useFetchData(UNSPLASH_API + UNSPLASH_API_ACCESS_KEY, 10000);

  const loading = photos.length === 0;


  if (!customer) {
    return (
      <div className="font-semibold text-center p-4 text-xl">
        Select a customer on the left to view their details here.
      </div>
    );
  }

  console.log("customer", customer);
  return (
  
      <div className="overflow-y-auto h-screen bg-gray-200 p-4">
        <h1 className="font-semibold text-xl py-4">
          Customer {customer.id} details
        </h1>
        <h2 className="font-bold text-xl">
          Name : {customer.first + " " + customer.last}
        </h2>
        <p className="text-lg text-gray-800">Email : {customer.email}</p>
        <p className="text-lg text-gray-800">Company : {customer.company}</p>
        <p className="text-lg text-gray-800">Country : {customer.country}</p>

        <PhotoGrid  photos={photos} loading={loading} />
      </div>
  );
};

export default CustomerDetails;