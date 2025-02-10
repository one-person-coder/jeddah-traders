import CustomerLists from "@/components/Card/CustomerList";
import UserCards from "@/components/Card/UserCards";
import React from "react";

const CustomerPage = () => {
  return (
    <div className="custom-width">
      <UserCards />
      <CustomerLists />
    </div>
  );
};

export default CustomerPage;
