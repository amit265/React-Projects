import { useState } from "react";
import CustomerList from "../components/CustomerList";
import CustomerDetails from "../components/CustomerDetails";
import useFetchData from "../hooks/useFetchData";
import { CUSTOMER_DETAILS_API } from "../utils/constants";

function CustomerPortal() {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const customers = useFetchData(CUSTOMER_DETAILS_API);
  console.log("customers, customer");

  const handleSelectCustomer = (id) => {
    setSelectedCustomerId(id);
  };

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);
  console.log("selectedCustomer", selectedCustomer);

  return (
    <div className="flex flex-col bg-slate-800 h-screen overflow-hidden">
      <h1 className="text-2xl font-bold text-center p-4 text-white">
        Customer Details Portal
      </h1>
      <div className="flex flex-grow">
        <div className="w-1/3 overflow-y-auto bg-white">
          <CustomerList
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelect={handleSelectCustomer}
          />
        </div>
        <div className="w-2/3 overflow-y-auto bg-gray-200">
          <CustomerDetails customer={selectedCustomer} />
        </div>
      </div>
    </div>
  );
}

export default CustomerPortal;
