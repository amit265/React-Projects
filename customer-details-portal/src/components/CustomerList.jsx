import React, { useState, useRef, useCallback } from "react";
import CustomerCard from "./CustomerCard";
import ShimmerCustomer from "./ShimmerCustomer";

const CustomerList = ({ customers, selectedCustomerId, onSelect, loading , error}) => {
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

  if (error) return <h1> Error fetching date: {error} </h1>;

  if (loading) {
    return Array.from({ length: 20 }).map((_, index) => (
      <ShimmerCustomer key={index} />
    ));
  }

  return (
    <div className="relative h-full">
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
