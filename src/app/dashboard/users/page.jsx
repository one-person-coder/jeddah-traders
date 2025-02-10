import UserCards from "@/components/Card/UserCards";
import UserLists from "@/components/Card/UserLists";
import React from "react";

const UsersPage = () => {
  return (
    <div className="custom-width">
      <UserCards />
      <UserLists />
    </div>
  );
};

export default UsersPage;
