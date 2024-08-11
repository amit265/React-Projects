import React, { useState, useRef, useCallback } from "react";
import CustomerCard from "./CustomerCard";

const CustomerList = ({ customers, selectedCustomerId, onSelect }) => {
  const [visibleCount, setVisibleCount] = useState(20); // Load the first 20 customers initially
  const observer = useRef();

  const loadMore = useCallback(() => {
    setVisibleCount((prevCount) => prevCount + 20); // Load 20 more customers
  }, []);

  const lastCustomerRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && visibleCount < customers.length) {
          loadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadMore, visibleCount, customers.length]
  );

  return (
    <div className="relative h-full">
      {/* <h1 className="font-bold text-center p-4 bg-purple-400 fixed w-1/3 z-10">
        Customer List
      </h1> */}

      <div className="flex flex-col bg-white overflow-y-auto h-screen">
        {customers.slice(0, visibleCount).map((customer, index) => {
          if (index === visibleCount - 1) {
            return (
              <CustomerCard
                key={customer.id}
                customer={customer}
                isSelected={customer.id === selectedCustomerId}
                onSelect={onSelect}
                ref={lastCustomerRef} // Attach the ref to the last visible customer
              />
            );
          } else {
            return (
              <CustomerCard
                key={customer.id}
                customer={customer}
                isSelected={customer.id === selectedCustomerId}
                onSelect={onSelect}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default CustomerList;
